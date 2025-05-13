import { connectToDatabase } from "@/lib/mongodb";
import BookRequest from "@/models/BookRequest";

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const request = await BookRequest.create({
      ...data,
      status: "pending",
    });

    return Response.json({ success: true, request }, { status: 201 });
  } catch (error) {
    console.error("❌ Error saving book request:", error);
    return Response.json(
      { message: "Failed to save request" },
      { status: 500 }
    );
  }
}
