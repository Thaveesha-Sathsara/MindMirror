import Journal from "../models/journal.model.js";

// @desc    Get all journals for the logged-in user
export const getAllJournals = async (req, res) => {
  try {
    // Use req.user._id to find only the journals of the authenticated user
    const journals = await Journal.find({ userId: req.user._id });
    res.status(200).json({ status: 200, message: "success", journals });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

// @desc    Create a new journal for the logged-in user
export const createJournal = async (req, res) => {
  try {
    const { title, tags, body } = req.body.journal;
    if (!title || !body) {
      return res
        .status(400)
        .json({ status: 400, message: "Title and body are required." });
    }

    // Add the logged-in user's ID to the new journal entry
    const newJournal = await Journal.create({
      title,
      tags,
      body,
      userId: req.user._id, // Get ID from authenticated user
    });

    res.status(201).json({
      status: 201,
      message: "Journal created successfully",
      journal: newJournal,
    });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

// @desc    Search journals by tags for the logged-in user
export const searchJournals = async (req, res) => {
  try {
    const { tags } = req.body;
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res
        .status(400)
        .json({ status: 400, message: "Tags array is required for search." });
    }

    // Search for journals that belong to the user AND have the specified tags
    const journals = await Journal.find({
      userId: req.user._id,
      tags: { $all: tags },
    });

    res.status(200).json({ status: 200, message: "success", journals });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

export const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json(journal);
  } catch (error) {
    // This handles errors if the provided ID is not a valid MongoDB ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid journal ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

