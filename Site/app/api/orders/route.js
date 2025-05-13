import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      email,
      shippingAddress,
      items,
      totalAmount,
      paymentInfo = {
        method: "card",
        status: "paid",
        transactionId: "manual",
      },
    } = body;

    if (!email || !shippingAddress || !items || items.length === 0) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔥 Fix: convert formatted bookId (e.g. "xxx-ebook") to ObjectId
    const fixedItems = items.map((item) => {
      const rawId = item.bookId.split("-")[0]; // strip "-ebook" or "-new"
      return {
        ...item,
        bookId: new mongoose.Types.ObjectId(rawId),
      };
    });

    const newOrder = await Order.create({
      email,
      items: fixedItems,
      shippingAddress,
      totalAmount,
      paymentInfo,
    });

    return Response.json(newOrder, { status: 201 });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    return Response.json(
      { message: "Failed to create order", error: err.message },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find().sort({ createdAt: -1 });
    return Response.json({ orders }, { status: 200 });
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    return Response.json({ error: "Failed to load orders" }, { status: 500 });
  }
}
