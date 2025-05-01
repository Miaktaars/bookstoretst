// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // Updated to match your function name
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectToDatabase(); // Using the correct function now

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

    return NextResponse.json(
      { user: { email: user.email, isAdmin: user.isAdmin } },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
