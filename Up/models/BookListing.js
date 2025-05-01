import mongoose from "mongoose";

const bookListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  isbn: String,
  condition: { type: String, required: true },
  conditionDescription: String,
  priceEstimation: { type: Number, required: true },
  images: [String], // Array of image URLs
  sellerInfo: {
    // Can be anonymous or user-linked
    name: String,
    email: String,
    phone: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "sold"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BookListing ||
  mongoose.model("BookListing", bookListingSchema);
