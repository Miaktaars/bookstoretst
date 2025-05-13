import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const book = await Book.findById(params.id);
    if (!book) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }

    return Response.json(book);
  } catch (error) {
    console.error("❌ Error in GET /api/books/[id]:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();

    const data = await req.json();
    const updatedBook = await Book.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }

    return Response.json(updatedBook);
  } catch (error) {
    console.error("❌ Error in PUT /api/books/[id]:", error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();

    const deleted = await Book.findByIdAndDelete(params.id);

    if (!deleted) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }

    return Response.json({ message: "Book deleted" });
  } catch (error) {
    console.error("❌ Error in DELETE /api/books/[id]:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
