"use client";

import { useRouter } from "next/navigation";
import { useEffect, useOptimistic, useTransition } from "react";
import { createGlobalState } from "react-hooks-global-state";

export const { useGlobalState } = createGlobalState({ pending: false });

export default function TagList({ genres }: { genres: string[] }) {
  let router = useRouter();
  let [pending, startTransition] = useTransition();
  let [, setGlobalPending] = useGlobalState("pending");
  let [optimisticGenres, setOptimisticGenres] = useOptimistic(genres);

  useEffect(() => {
    setGlobalPending(pending);
  }, [pending, setGlobalPending]);

  function removeGenre(value: string) {
    let newGenres = optimisticGenres.filter((genre) => genre !== value);
    pushGenres(newGenres);
  }

  function addGenre(value: string) {
    let newGenres = [...optimisticGenres, value];
    pushGenres(newGenres);
  }

  function pushGenres(genres: string[]) {
    let newParams = new URLSearchParams(
      genres.sort().map((genre) => ["genre", genre])
    );

    startTransition(() => {
      setOptimisticGenres(genres.sort());

      router.push(`?${newParams}`, { scroll: false });
    });
  }

  return (
    <div className="shrink-0">
      <h1 className="text-3xl font-semibold tracking-tight text-white">
        Popular movies
      </h1>

      <div className="sticky top-6 mt-6 w-60 bg-gray-600 rounded-lg p-4">
        <h2 className="text-gray-100 tracking-tight font-semibold text-xl">
          Genre
        </h2>

        <div className="mt-4 flex flex-wrap gap-y-2 gap-x-1">
          {GENRES.map((genre) => (
            <button
              onClick={() => {
                if (optimisticGenres.includes(genre)) {
                  removeGenre(genre);
                } else {
                  addGenre(genre);
                }
              }}
              key={genre}
              className={`${
                optimisticGenres.includes(genre)
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-gray-500 hover:border-white"
              } px-3 py-1 rounded-full font-medium border text-sm`}
            >
              {/* <input
                checked={optimisticGenres.includes(genre)}
                onChange={(e) => {
                  let { name, checked } = e.target;
                  if (checked) {
                    addGenre(name);
                  } else {
                    removeGenre(name);
                  }
                }}
                type="checkbox"
                name={genre}
              /> */}
              {genre}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <button
            className="bg-gray-100 px-2 text-sm font-medium py-1 text-gray-900 hover:bg-white rounded"
            onClick={() => pushGenres([])}
          >
            Clear
          </button>
        </div>

        {/* <div className="mt-4">
          <div>Params (client):</div>
          <div>
            {optimisticGenres.map((genre) => (
              <p key={genre}>{genre}</p>
            ))}
          </div>
        </div> */}
      </div>
      {/* <div className={`${pending ? "opacity-50 delay-[60ms]" : ""} p-4`}>
      <div>
        <div>Params (server):</div>
        <div>
          {tags.map((tag) => (
            <p key={tag}>{tag}</p>
          ))}
        </div>
      </div>
    </div> */}
    </div>
  );
}

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
];
