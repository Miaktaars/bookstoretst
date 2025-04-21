import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-cover bg-center text-gray-300 p-4" style={{ backgroundImage: "url('/NavBg.png')" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <Image src="/bk_logo.png" alt="" width={100} height={100} className=''/>
        <h1 className='text-yellow-500 text-2xl'>The Book Keepers</h1>

        </div>
        {/* Navbar Links */}
        <div className="flex space-x-6 text-xl text-white">
          <a href="/" className="hover:text-yellow-500 transition duration-300">Home</a>
          <a href="/books" className="hover:text-yellow-500 transition duration-300">Books</a>
          <a href="/books" className="hover:text-yellow-500 transition duration-300">E-Books</a>
          <a href="/books" className="hover:text-yellow-500 transition duration-300">AudioBooks</a>
          <a href="/books" className="hover:text-yellow-500 transition duration-300">Sell</a>
          <a href="/books" className="hover:text-yellow-500 transition duration-300">Rent</a>
          <a href="/books" className="hover:text-yellow-500 transition duration-300">Request</a>
          <a href="/about" className="hover:text-yellow-500 transition duration-300">About</a>
          <a href="/contact" className="hover:text-yellow-500 transition duration-300">Contact</a>
        </div>

        {/* Login Icon Placeholder */}
        <div className="flex items-center space-x-4">
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
