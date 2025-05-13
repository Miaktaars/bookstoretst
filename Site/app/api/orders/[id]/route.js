import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const { status } = await req.json();
    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({ order: updatedOrder });
  } catch (error) {
    console.error("PATCH /api/orders/:id failed:", error);
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectToDatabase();
    const deleted = await Order.findByIdAndDelete(params.id);

    if (!deleted) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/orders/:id failed:", error);
    return Response.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
export async function GET(_, { params }) {
  try {
    await connectToDatabase();
    const order = await Order.findById(params.id);

    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({ order });
  } catch (error) {
    console.error("GET /api/orders/:id failed:", error);
    return Response.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
