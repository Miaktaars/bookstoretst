'use client';

import BestSellers from "@/components/BestSellers";
import Image from "next/image";
import { useState } from "react";
import BestSellersWrapper from "@/components/BestSellersWrapper";


export default   function Home() {
  const [search, setSearch] = useState("");
  return (
    <> 
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Background Image */}
      <Image
        src="/Home_img.png"
        alt="Bookstore background"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 merriweather">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-orange-500 mb-6 drop-shadow-lg">
          The Book Lover&apos;s Dreamland Awaits!
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-gray-200 mb-10">
          Welcome to the ultimate book lover&apos;s paradise! Join our community and contribute to the ever-evolving library of stories, where every book has a chance to inspire someone new.
        </p>

        {/* Search Bar */}
        <div className="flex items-center border border-orange-500 rounded-md px-2 py-1 bg-black/60 backdrop-blur-md w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a Book"
            className="flex-1 bg-transparent text-white placeholder-gray-400 px-3 py-2 outline-none"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-all">
            Search
          </button>
        </div>
      </div>
    </div>
    <BestSellers/>

    </>
  );
}
