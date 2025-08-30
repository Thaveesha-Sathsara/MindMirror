import mongoose from 'mongoose'; // <-- Change from `require` to `import`

const journalSchema = new mongoose.Schema({
    title: String,
    tags: Array,
    body: String,
    created: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Journal', journalSchema);
