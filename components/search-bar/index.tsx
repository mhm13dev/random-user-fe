import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { MdPersonSearch } from "react-icons/md";
import { useUserStore } from "@/store/users.store";
import { mergeQueryString } from "@/utils/merge-query-string";
import { SearchResultFilter } from "@/types/common";

interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<SearchResultFilter | null>>;
}

const SearchBar: React.FC<Props> = ({ setSearchQuery, setFilter }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filterQueryParam = searchParams.get("filter") || SearchResultFilter.all;
  const { setPage } = useUserStore(useShallow((store) => store.actions));

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    // If a page is invalid, redirect to the first page
    if (isNaN(page) || page < 1) {
      const updatedSearchParams = mergeQueryString({
        searchParams,
        newSearchParams: [{ name: "page", value: "1" }],
      });
      router.push("?" + updatedSearchParams);
      setPage(1);
    } else {
      setPage(page);
    }

    setSearchQuery(searchParams.get("search") || "");
    const filter = searchParams.get("filter") || SearchResultFilter.all;
    setFilter(
      SearchResultFilter[filter as keyof typeof SearchResultFilter] ||
        SearchResultFilter.all
    );
  }, [searchParams, router, setPage, setSearchQuery, setFilter]);

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
    <div className="md:flex items-center justify-between gap-x-4 my-8 max-w-screen-md space-y-4 md:space-y-0">
      <form className="flex items-center gap-x-2" onSubmit={handleSearch}>
        <input
          type="text"
          name="search-query"
          placeholder="Search users"
          className="max-w-full w-full md:w-96 p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          defaultValue={searchParams.get("search") || ""}
        />
        <button
          type="submit"
          className="bg-black hover:bg-green-500 p-2 rounded-md transition-all duration-300"
        >
          <MdPersonSearch className="size-6 fill-white" />
        </button>
      </form>

      <div className="flex gap-x-2 items-center justify-end">
        <label htmlFor="gender-filter" className="text-black font-semibold">
          Gender
        </label>
        <select
          id="gender-filter"
          className="p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-36 cursor-pointer"
          defaultValue={
            SearchResultFilter[
              filterQueryParam as keyof typeof SearchResultFilter
            ] || SearchResultFilter.all
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
