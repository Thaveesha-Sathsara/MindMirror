// const mongoose = require('mongoose');

// const connectDB = async () => {
//     const dbURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mindmirror.33hivno.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=mindmirror`;

//     try {
//         await mongoose.connect(dbURI);
//     } catch (err) {
//         console.error("MongoDB initial connection error:", err);
//         // Exit process with failure
//         process.exit(1);
//     }
// };

// // CONNECTION EVENTS
// mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to DB');
// });

// mongoose.connection.on('error', (err) => {
//     console.error('Mongoose connection error: ' + err);
// });

// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose disconnected');
// });

// // CAPTURE APP TERMINATION / RESTART EVENTS
// const gracefulShutdown = async (msg, callback) => {
//     try {
//         await mongoose.connection.close();
//         console.log('Mongoose disconnected through ' + msg);
//         callback();
//     } catch (err) {
//         console.error('Error during graceful shutdown:', err);
//     }
// };

// // For nodemon restarts
// process.once('SIGUSR2', () => {
//     gracefulShutdown('nodemon restart', () => process.kill(process.pid, 'SIGUSR2'));
// });

// // For app termination
// process.on('SIGINT', () => {
//     gracefulShutdown('app termination', () => process.exit(0));
// });

// // For Heroku app termination
// process.on('SIGTERM', () => {
//     gracefulShutdown('Heroku app termination', () => process.exit(0));
// });


// module.exports = connectDB;


import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
