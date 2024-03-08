import { ReadonlyURLSearchParams } from "next/navigation";

export const mergeQueryString = ({
  searchParams,
  name,
  value,
}: {
  searchParams: ReadonlyURLSearchParams;
  name: string;
  value: string;
}) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  return params.toString();
};
