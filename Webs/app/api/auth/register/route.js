// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectToDatabase();

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: email === "bookkeeper_admin@gmail.com",
    });

    // Sign a JWT with the new user's ID
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Build response and set HttpOnly cookie
    const res = NextResponse.json(
      {
        email: user.email,
        isAdmin: user.isAdmin,
        name: user.name,
      },
      { status: 201 }
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
