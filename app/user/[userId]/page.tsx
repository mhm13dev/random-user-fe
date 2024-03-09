"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { CgSpinner } from "react-icons/cg";
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
      {loading === "success" && user && <UserProfileCard user={user} />}
      {(loading === "loading" || loading === "idle") && (
        <CgSpinner className="animate-spin size-8 mx-auto text-green-500 mt-10" />
      )}
      {loading === "success" && !user && (
        <div className="text-red-500 font-semibold text-center mt-10">
          User not found
        </div>
      )}
      {loading === "error" && (
        <p className="text-red-500 font-semibold text-center mt-10">
          Error: {error}
        </p>
      )}
    </main>
  );
}
