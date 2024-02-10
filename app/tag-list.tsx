"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TagList() {
  const initialParams = useSearchParams();
  let [params, setNewParams] = useState(new URLSearchParams(initialParams));
  let router = useRouter();

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
    setNewParams(params);
    router.push(`?${params}`);

    /*
      Doesn't refresh the RSC tree consistently
    */
    // window.history.pushState(null, "", `?${params}`);
    // router.refresh();
  }

  return (
    <>
      {Array.from(Array(10).keys()).map((i) => (
        <label key={i} className="flex gap-2 items-center">
          <input
            checked={params.getAll("tag").includes(`${i}`)}
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
          {params.getAll("tag").map((tag) => (
            <p key={tag}>{tag}</p>
          ))}
        </div>
      </div>
    </>
  );
}
