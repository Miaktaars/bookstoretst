import { connectToDatabase } from "@/lib/mongodb";
import BookRequest from "@/models/BookRequest";

export async function GET() {
  try {
    await connectToDatabase();
    const requests = await BookRequest.find().sort({ createdAt: -1 });
    return Response.json({ requests });
  } catch (err) {
    console.error("❌ Failed to fetch book requests:", err);
    return Response.json({ message: "Failed to fetch" }, { status: 500 });
  }
}
