"use client";

import Image from "next/image";
import Head from "next/head";

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen -mt-10">
      <Head>
        <title>About Us | Bookstore</title>
      </Head>

      {/* Large top image */}
      <div
        className="w-full relative"
        style={{ height: "50vh", minHeight: "400px" }}
      >
        <Image
          src="/about_img.png"
          alt="About our bookstore"
          fill
          className="object-contain pt-5 mix-blend-lighten"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      {/* Content container with reduced padding */}
      <div className="max-w-6xl mx-auto  py-12 -mt-20 overflow-visible">
        {" "}
        {/* Changed px-6 to px-4 */}
        {/* Title with underline */}
        <div className="mb-10">
          {" "}
          {/* Reduced margin-bottom */}
          <h1 className="text-4xl font-bold mb-4 overflow-visible">About Us</h1>
          <div className="w-24 h-1 bg-[#ff5500]"></div>
        </div>
        {/* Stacked columns instead of grid */}
        <div className="space-y-12">
          {" "}
          {/* Changed from grid to simple stacking */}
          {/* Our Story section */}
          <div>
            <h2 className="text-2xl font-bold mb-5 text-[#ff5500]">
              Our Story
            </h2>
            <p className="mb-5 text-gray-300">
              Founded in 2023, our bookstore began as a small passion project
              and has grown into a beloved community hub for book lovers. What
              started as a modest collection of used books has blossomed into a
              carefully curated selection of both new releases and timeless
              classics.
            </p>
            <p className="text-gray-300">
              We believe in the transformative power of books and are committed
              to creating a space where readers of all ages can discover their
              next favorite story.
            </p>
          </div>
          {/* Our Mission section */}
          <div>
            <h2 className="text-2xl font-bold mb-5 text-[#ff5500]">
              Our Mission
            </h2>
            <p className="mb-5 text-gray-300">
              Our mission is to foster a love of reading by providing
              exceptional service, quality books, and a welcoming environment.
              We carefully select each title in our collection to ensure
              diversity, quality, and value for our customers.
            </p>
            <p className="text-gray-300">
              Beyond just selling books, we aim to be a cultural center for our
              community - hosting author events, book clubs, and literary
              discussions that bring people together.
            </p>
          </div>
        </div>
        {/* Values section with adjusted spacing */}
        <div className="mt-16">
          {" "}
          {/* Reduced margin-top */}
          <h2 className="text-3xl font-bold mb-10 text-center">
            {" "}
            {/* Reduced margin-bottom */}
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {" "}
            {/* Reduced gap */}
            {/* Value 1 */}
            <div className="text-center">
              <div className="bg-[#ff5500] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-300 px-2">
                {" "}
                {/* Added horizontal padding */}
                We're more than a store - we're a gathering place for readers
                and thinkers.
              </p>
            </div>
            {/* Value 2 */}
            <div className="text-center">
              <div className="bg-[#ff5500] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-300 px-2">
                {" "}
                {/* Added horizontal padding */}
                Every book in our collection is carefully selected for its merit
                and value.
              </p>
            </div>
            {/* Value 3 */}
            <div className="text-center">
              <div className="bg-[#ff5500] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-gray-300 px-2">
                {" "}
                {/* Added horizontal padding */}
                We strive to make literature accessible to all through
                affordable pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
