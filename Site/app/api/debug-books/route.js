import { connectToDatabase } from '@/lib/mongodb';
import Book from '@/models/Book';

export async function GET() {
  try {
    await connectToDatabase();

    const allBooks = await Book.find({}).limit(20); // Fetch 20 books max to keep output small
    return Response.json({ books: allBooks });
  } catch (error) {
    console.error('❌ Error in /api/debug-books:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
