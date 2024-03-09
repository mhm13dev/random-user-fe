"use client";

import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/users.store";

interface Props {
  children: React.ReactNode;
}

const UsersProvider: React.FC<Props> = ({ children }) => {
  const { getUsers } = useUserStore(useShallow((store) => store.actions));

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return <div>{children}</div>;
};

export default UsersProvider;
