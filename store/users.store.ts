import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User, getUsers } from "@/lib/get-users";
import { LoadingState, SearchResultFilter } from "@/types/common";

interface UserStore {
  users: User[];
  paginatedUsers: User[];
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
      filter: SearchResultFilter | null;
      searchQuery?: string;
    }) => void;
    getUserById: (userId: string) => User | null;
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
              loading: "success",
              users,
              error: null,
            });
            // Catch clause variable type annotation must be 'any' or 'unknown' if specified
          } catch (err: any) {
            set({
              users: [],
              loading: "error",
              error: err.message,
              totalPages: 0,
            });
          }
        },

        getPaginatedUsers: ({ page, filter, searchQuery = "" }) => {
          const users = get().users;
          let filteredUsers = [...users];

          if (filter && filter !== SearchResultFilter.all) {
            filteredUsers = filteredUsers.filter((user) => {
              return user.gender.toLowerCase() === filter.toLowerCase();
            });
          }

          if (searchQuery.trim().length > 0) {
            filteredUsers = filteredUsers.filter((user) => {
              return (user.name.first + " " + user.name.last)
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            });
          }

          let paginatedUsers: User[] = [];

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
            paginatedUsers,
            totalPages: Math.ceil(filteredUsers.length / get().limit),
          });
        },

        getUserById: (userId: string) => {
          const users = get().users;
          const user = users.find((user) => user.login.uuid === userId);
          return user ?? null;
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
