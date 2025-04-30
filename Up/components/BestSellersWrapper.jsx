// components/BestSellersWrapper.jsx
import BestSellers from "./BestSellers";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Book";

export default async function BestSellersWrapper() {
  await connectToDatabase();

  const books = await Book.find({ isBestseller: true }).lean();

  return <BestSellers books={JSON.parse(JSON.stringify(books))} />;
}
