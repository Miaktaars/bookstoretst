import { connectToDatabase } from "@/lib/mongodb";
import BookListing from "@/models/BookListing";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const { status } = await req.json();

    if (!["pending", "approved", "rejected", "sold"].includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await BookListing.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return Response.json({ book: updated });
  } catch (err) {
    console.error("❌ Failed to update listing:", err);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    await BookListing.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to delete listing:", err);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
