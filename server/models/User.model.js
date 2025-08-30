import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
 {
    googleId: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, index: true },
    picture: String,
    lastLogin: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Add index for better query performance
userSchema.index({ googleId: 1, email: 1 });

export default mongoose.model("User", userSchema);
