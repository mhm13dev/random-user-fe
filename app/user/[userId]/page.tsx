"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/users.store";
import UserProfileCard from "@/components/user-profile-card";

export default function UserPage() {
  const params = useParams();

  const { users, loading, error } = useUserStore(
    useShallow((state) => ({
      users: state.users,
      loading: state.loading,
      error: state.error,
      page: state.page,
      paginatedUsers: state.paginatedUsers,
    }))
  );

  const { getUserById } = useUserStore(useShallow((state) => state.actions));

  const user = useMemo(() => {
    if (!users.length) return null;
    return getUserById(params.userId.toString());
  }, [users, params.userId, getUserById]);

  return (
    <main className="max-w-screen-md mx-auto p-2 sm:p-4">
      {loading === "success" && user ? <UserProfileCard user={user} /> : null}
      {loading === "loading" ? <div>Loading...</div> : null}
      {loading === "success" && !user ? <div>User not found</div> : null}
      {error ? <div>Error: {error}</div> : null}
    </main>
  );
}
