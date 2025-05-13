import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find().select("-password"); // exclude password
    return Response.json({ users });
  } catch (error) {
    console.error("GET /api/admin/users failed:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectToDatabase();
    const { userId, isAdmin } = await req.json();

    const user = await User.findByIdAndUpdate(
      userId,
      { isAdmin },
      { new: true }
    ).select("-password");

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ user });
  } catch (error) {
    console.error("PATCH /api/admin/users failed:", error);
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { userId } = await req.json();

    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/users failed:", error);
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
