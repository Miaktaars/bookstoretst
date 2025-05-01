import Image from "next/image";
import UserMenu from "../components/UserMenu";
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-24 w-full">
      {/* Background with fade effect */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/NavBg.png"
          alt="Navbar background"
          fill
          priority
          className="object-cover object-bottom"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Navbar content */}
      <div className="relative flex items-center justify-between p-4 text-gray-300">
        <div className="flex items-center space-x-4">
          <Image
            src="/bk_logo.png"
            alt=""
            width={70}
            height={70}
            className="w-auto h-auto"
          />
          <h1 className="text-yellow-500 text-2xl">The Book Keepers</h1>
        </div>

        {/* Navbar Links */}
        <div className="flex space-x-6 text-xl text-white">
          <a href="/" className="hover:text-yellow-500 transition duration-300">
            Home
          </a>
          <a
            href="/books"
            className="hover:text-yellow-500 transition duration-300"
          >
            Books
          </a>

          <a
            href="/sell"
            className="hover:text-yellow-500 transition duration-300"
          >
            Sell
          </a>

          <a
            href="/request"
            className="hover:text-yellow-500 transition duration-300"
          >
            Request
          </a>
          <a
            href="/review"
            className="hover:text-yellow-500 transition duration-300"
          >
            Community Review
          </a>
          <a
            href="/about"
            className="hover:text-yellow-500 transition duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-yellow-500 transition duration-300"
          >
            Contact
          </a>
        </div>

        {/* Login Icon Placeholder */}
        <div className="flex items-center space-x-4 pe-10">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
