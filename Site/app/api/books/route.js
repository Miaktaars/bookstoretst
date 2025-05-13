import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(req) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const PAGE_SIZE = 100; // Display 56 books per page

  const search = url.searchParams.get("search") || "";
  const genre = url.searchParams.get("genre") || "";
  const hasEbook = url.searchParams.get("hasEbook") === "true";
  const hasAudiobook = url.searchParams.get("hasAudiobook") === "true";
  const condition = url.searchParams.get("condition") || "";
  const isBestseller = url.searchParams.get("isBestseller") === "true";
  const rating = parseInt(url.searchParams.get("rating")) || 0;

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
    ];
  }

  if (genre) query.genre = { $in: [genre] };
  if (hasEbook) query.hasEbook = true;
  if (hasAudiobook) query.hasAudiobook = true;
  if (isBestseller) query.isBestseller = true;
  if (rating) query["rating.average"] = { $gte: rating };

  // Handle condition-specific stock filtering
  if (condition === "New") {
    query.stockQuantity = { $gte: 1 }; // New books should have stockQuantity >= 1
  }
  if (condition === "Second-hand") {
    query.stockQuantityUsed = { $gte: 1 }; // Second-hand books should have stockQuantityUsed >= 1
  }

  try {
    await connectToDatabase();

    const books = await Book.find(query)
      .select(
        "title author price usedPrice ebookPrice audiobookPrice image genre description rating isBestseller stockQuantity hasAudiobook hasEbook isbn stockQuantityUsed"
      )
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    const total = await Book.countDocuments(query);

    return Response.json({ books, total });
  } catch (error) {
    console.error("❌ Error in /api/books (GET):", error);
    return Response.json(
      { books: [], total: 0, error: error.message },
      { status: 500 }
    );
  }
}
