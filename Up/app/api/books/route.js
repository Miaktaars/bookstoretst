import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(req) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const PAGE_SIZE = 50;

  const genre = url.searchParams.get("genre") || "";
  const author = url.searchParams.get("author") || "";
  const hasEbook = url.searchParams.get("hasEbook") === "true";
  const hasAudiobook = url.searchParams.get("hasAudiobook") === "true";
  const condition = url.searchParams.get("condition") || "";
  const isBestseller = url.searchParams.get("isBestseller") === "true";
  const rating = parseInt(url.searchParams.get("rating")) || 0;

  const query = {};

  if (genre) query.genre = { $in: [genre] };
  if (author) query.author = { $regex: author, $options: "i" };
  if (hasEbook) query.hasEbook = true;
  if (hasAudiobook) query.hasAudiobook = true;
  if (condition) query.condition = condition;
  if (isBestseller) query.isBestseller = true;
  if (rating) query["rating.average"] = { $gte: rating };

  try {
    await connectToDatabase();

    const books = await Book.find(query)
      .select(
        "title author price usedPrice ebookPrice audiobookPrice image genre description rating isBestseller stockQuantity hasAudiobook hasEbook isbn"
      )
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    const total = await Book.countDocuments(query);

    return Response.json({ books, total });
  } catch (error) {
    console.error("❌ Error in /api/books:", error);
    return Response.json(
      { books: [], total: 0, error: error.message },
      { status: 500 }
    );
  }
}
