// app/api/auth/me/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  // 1. Try to read the token from the cookie
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // No token → still return 200, with user null
    return NextResponse.json({ user: null });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    // Invalid token → return user null
    return NextResponse.json({ user: null });
  }

  // 2. Fetch fresh user data
  await connectToDatabase();
  const user = await User.findById(payload.id).select("name email isAdmin");

  if (!user) {
    return NextResponse.json({ user: null });
  }

  // 3. Return the user object
  return NextResponse.json({
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
}
