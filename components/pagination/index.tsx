import React, { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import clsx from "clsx";
import { useUserStore } from "@/store/users.store";
import { mergeQueryString } from "@/utils/merge-query-string";

const Pagination: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { page, totalPages } = useUserStore(
    useShallow((state) => ({ page: state.page, totalPages: state.totalPages }))
  );

  const createHrefWithQueryParam = useCallback(
    (name: string, value: string) => {
      return (
        `${pathname}?` +
        mergeQueryString({
          searchParams,
          newSearchParams: [
            {
              name,
              value,
            },
          ],
        })
      );
    },
    [pathname, searchParams]
  );

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <Link
        href={createHrefWithQueryParam("page", `${page > 1 ? page - 1 : 1}`)}
        className={clsx(
          "bg-black text-white px-3 py-2 rounded-md flex items-center hover:bg-green-500 text-sm transition-all duration-300",
          page === 1 ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
        )}
      >
        <GrFormPreviousLink className="size-5 mr-1" />
        Previous
      </Link>
      <span className="mx-4 font-semibold">
        {totalPages >= page ? page : 0} of {totalPages}
      </span>
      <Link
        href={createHrefWithQueryParam(
          "page",
          `${totalPages > page ? page + 1 : page}`
        )}
        className={clsx(
          "bg-black text-white px-3 py-2 rounded-md flex items-center hover:bg-green-500 text-sm transition-all duration-300",
          totalPages === page
            ? "pointer-events-none opacity-50 cursor-not-allowed"
            : ""
        )}
      >
        Next
        <GrFormNextLink className="size-5 ml-1" />
      </Link>
    </div>
  );
};

export default Pagination;
