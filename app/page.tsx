"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/users.store";
import SearchBar from "@/components/search-bar";
import UsersList from "@/components/users-list";
import Pagination from "@/components/pagination";
import { SearchResultFilter } from "@/types/common";
import { mergeQueryString } from "@/utils/merge-query-string";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<SearchResultFilter | null>(null);
  const { users, loading, error, page, paginatedUsers } = useUserStore(
    useShallow((state) => ({
      users: state.users,
      loading: state.loading,
      error: state.error,
      page: state.page,
      paginatedUsers: state.paginatedUsers,
    }))
  );
  const { getPaginatedUsers, setPage } = useUserStore(
    useShallow((store) => store.actions)
  );

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
  }, [searchParams, router, setPage]);

  useEffect(() => {
    if (!users.length) return;
    getPaginatedUsers({
      page,
      searchQuery,
      filter,
    });
  }, [users, page, searchQuery, filter, getPaginatedUsers]);

  return (
    <main className="px-4 max-w-screen-md mx-auto pb-4">
      <SearchBar />
      {loading === "success" && !!paginatedUsers.length && (
        <UsersList users={paginatedUsers} />
      )}
      {loading === "success" && !!paginatedUsers.length && <Pagination />}
      {loading === "loading" && <p>Loading...</p>}
      {loading === "error" && <p>Error: {error}</p>}
      {loading === "success" && !paginatedUsers.length && <p>No users found</p>}
    </main>
  );
}
