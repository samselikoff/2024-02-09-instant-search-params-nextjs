"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

export default function TagList({ tags }: { tags: string[] }) {
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
    let newParams = new URLSearchParams(tags.map((tag) => ["tag", tag]));

    startTransition(() => {
      setOptimsticTags(tags);
      router.push(`?${newParams}`);
    });
  }

  return (
    <div className="grid grid-cols-2 min-h-screen gap-4">
      <div
        className={`p-4 ml-auto ${pending ? "opacity-50 delay-[60ms]" : ""}`}
      >
        <div>
          <div>Params (server):</div>
          <div>
            {tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-300 p-4">
        <p className="font-medium text-sm leading-6">Filter:</p>

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
          <button
            className="bg-gray-100 px-2 text-sm font-medium py-1 border border-gray-400 hover:bg-white rounded"
            onClick={() => pushTags([])}
          >
            Clear
          </button>
        </div>

        <div className="mt-4">
          <div>Params (client):</div>
          <div>
            {optimisticTags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
