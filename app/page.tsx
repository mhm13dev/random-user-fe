"use client";

import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/users.store";
import SearchBar from "@/components/search-bar";
import UsersList from "@/components/users-list";
import Pagination from "@/components/pagination";

export default function Home() {
  const { users, loading, error, page } = useUserStore(
    useShallow((state) => ({
      users: state.users,
      loading: state.loading,
      error: state.error,
      page: state.page,
    }))
  );
  const { getUsers, getPaginatedUsers } = useUserStore(
    useShallow((store) => store.actions)
  );
  const paginatedUsers = useMemo(() => {
    return getPaginatedUsers({
      users,
      page,
    });
  }, [users, page, getPaginatedUsers]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <main className="px-4 max-w-screen-md mx-auto pb-4">
      <SearchBar />

      {loading === "loading" && <p>Loading...</p>}
      {loading === "error" && <p>Error: {error}</p>}
      {loading === "success" && !!paginatedUsers.length && (
        <UsersList users={paginatedUsers} />
      )}
      {loading === "success" && !paginatedUsers.length && <p>No users found</p>}

      <Pagination />
    </main>
  );
}
