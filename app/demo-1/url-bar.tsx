"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function URLBar() {
  let router = useRouter();
  let pathname = usePathname();
  let searchParams = useSearchParams();

  let url = new URL(pathname, "http://foo.com");
  url.search = searchParams.toString();

  return (
    <div className="shadow p-2 bg-gray-700 flex gap-2 z-10 sticky top-0 items-center">
      <div className="flex gap-1">
        <button
          className="p-2 rounded-full hover:bg-gray-600 transition text-gray-400"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-600 transition text-gray-400"
          onClick={() => {
            router.forward();
          }}
        >
          <ArrowRightIcon className="w-4 h-4" />
        </button>
        {/* <button
          className="p-2 rounded-full hover:bg-gray-600 transition text-gray-400"
          onClick={() => {
            window.location.reload();
          }}
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button> */}
      </div>
      <span className="bg-gray-600 rounded-full truncate grow px-3 py-1.5 text-gray-400 font-medium text-sm">
        {pathname}
        {url.search}
      </span>
    </div>
  );
}
