import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/User";
import { connectToDatabase } from "./mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export async function getUserFromRequest(req) {
  try {
    await connectToDatabase();

    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.id) return null;

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    return user || null;
  } catch (err) {
    console.error("Auth error:", err);
    return null;
  }
}
