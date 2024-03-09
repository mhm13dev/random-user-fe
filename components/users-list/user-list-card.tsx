import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/lib/get-users";

interface Props {
  user: User;
}

const UserListCard: React.FC<Props> = ({ user }) => {
  return (
    <div
      key={user.login.uuid}
      className="bg-gray-100 p-4 rounded-md sm:flex items-center space-y-1 sm:space-y-0"
    >
      <div className="flex flex-grow">
        <Image
          src={user.picture.medium}
          alt={user.name.first}
          className="size-12 rounded-full"
          width={64}
          height={64}
        />

        <div
          className="ml-2"
          style={{
            wordBreak: "break-word",
          }}
        >
          <h2 className="text-base sm:text-lg font-semibold">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-xs sm:text-sm">{user.email}</p>
        </div>
      </div>

      <div className="text-right">
        <Link
          href={`/user/${user.login.uuid}`}
          className="bg-black text-sm text-white px-2 py-1.5 rounded-md hover:bg-gray-800 transition-all duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserListCard;
