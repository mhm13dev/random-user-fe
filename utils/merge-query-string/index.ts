import { ReadonlyURLSearchParams } from "next/navigation";

export const mergeQueryString = ({
  searchParams,
  newSearchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
  newSearchParams: {
    name: string;
    value: string;
  }[];
}) => {
  const params = new URLSearchParams(searchParams.toString());
  newSearchParams.forEach((param) => {
    params.set(param.name, param.value);
  });
  return params.toString();
};
