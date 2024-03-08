"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/users.store";
import SearchBar from "@/components/search-bar";
import UsersList from "@/components/users-list";
import Pagination from "@/components/pagination";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { users, loading, error, page, paginatedUsers } = useUserStore(
    useShallow((state) => ({
      users: state.users,
      loading: state.loading,
      error: state.error,
      page: state.page,
      paginatedUsers: state.paginatedUsers,
    }))
  );
  const { getUsers, getPaginatedUsers, setPage } = useUserStore(
    useShallow((store) => store.actions)
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    const page = Number(searchParams.get("page"));

    // If a page is invalid, redirect to the first page
    if (isNaN(page) || page < 1) {
      const search = new URLSearchParams(searchParams.toString());
      search.set("page", "1");
      router.push("?" + search.toString());
      setPage(1);
    } else {
      setPage(page);
    }

    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams, router, setPage]);

  useEffect(() => {
    if (!users.length) return;
    getPaginatedUsers({
      page,
      searchQuery,
    });
  }, [users, page, searchQuery, getPaginatedUsers]);

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
