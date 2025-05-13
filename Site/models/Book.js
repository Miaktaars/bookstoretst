// models/Book.js
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  price: Number,
  usedPrice: Number,
  ebookPrice: Number,
  audiobookPrice: Number,
  genre: [String],
  description: String,
  image: String,
  rating: {
    average: Number,
    count: Number,
  },
  isBestseller: Boolean,
  stockQuantity: Number,
  stockQuantityUsed: Number,
  hasAudiobook: Boolean,
  hasEbook: Boolean,
});

// Prevent model overwrite in dev
export default mongoose.models?.Book || mongoose.model("Book", BookSchema);
