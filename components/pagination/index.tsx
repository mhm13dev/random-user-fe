import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import clsx from "clsx";
import { useUserStore } from "@/store/users.store";

const Pagination: React.FC = () => {
  const searchParams = useSearchParams();
  const { page, totalPages } = useUserStore(
    useShallow((state) => ({ page: state.page, totalPages: state.totalPages }))
  );
  const { setPage } = useUserStore(useShallow((state) => state.actions));

  useEffect(() => {
    if (searchParams.get("page")) {
      setPage(Number(searchParams.get("page")));
    } else {
      setPage(1);
    }
  }, [searchParams, setPage]);

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <Link
        href={{
          query: {
            page: page - 1,
          },
        }}
        className={clsx(
          "bg-black text-white px-4 py-2 rounded-md flex items-center",
          page === 1 ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
        )}
      >
        <GrFormPreviousLink className="size-6 mr-1" />
        Previous
      </Link>
      <span className="mx-4 font-semibold">{page}</span>
      <Link
        href={{
          query: {
            page: totalPages > page ? page + 1 : page,
          },
        }}
        className={clsx(
          "bg-black text-white px-4 py-2 rounded-md flex items-center",
          totalPages === page
            ? "pointer-events-none opacity-50 cursor-not-allowed"
            : ""
        )}
      >
        Next
        <GrFormNextLink className="size-6 ml-1" />
      </Link>
    </div>
  );
};

export default Pagination;
