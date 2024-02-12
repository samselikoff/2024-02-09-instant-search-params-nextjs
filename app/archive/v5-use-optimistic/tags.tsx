"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

export function Tags({ tags }: { tags: string[] }) {
  let router = useRouter();
  let [pending, startTransition] = useTransition();
  let [optimisticTags, setOptimsticTags] = useOptimistic(tags);

  function removeTag(value: string) {
    let newTags = optimisticTags.filter((tag) => tag !== value);
    pushTags(newTags);
  }

  function addTag(value: string) {
    let newTags = [...optimisticTags, value];
    pushTags(newTags);
  }

  function pushTags(tags: string[]) {
    let newParams = new URLSearchParams(window.location.search);
    newParams.delete("tag");
    for (let tag of tags) {
      newParams.append("tag", tag);
    }

    startTransition(() => {
      setOptimsticTags(tags);
      router.push(`?${newParams}`);
    });
  }

  return (
    <div className="grid grid-cols-2 max-w-md mx-auto min-h-screen gap-4">
      <div className={`p-4 ${pending ? "opacity-50" : ""}`}>
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
        <div>
          <div>Params (optimistic):</div>
          <div>
            {optimisticTags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold">Filter</p>

        {Array.from(Array(10).keys()).map((i) => (
          <label key={i} className="flex gap-2 items-center">
            <input
              checked={optimisticTags.includes(`${i}`)}
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
          <button onClick={() => pushTags([])}>Clear</button>
        </div>
      </div>
    </div>
  );
}
