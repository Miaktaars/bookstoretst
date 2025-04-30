"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-10 pb-6 px-[5vw]">
      {/* Logo on top */}
      <div className="mb-6 ml-10">
        <Image
          src="/bk_logo.png"
          alt="Bookkeepers Logo"
          width={50}
          height={30}
          className="object-contain"
        />
      </div>

      {/* White line */}
      <div className="border-t border-gray-400 mb-6"></div>

      {/* Bottom section: credits, golden text, social media */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
        {/* Left: Credits */}
        <div className="text-gray-400 ml-10">
          © {new Date().getFullYear()} |{" "}
          <span className="hover:underline cursor-pointer">Bookkeepers</span>
        </div>

        {/* Center: Golden text */}
        <div className="text-center text-[#FFD700] ">
          Visit our branches in Galle, Kurunegala, Kandy, and Colombo, and
          register for our online platform to enjoy maximum benefits!
        </div>

        {/* Right: Social media icons */}
        <div className="flex gap-4 mr-10">
          <a
            href="#"
            className="text-gray-400 hover:text-orange-400 transition"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-400 transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-400 transition"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-400 transition"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
