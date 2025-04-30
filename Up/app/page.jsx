"use client";

import BestSellers from "@/components/BestSellers";
import Discount from "@/components/Discount";
import StatsSection from "@/components/StatsSection";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="relative h-screen w-full bg-black text-white -mt-24">
        {/* Homepage Background */}
        <Image
          src="/Home_img.webp"
          alt="Bookstore background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          style={{
            maskImage: `
              radial-gradient(circle, black 97%, transparent 100%),
              linear-gradient(to bottom, black 97%, transparent 100%)
            `,
            WebkitMaskImage: `
              radial-gradient(circle, black 97%, transparent 100%),
              linear-gradient(to bottom, black 97%, transparent 100%)
            `,
            maskComposite: "intersect", // not always supported, fallback might be needed
            WebkitMaskComposite: "destination-in", // Webkit-specific way
          }}
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 " />

        {/* Content centered vertically */}
        <div className="relative z-10 h-full flex flex-col items-center pt-35 text-center px-4">
          <div className=" mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-orange-500 mb-6 drop-shadow-lg">
              The Book Lover&apos;s Dreamland Awaits!
            </h1>
            <p className="max-w-4xl text-lg sm:text-xl text-gray-200 mb-10 mx-auto">
              Welcome to the ultimate book lover&apos;s paradise! Join our
              community and contribute to the ever-evolving library of stories,
              where every book has a chance to inspire someone new.
            </p>

            {/* Search Bar */}
            <div className="flex items-center border border-orange-500 rounded-md px-2 py-1 bg-black/60 backdrop-blur-md w-full max-w-md mx-auto">
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
      </div>

      {/* Best Sellers Section */}
      <BestSellers />
      <Discount />
      <StatsSection />
    </>
  );
}
