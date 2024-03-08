import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getUsers } from "@/lib/get-users";
import { LoadingState, SearchResultFilter } from "@/types/common";

interface UserStore {
  users: any[];
  paginatedUsers: any[];
  loading: LoadingState;
  error: string | null;

  page: number;
  limit: number;

  maximumUsers: number;
  totalPages: number;

  actions: {
    getUsers: () => Promise<void>;
    getPaginatedUsers: (params: {
      page: number;
      searchQuery?: string;
      filter: SearchResultFilter | null;
    }) => void;
    setPage: (page: number) => void;
  };
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      users: [],
      paginatedUsers: [],
      loading: "idle",
      error: null,

      page: 1,
      limit: 30,

      maximumUsers: 1000,
      totalPages: 0,

      actions: {
        getUsers: async () => {
          // Doing this to avoid making api call when users are already present
          if (get().users.length > 0) return;

          try {
            set({
              loading: "loading",
              error: null,
            });
            const users = await getUsers({
              maximumUsers: get().maximumUsers,
            });
            set({
              users,
              error: null,
            });
          } catch (err: any) {
            set({
              users: [],
              loading: "error",
              error: err.message,
              totalPages: 0,
            });
          }
        },

        getPaginatedUsers: ({ page, searchQuery = "", filter }) => {
          set({ loading: "loading" });
          const users = get().users;
          let filteredUsers = [...users];

          if (searchQuery.trim().length > 0) {
            filteredUsers = users.filter((user) => {
              return (user.name.first + " " + user.name.last)
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            });
          }

          if (filter && filter !== SearchResultFilter.all) {
            filteredUsers = filteredUsers.filter((user) => {
              return user.gender.toLowerCase() === filter.toLowerCase();
            });
          }

          let paginatedUsers = [];

          const start = (page - 1) * get().limit;
          const end = start + get().limit;

          if (filteredUsers.length === 0 || filteredUsers.length < start) {
            paginatedUsers = [];
          } else if (filteredUsers.length < end) {
            paginatedUsers = filteredUsers.slice(start, filteredUsers.length);
          } else {
            paginatedUsers = filteredUsers.slice(start, end);
          }

          set({
            loading: "success",
            paginatedUsers,
            totalPages: Math.ceil(filteredUsers.length / get().limit),
          });
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
