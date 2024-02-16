"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

export default function GenresPanel({ genres }: { genres: string[] }) {
  let router = useRouter();
  let [optimisticGenres, setOptimsticGenres] = useOptimistic(genres);
  let [pending, startTransition] = useTransition();

  function removeGenre(genre: string) {
    let newGenres = optimisticGenres.filter((g) => g !== genre);
    pushGenres(newGenres);
  }

  function addGenre(genre: string) {
    let newGenres = [...optimisticGenres, genre];
    pushGenres(newGenres);
  }

  function pushGenres(genres: string[]) {
    let newParams = new URLSearchParams(
      genres.map((genre) => ["genre", genre])
    );

    startTransition(() => {
      setOptimsticGenres(genres);
      router.push(`?${newParams}`);
    });
  }

  return (
    <div className="bg-gray-700 rounded w-60 shadow-md shadow-gray-950/30 p-4">
      {["1", "2", "3", "4", "5"].map((i) => (
        <label key={i} className="flex gap-2 items-center">
          <input
            checked={optimisticGenres.includes(i)}
            onChange={(e) => {
              let { name, checked } = e.target;
              if (checked) {
                addGenre(name);
              } else {
                removeGenre(name);
              }
            }}
            type="checkbox"
            name={i}
            className="accent-blue-500"
          />
          Genre {i}
        </label>
      ))}

      <div className="mt-4">
        <button
          className="bg-gray-100 px-2 text-sm font-medium py-1 text-gray-900 hover:bg-white rounded"
          onClick={() => pushGenres([])}
        >
          Clear
        </button>
      </div>

      <div className="mt-4">
        <div>Params (Client):</div>

        <div className="mt-2">
          {optimisticGenres.map((genre) => (
            <p key={genre}>{genre}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
