import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  await connectToDatabase();

  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return new Response(
    JSON.stringify({
      email: user.email,
      isAdmin: user.isAdmin || false,
      name: user.name,
    }),
    {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    }
  );
}
