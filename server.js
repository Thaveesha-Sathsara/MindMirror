const mongoose = require('mongoose'),
    cors = require('cors'),
    express = require('express'),
    keys = require('./keys'),
    app = express();

const API_PORT = process.env.PORT || 5000;
const dbURI = `mongodb+srv://${keys.username}:${keys.password}@mindmirror.33hivno.mongodb.net/mindmirrorDB?retryWrites=true&w=majority&appName=mindmirror`;

app.use(express.json());
app.use(cors());

const journalSchema = new mongoose.Schema({
    title: String,
    tags: Array,
    body: String,
    created: { type: Date, default: Date.now }
});

const Journal = mongoose.model('Journal', journalSchema);

//CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to server');
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});



//CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = async (msg) => {
    try {
        await mongoose.connection.close();
        console.log('Mongoose disconnected through ' + msg);
    } catch (err) {
        console.error('Error during mongoose disconnect:', err);
    }
};
// For nodemon restarts
process.once('SIGUSR2', async () => {
    await gracefulShutdown('app termination');
    process.exit(0);
});

// For app termination (e.g., Heroku)
process.on('SIGTERM', async () => {
    await gracefulShutdown('Heroku app termination');
    process.exit(0);
});

process.on('SIGINT', async () => { // Ctrl+C locally
    await gracefulShutdown('app termination');
    process.exit(0);
});


mongoose.connect(dbURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/get-journals', async (req, res) => {
    try {
        const journals = await Journal.find({});
        res.send({ status: 200, message: 'success', journals });
    } catch (err) {
        res.status(400).send({ status: 400, message: err.message });
    }
});

app.post('/create', async (req, res) => {
    try {
        const journalData = req.body.journal; // <-- match your frontend key
        const newJournal = await Journal.create(journalData);
        res.send({ status: 200, message: 'success', journal: newJournal });
    } catch (err) {
        res.status(400).send({ status: 400, message: err.message });
    }
});

app.post('/search', async (req, res) => {
    try {
        const journals = await Journal.find({ tags: { $all: req.body.tags } });
        res.send({ status: 200, message: 'success', journals });
    } catch (err) {
        res.status(400).send({ status: 400, message: err.message });
    }
});



app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));