import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import path from "path";
import connectDB from "./config/db.js";
import { sessionMiddleware } from "./config/session.js";
import { configurePassport } from "./config/passport.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import journalRoutes from "./routes/journal.routes.js";

const app = express();
const __dirname = path.resolve();

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
}));
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/journals", journalRoutes);

// --- Serve React Frontend ---
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// --- Debug / Test ---
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
