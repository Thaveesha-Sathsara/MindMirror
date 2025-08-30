import express from "express";
import { ensureAuth } from "../middleware/auth.js";

// Import controller functions
import { 
  getAllJournals, 
  createJournal, 
  searchJournals,
  getJournalById
} from "../controllers/journal.controller.js";

const router = express.Router();

// Define routes with authentication middleware
router.get("/", ensureAuth, getAllJournals);
router.post("/create", ensureAuth, createJournal);
router.post("/search", ensureAuth, searchJournals);
router.get("/:id", ensureAuth, getJournalById);

export default router;
