"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function Tags({ tags}: { tags: string[]}) {
  let searchParams = useSearchParams();
  let [instantUpdateUrl, setInstantUpdateUrl] = useState(false);

  let [clientTags, setClientTags] = useState(tags);
  let router = useRouter();

  let [isPending, startTransition] = useTransition();

  useEffect(() => {
    let tags = searchParams.getAll('tag');
    setClientTags(tags);
  }, [searchParams])

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

    if (instantUpdateUrl) {
      window.history.pushState(null, "", `/v2?${newParams}`);
    }

    setClientTags(tags);

    startTransition(() => {
      router.push(`/v2?${newParams}`);
    });
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

        <div className="mt-4">
          <label>
            <input
              type="checkbox"
              checked={instantUpdateUrl}
              onChange={(e) => setInstantUpdateUrl(e.target.checked)}
            />{" "}
            Instant update URL
          </label>
        </div>

      </div>
    </div>
  );
}
