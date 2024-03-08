import React from "react";
import { MdPersonSearch } from "react-icons/md";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between gap-x-4 my-8 max-w-screen-md">
      <div className="flex items-center gap-x-2">
        <input
          type="text"
          placeholder="Search users"
          className="max-w-full w-96 p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button className="bg-black hover:bg-black p-2 rounded-md">
          <MdPersonSearch className="size-6 fill-white" />
        </button>
      </div>

      <div className="flex gap-x-2 items-center">
        <label htmlFor="gender-filter" className="text-black font-semibold">
          Gender
        </label>
        <select
          id="gender-filter"
          className="p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black w-36 cursor-pointer"
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
