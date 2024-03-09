import React from "react";
import { User } from "@/lib/get-users";
import UserListCard from "./user-list-card";

interface Props {
  users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
  return (
    <div className="space-y-4 max-w-screen-md">
      {users.map((user) => (
        <UserListCard key={user.login.uuid} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
