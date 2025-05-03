import mongoose from "mongoose";

const bookRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  isbn: String,
  contactEmail: { type: String, required: true },
  contactPhone: String,
  notes: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const BookRequest =
  mongoose.models.BookRequest ||
  mongoose.model("BookRequest", bookRequestSchema);

export default BookRequest;
