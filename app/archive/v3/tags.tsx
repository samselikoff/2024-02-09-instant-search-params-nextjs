"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";

export function Tags({ tags }: { tags: string[] }) {
  let searchParams = useSearchParams();
  let clientTags = !searchParams.get("tag") ? [] : searchParams.getAll("tag");

  let router = useRouter();

  let [isPending, startTransition] = useTransition();

  useEffect(() => {
    // let newParams = new URLSearchParams(window.location.search);
    // newParams.delete("tag");
    // let clientTags = !searchParams.get("tag") ? [] : searchParams.getAll("tag");

    // for (let tag of clientTags) {
    //   newParams.append("tag", tag);
    // }

    console.log("here");
    startTransition(() => {
      router.refresh();
    });
  }, [router, searchParams]);

  function removeTag(value: string) {
    let newTags = clientTags.filter((tag) => tag !== value);
    pushTags(newTags);
  }

  function addTag(value: string) {
    let newTags = [...clientTags, value];
    pushTags(newTags);
  }

  function pushTags(tags: string[]) {
    let newParams = new URLSearchParams(window.location.search);
    newParams.delete("tag");

    for (let tag of tags) {
      newParams.append("tag", tag);
    }

    window.history.pushState(null, "", `?${newParams}`);
  }

  return (
    <div className="grid grid-cols-2 max-w-md mx-auto min-h-screen gap-4">
      <div className={`p-4 ${isPending ? "opacity-50" : ""}`}>
        <div>
          <div>Params (server):</div>
          <div>
            {tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-4">
        <p className="text-sm font-semibold">Filter</p>

        {Array.from(Array(10).keys()).map((i) => (
          <label key={i} className="flex gap-2 items-center">
            <input
              checked={clientTags.includes(`${i}`)}
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

        <div>
          <div>Params (client):</div>
          <div>
            {clientTags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <button onClick={() => pushTags([])}>Clear</button>
        </div>
      </div>
    </div>
  );
}
