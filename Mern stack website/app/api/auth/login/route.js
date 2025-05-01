import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectToDatabase();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      {
        status: 401,
      }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      {
        status: 401,
      }
    );
  }

  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin || false,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return new Response(
    JSON.stringify({
      token,
      email: user.email,
      isAdmin: user.isAdmin || false,
      name: user.name,
    }),
    {
      status: 200,
    }
  );
}
