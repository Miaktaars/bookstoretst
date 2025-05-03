import { connectToDatabase } from "@/lib/mongodb";
import BookListing from "@/models/BookListing";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDatabase();
    const formData = await request.formData();

    const listingData = {
      title: formData.get("title"),
      author: formData.get("author"),
      genre: formData.get("genre"),
      isbn: formData.get("isbn"),
      condition: formData.get("condition"),
      conditionDescription: formData.get("conditionDescription"),
      priceEstimation: parseFloat(formData.get("priceEstimation")),
      sellerInfo: {
        name: formData.get("sellerName") || "Anonymous",
        email: formData.get("sellerEmail"),
        phone: formData.get("sellerPhone"),
      },
      images: formData.getAll("images"), // Just take the URLs directly
    };

    const newListing = await BookListing.create(listingData);

    return NextResponse.json(
      { success: true, listingId: newListing._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
