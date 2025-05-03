// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  // Create a response indicating success
  const res = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  // Clear the cookie by setting it with maxAge 0
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
