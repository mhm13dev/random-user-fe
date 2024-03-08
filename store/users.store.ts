import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getUsers } from "@/lib/get-users";
import { LoadingState } from "@/types/common";

interface UserStore {
  users: any[];
  loading: LoadingState;
  error: string | null;

  page: number;
  limit: number;

  maximumUsers: number;
  totalPages: number;

  actions: {
    getUsers: () => Promise<void>;
    getPaginatedUsers: (params: {
      users: any[];
      page: number;
      limit?: number;
    }) => any[];
    setPage: (page: number) => void;
  };
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      users: [],
      loading: "idle",
      error: null,

      page: 1,
      limit: 30,

      maximumUsers: 1000,
      totalPages: 1,

      actions: {
        getUsers: async () => {
          // Doing this to avoid making api call when users are already present
          if (get().users.length > 0) return;

          try {
            set({ loading: "loading", error: null });
            const users = await getUsers({
              maximumUsers: get().maximumUsers,
            });
            set({
              users,
              loading: "success",
              error: null,
              totalPages: Math.ceil(users.length / get().limit),
            });
          } catch (err: any) {
            set({
              users: [],
              loading: "error",
              error: err.message,
              totalPages: 1,
            });
          }
        },

        getPaginatedUsers: ({ users, page }) => {
          const start = (page - 1) * get().limit;
          const end = start + get().limit;

          if (users.length === 0 || users.length < start) return [];
          if (users.length < end) return users.slice(start, users.length);

          return get().users.slice(start, end);
        },

        setPage: (page: number) => {
          if (isNaN(page) || page < 1) {
            set({ page: 1 });
          } else {
            set({ page });
          }
        },
      },
    }),
    {
      name: "UserStore",
    }
  )
);
