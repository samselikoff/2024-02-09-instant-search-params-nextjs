"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function TagList() {
  const searchParams = useSearchParams();
  let router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  let [pending, startTransition] = useTransition();

  function removeTag(value: string) {
    let newParams = Array.from(params.entries()).filter((param) => {
      return param[0] !== "tag" || param[1] !== value;
    });
    let newSearchParams = new URLSearchParams(newParams);
    updateSearchParams(newSearchParams);
  }

  function addTag(value: string) {
    let newParams = new URLSearchParams(params);
    newParams.append("tag", value);
    updateSearchParams(newParams);
  }

  function updateSearchParams(params: URLSearchParams) {
    startTransition(() => {
      window.history.pushState(null, "", `?${params}`);
    });
    router.refresh();
  }

  return (
    <>
      {Array.from(Array(10).keys()).map((i) => (
        <label key={i} className="flex gap-2 items-center">
          <input
            onChange={(e) => {
              let { name, checked } = e.target;
              if (checked) {
                addTag(name);
              } else {
                removeTag(name);
              }
            }}
            type="checkbox"
            name={`${i}`}
          />{" "}
          Tag {i}
        </label>
      ))}

      <div className="mt-4">
        <div>Params (client):</div>
        <div>
          {searchParams.getAll("tag").map((tag) => (
            <p key={tag}>{tag}</p>
          ))}
        </div>
      </div>
    </>
  );
}
