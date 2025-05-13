import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // allow guest orders
    },
    email: {
      type: String,
      required: true,
    },
    items: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        title: String,
        quantity: { type: Number, default: 1 },
        price: Number,
      },
    ],
    shippingAddress: {
      fullName: String,
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ["card", "paypal", "cod"],
        default: "card",
      },
      status: {
        type: String,
        enum: ["unpaid", "paid", "failed"],
        default: "unpaid",
      },
      transactionId: {
        type: String,
      },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
