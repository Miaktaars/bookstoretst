"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <section className="bg-black text-white px-[5vw] py-20 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Left: Shelf Image */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/Shelf.png"
          alt="Shelf Image"
          width={400}
          height={400}
          className="object-contain w-auto h-auto"
        />
      </div>

      {/* Right: Text and Stats */}
      <div className="flex-1 flex flex-col items-start justify-center gap-6">
        {/* Big Title */}
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Your favourite <span className="text-[#FFD700]">Reads</span>
          <br />
          <span className="text-[#FFD700]">Are Here!</span>
        </h2>

        {/* Paragraph */}
        <p className="text-gray-300 max-w-md leading-relaxed">
          Buy your favorite books online with ease! Enjoy exclusive offers and
          discounts on selected titles. Dive into our collection and find
          special deals that make reading more affordable. Shop now and unlock
          more savings with every purchase!
        </p>

        {/* Stats */}
        <div className="flex gap-8 mt-4 flex-wrap">
          <div className="flex flex-col items-center">
            <span className="text-[#FFD700] text-3xl font-bold">800+</span>
            <span className="text-gray-400 text-sm mt-1">Book Listing</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#FFD700] text-3xl font-bold">1K+</span>
            <span className="text-gray-400 text-sm mt-1">
              Registered Members
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#FFD700] text-3xl font-bold">50+</span>
            <span className="text-gray-400 text-sm mt-1">Branch Count</span>
          </div>
        </div>

        {/* Explore More Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-8 border border-[#FFD700] text-white px-6 py-2 rounded-md hover:bg-[#FFD700] hover:text-black transition-all"
        >
          Explore More
        </motion.button>
      </div>
    </section>
  );
}
