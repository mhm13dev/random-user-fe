import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdPersonSearch } from "react-icons/md";
import { mergeQueryString } from "@/utils/merge-query-string";
import { SearchResultFilter } from "@/types/common";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filter = searchParams.get("filter") || SearchResultFilter.all;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchQuery = e.currentTarget["search-query"].value;
    const mergedParams = mergeQueryString({
      searchParams,
      newSearchParams: [
        { name: "search", value: searchQuery },
        {
          name: "page",
          value: "1",
        },
      ],
    });
    router.push(`${pathname}?` + mergedParams);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mergedParams = mergeQueryString({
      searchParams,
      newSearchParams: [
        {
          name: "filter",
          value: e.currentTarget.value,
        },
        {
          name: "page",
          value: "1",
        },
      ],
    });
    router.push(`${pathname}?` + mergedParams);
  };

  return (
    <div className="flex items-center justify-between gap-x-4 my-8 max-w-screen-md">
      <form className="flex items-center gap-x-2" onSubmit={handleSearch}>
        <input
          type="text"
          name="search-query"
          placeholder="Search users"
          className="max-w-full w-96 p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          defaultValue={searchParams.get("search") || ""}
        />
        <button
          type="submit"
          className="bg-black hover:bg-black p-2 rounded-md"
        >
          <MdPersonSearch className="size-6 fill-white" />
        </button>
      </form>

      <div className="flex gap-x-2 items-center">
        <label htmlFor="gender-filter" className="text-black font-semibold">
          Gender
        </label>
        <select
          id="gender-filter"
          className="p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black w-36 cursor-pointer"
          defaultValue={
            SearchResultFilter[filter as keyof typeof SearchResultFilter] ||
            SearchResultFilter.all
          }
          onChange={handleFilter}
        >
          <option value={SearchResultFilter.all}>
            {SearchResultFilter.all.toUpperCase()}
          </option>
          <option value={SearchResultFilter.male}>
            {SearchResultFilter.male.toUpperCase()}
          </option>
          <option value={SearchResultFilter.female}>
            {SearchResultFilter.female.toUpperCase()}
          </option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
