"use client";

import { Suspense, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/users.store";
import SearchBar from "@/components/search-bar";
import UsersList from "@/components/users-list";
import Pagination from "@/components/pagination";
import { SearchResultFilter } from "@/types/common";

export default function Home() {
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
  const { getPaginatedUsers } = useUserStore(
    useShallow((store) => store.actions)
  );

  useEffect(() => {
    if (!users.length) return;
    getPaginatedUsers({
      page,
      searchQuery,
      filter,
    });
  }, [users, page, searchQuery, filter, getPaginatedUsers]);

  return (
    <main className="px-2 sm:px-4 max-w-screen-md mx-auto pb-4">
      <Suspense>
        <SearchBar setSearchQuery={setSearchQuery} setFilter={setFilter} />
      </Suspense>

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
