"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

export default function GenresPanel({ genres }: { genres: string[] }) {
  let router = useRouter();
  let [pending, startTransition] = useTransition();
  let [optimisticGenres, setOptimisticGenres] = useOptimistic(genres);

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

      router.push(`?${newParams}`);
    });
  }

  return (
    <div
      data-pending={pending ? "" : undefined}
      className="mt-6 w-60 bg-gray-700 rounded-md shadow-md shadow-gray-950/30"
    >
      <div className="p-4">
        <h2 className="text-gray-100 tracking-tight font-semibold text-lg">
          Genres
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
                  ? "bg-accent text-white border-accent "
                  : "border-gray-500 hover:border-gray-400"
              } px-3 py-1 rounded-full font-medium border text-sm`}
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
            onClick={() => pushGenres([])}
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
