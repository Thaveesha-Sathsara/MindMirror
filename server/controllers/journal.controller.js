import Journal from "../models/journal.model.js";
import { encrypt, decrypt } from "../utils/cryptoUtils.js"; // Import the functions

// @desc    Create a new journal for the logged-in user
export const createJournal = async (req, res) => {
    try {
        const { title, tags, body } = req.body.journal;
        if (!title || !body) {
            return res.status(400).json({ status: 400, message: "Title and body are required." });
        }

        // Encrypt the journal body before saving
        const encryptedBody = encrypt(body);

        const newJournal = await Journal.create({
            title,
            tags,
            body: encryptedBody, // Save the encrypted body
            userId: req.user._id,
        });

        res.status(201).json({
            status: 201,
            message: "Journal created successfully",
            journal: newJournal, // This will return the encrypted body
        });
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message });
    }
};

// @desc    Get all journals for the logged-in user
export const getAllJournals = async (req, res) => {
    try {
        const journals = await Journal.find({ userId: req.user._id });

        // Decrypt the body of each journal before sending
        const decryptedJournals = journals.map(journal => ({
            ...journal._doc,
            body: decrypt(journal.body),
        }));

        res.status(200).json({ status: 200, message: "success", journals: decryptedJournals });
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message });
    }
};

// @desc    Search journals by tags for the logged-in user
export const searchJournals = async (req, res) => {
    try {
        const { tags } = req.body;
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({ status: 400, message: "Tags array is required for search." });
        }

        // Searching by tags is still easy, as tags are not encrypted
        const journals = await Journal.find({
            userId: req.user._id,
            tags: { $all: tags },
        });

        // Decrypt the body of each matching journal
        const decryptedJournals = journals.map(journal => ({
            ...journal._doc,
            body: decrypt(journal.body),
        }));

        res.status(200).json({ status: 200, message: "success", journals: decryptedJournals });
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message });
    }
};

// @desc    Get a single journal by ID
export const getJournalById = async (req, res) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            return res.status(404).json({ message: "Journal not found" });
        }

        // Decrypt the body before sending
        const decryptedJournal = {
            ...journal._doc,
            body: decrypt(journal.body)
        };

        res.status(200).json(decryptedJournal);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid journal ID format" });
        }
        res.status(500).json({ message: "Server error" });
    }
};