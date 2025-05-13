import { connectToDatabase } from "@/lib/mongodb";
import BookListing from "@/models/BookListing";

export async function GET() {
  try {
    await connectToDatabase();
    const books = await BookListing.find().sort({ createdAt: -1 });
    return Response.json({ books });
  } catch (err) {
    console.error("❌ Failed to fetch listings:", err);
    return Response.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
