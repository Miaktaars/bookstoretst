import { connectToDatabase } from "@/lib/mongodb";
import BookRequest from "@/models/BookRequest";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
  const { id } = params;
  try {
    await connectToDatabase();
    const { status } = await req.json();

    if (!["pending", "reviewed", "approved", "denied"].includes(status)) {
      return Response.json({ message: "Invalid status" }, { status: 400 });
    }

    const request = await BookRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return Response.json({ message: "Request not found" }, { status: 404 });
    }

    return Response.json({ request });
  } catch (err) {
    console.error("❌ Failed to update request:", err);
    return Response.json({ message: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { id } = params;
  try {
    await connectToDatabase();
    const deleted = await BookRequest.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json({ message: "Request not found" }, { status: 404 });
    }

    return Response.json({ message: "Request deleted" });
  } catch (err) {
    console.error("❌ Failed to delete request:", err);
    return Response.json({ message: "Failed to delete" }, { status: 500 });
  }
}
