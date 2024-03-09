import React from "react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="bg-black p-4">
      <div className="max-w-screen-xl mx-auto flex">
        <Link
          href="/"
          className="flex items-center justify-center text-white hover:text-green-500 transition-all duration-300"
        >
          <FaRegUserCircle className="text-3xl mr-2" />
          <h1 className="text-lg font-semibold">Random Users</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
