import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import path from "path";
import connectDB from "./config/db.js";
import { sessionMiddleware } from "./config/session.js";
import { configurePassport } from "./config/passport.js";
import fetch from "node-fetch";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import journalRoutes from "./routes/journal.routes.js";

const app = express();
const __dirname = path.resolve();
app.set('trust proxy', 1);

// --- Database ---
connectDB(process.env.MONGO_URI);

// --- Middleware ---
app.use(cors({ 
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3001', 
  credentials: true 
}));
app.use(express.json());

// --- Session & Passport ---
app.use(sessionMiddleware({
    mongoUrl: process.env.MONGO_URI,
    secret: process.env.SESSION_SECRET,
  cookie: {
    secure: true,
    sameSite: 'none',
  }
}));
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---

// --- Server Tester & Google Analytics ---
app.get('/health', async (req, res) => {
    const measurementId = process.env.GA_MEASUREMENT_ID || 'G-8E5TJ2FCSG';
    const apiSecret = process.env.GA_API_SECRET || 'your-secret-key';
    const userId = 'UptimeRobot';

    const data = {
        client_id: userId,
        events: [{
            name: 'health_check_ping',
            params: {
                timestamp: new Date().toISOString(),
                source: 'server_ping',
                method: 'GET'
            }
        }]
    };

    try {
        await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        console.log('Google Analytics ping sent.');
    } catch (error) {
        console.error('Failed to send GA ping:', error);
    }

    res.status(200).json({ status: 'OK' });
});

app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/journals", journalRoutes);

// --- Serve React Frontend ---
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
