import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaMapMarked,
  FaPhoneAlt,
  FaLock,
  FaUserCircle,
} from "react-icons/fa";
import { FaEnvelopeOpen } from "react-icons/fa6";
import clsx from "clsx";
import { User } from "@/lib/get-users";

interface Props {
  user: User;
}

const UserProfileCard: React.FC<Props> = ({ user }) => {
  const data = useMemo(() => {
    return {
      name: {
        description: "Hi, my name is",
        value: user.name.title + " " + user.name.first + " " + user.name.last,
      },
      email: {
        description: "My email address is",
        value: user.email,
      },
      dob: {
        description: "I was born on",
        value: new Date(user.dob.date).toLocaleDateString(),
      },
      location: {
        description: "I live in",
        value: user.location.street.number + ", " + user.location.street.name,
      },
      phone: {
        description: "My phone number is",
        value: user.cell || user.phone,
      },
      password: {
        description: "My password is",
        value: user.login.password,
      },
    };
  }, [user]);
  const [userDataField, setUserDataField] = useState<{
    description: string;
    value: string;
  }>(data.name);

  return (
    <div className="bg-gray-100 rounded-md overflow-hidden">
      <div className="flex justify-center relative pt-12">
        <div className="absolute inset-0 bg-gray-200 -translate-y-1/2 mt-12" />
        <Image
          src={user.picture.large}
          alt={user.name.first}
          className="size-32 rounded-full border-2 border-gray-300 p-1 relative z-10"
          width={256}
          height={256}
        />
      </div>
      <div className="mt-4 pb-12 px-2">
        <p
          className="text-center text-xs sm:text-sm"
          style={{
            wordBreak: "break-word",
          }}
        >
          {userDataField.description}
        </p>
        <h2
          className="text-center text-base sm:text-lg font-semibold"
          style={{
            wordBreak: "break-word",
          }}
        >
          {userDataField.value}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
          <button
            className="inline-block cursor-pointer"
            onMouseOver={() => setUserDataField(data.name)}
          >
            <FaUserCircle
              className={clsx(
                "size-6",
                userDataField === data.name && "text-green-500"
              )}
            />
          </button>
          <button
            className="inline-block cursor-pointer"
            onMouseOver={() => setUserDataField(data.email)}
          >
            <FaEnvelopeOpen
              className={clsx(
                "size-6",
                userDataField === data.email && "text-green-500"
              )}
            />
          </button>
          <button
            className="inline-block cursor-pointer"
            onMouseOver={() => setUserDataField(data.dob)}
          >
            <FaCalendarAlt
              className={clsx(
                "size-5",
                userDataField === data.dob && "text-green-500"
              )}
            />
          </button>
          <button
            className="inline-block cursor-pointer"
            onMouseOver={() => setUserDataField(data.location)}
          >
            <FaMapMarked
              className={clsx(
                "size-6",
                userDataField === data.location && "text-green-500"
              )}
            />
          </button>
          <button
            className="inline-block cursor-pointer"
            onMouseOver={() => setUserDataField(data.phone)}
          >
            <FaPhoneAlt
              className={clsx(
                "size-5",
                userDataField === data.phone && "text-green-500"
              )}
            />
          </button>
          <button
            className="inline-block cursor-pointer"
            onMouseOver={() => setUserDataField(data.password)}
          >
            <FaLock
              className={clsx(
                "size-5",
                userDataField === data.password && "text-green-500"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
