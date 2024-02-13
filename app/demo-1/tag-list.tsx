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

      router.push(`?${newParams}`, { scroll: false });
    });
  }

  return (
    <div className="flex h-screen relative gap-4">
      <div className="sticky top-0 overflow-y-scroll w-60 bg-gray-700 p-4">
        <p>Client:</p>

        <div className="mt-4">
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
              />
              Tag {i}
            </label>
          ))}
        </div>

        <div className="mt-4">
          <button
            className="bg-gray-100 px-2 text-sm font-medium py-1 text-gray-900 hover:bg-white rounded"
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
      <div className={`${pending ? "opacity-50 delay-[60ms]" : ""} p-4`}>
        <div>
          <div>Params (server):</div>
          <div>
            {tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
