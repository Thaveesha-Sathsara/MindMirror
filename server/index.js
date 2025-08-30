import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import connectDB from "./config/db.js";
import { sessionMiddleware } from "./config/session.js";
import { configurePassport } from "./config/passport.js";

// Import your routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import journalRoutes from "./routes/journal.routes.js";

const app = express();

// Debug: Log environment variables
console.log('Environment check:');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set');
console.log('SESSION_SECRET:', process.env.SESSION_SECRET ? 'Set' : 'Not set');
console.log('CLIENT_ORIGIN:', process.env.CLIENT_ORIGIN || 'Not set');
console.log('PORT:', process.env.PORT || 3000);

// --- 1. Database Connection ---
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not set in environment variables');
  process.exit(1);
}

connectDB(process.env.MONGO_URI);

// --- 2. Middleware Setup ---
app.use(cors({ 
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3001', 
  credentials: true 
}));
app.use(express.json());

// --- 3. Session and Passport Middleware ---
if (!process.env.SESSION_SECRET) {
  console.error('SESSION_SECRET is not set in environment variables');
  process.exit(1);
}

app.use(sessionMiddleware({
    mongoUrl: process.env.MONGO_URI,
    secret: process.env.SESSION_SECRET,
}));

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// --- 4. Route Mounting ---
console.log('Mounting routes...');
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/journals", journalRoutes);

// Add a test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Debug: Log all mounted routes
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(`Route: ${Object.keys(r.route.methods)} ${r.route.path}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Test the server: http://localhost:${PORT}/test`);
  console.log(`Auth endpoint: http://localhost:${PORT}/auth/google`);
});