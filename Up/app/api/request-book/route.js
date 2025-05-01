import { connectToDatabase } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const bookRequest = {
      ...req.body,
      createdAt: new Date(),
      status: "pending", // You can add status tracking
    };

    const result = await db.collection("bookRequests").insertOne(bookRequest);

    if (result.insertedId) {
      return res.status(201).json({ success: true });
    } else {
      return res.status(500).json({ message: "Failed to save request" });
    }
  } catch (error) {
    console.error("Error saving book request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
