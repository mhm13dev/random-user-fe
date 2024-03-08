import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  users: any[];
}

const UsersList: React.FC<Props> = ({ users }) => {
  return (
    <div className="space-y-4 max-w-screen-md">
      {users.map((user) => (
        <div
          key={user.login.uuid}
          className="bg-gray-100 p-4 rounded-md flex items-center"
        >
          <div className="flex flex-grow">
            <Image
              src={user.picture.medium}
              alt={user.name.first}
              className="size-12 rounded-full"
              width={64}
              height={64}
            />

            <div className="ml-2">
              <h2 className="text-lg font-semibold">
                {user.name.first} {user.name.last}
              </h2>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>

          <div>
            <Link
              href={`/users/${user.login.uuid}`}
              className="bg-black text-sm text-white px-2 py-1.5 rounded-md hover:bg-gray-800 transition-all duration-300"
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
