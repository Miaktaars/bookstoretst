import { connectToDatabase } from '@/lib/mongodb';
import Book from '@/models/Book';

export async function GET(req) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const genre = url.searchParams.get('genre') || '';
  const PAGE_SIZE = 20;

  const query = genre ? { genre: { $in: [genre] } } : {};

  try {
    await connectToDatabase();

    const books = await Book.find(query)
      .select('title author price image hasAudiobook hasEbook')
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    const total = await Book.countDocuments(query);

    return Response.json({ books, total });
  } catch (error) {
    console.error('❌ Error in /api/books:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
