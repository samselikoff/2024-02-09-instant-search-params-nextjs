"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

export default function GenresPanel({ genres }: { genres: string[] }) {
  let router = useRouter();
  let [pending, startTransition] = useTransition();
  let [optimisticGenres, setOptimisticGenres] = useOptimistic(genres);

  return (
    <div
      data-pending={pending ? "" : undefined}
      className="mt-6 sm:w-60 bg-gray-700 rounded-md shadow-md shadow-gray-950/30"
    >
      <div className="p-4">
        <h2 className="text-gray-100 tracking-tight font-semibold text-lg">
          Genres
        </h2>

        <div className="mt-4 -mx-4 px-4 sm:px-0 sm:mx-0 pb-3 sm:pb-0 flex overflow-x-scroll sm:overflow-auto sm:flex-wrap gap-y-2 gap-x-1">
          {GENRES.map((genre) => (
            <button
              onClick={() => {
                let newGenres = !optimisticGenres.includes(genre)
                  ? [...optimisticGenres, genre]
                  : optimisticGenres.filter((g) => g !== genre);

                let newParams = new URLSearchParams(
                  newGenres.sort().map((genre) => ["genre", genre])
                );

                startTransition(() => {
                  setOptimisticGenres(newGenres.sort());

                  router.push(`?${newParams}`);
                });
              }}
              key={genre}
              className={`${
                optimisticGenres.includes(genre)
                  ? "bg-accent text-white border-accent "
                  : "border-gray-500 hover:border-gray-400"
              } px-3 py-1 rounded-full whitespace-nowrap font-medium border text-sm`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {optimisticGenres.length > 0 && (
        <div className="border-t p-2 border-gray-600">
          <button
            className="text-sm py-2 rounded hover:bg-gray-600 font-medium w-full text-center"
            onClick={() => {
              startTransition(() => {
                setOptimisticGenres([]);

                router.push(`?`);
              });
            }}
          >
            Clear genres
          </button>
        </div>
      )}
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
