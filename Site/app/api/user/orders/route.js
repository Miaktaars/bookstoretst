import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getUserFromRequest } from "@/lib/auth"; // You must implement this

export async function GET(req) {
  try {
    await connectToDatabase();
    const user = await getUserFromRequest(req);

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await Order.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    return Response.json({ orders });
  } catch (err) {
    console.error("GET /api/user/orders failed:", err);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
