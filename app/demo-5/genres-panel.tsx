"use client";

import { useRouter } from "next/navigation";

export default function GenresPanel({ genres }: { genres: string[] }) {
  let router = useRouter();

  return (
    <div className="bg-gray-700 rounded w-60 shadow-md shadow-gray-950/30 p-4">
      {["1", "2", "3", "4", "5"].map((genre) => (
        <label key={genre} className="flex gap-2 items-center">
          <input
            checked={genres.includes(genre)}
            onChange={(e) => {
              let newGenres;
              if (e.target.checked) {
                newGenres = [...genres, genre];
              } else {
                newGenres = genres.filter((g) => g !== genre);
              }

              let newParams = new URLSearchParams(
                newGenres.map((genre) => ["genre", genre])
              );
              router.push(`?${newParams}`);
            }}
            type="checkbox"
            name={genre}
            className="accent-blue-500"
          />
          Genre {genre}
        </label>
      ))}

      <div className="mt-4">
        <button
          className="bg-gray-100 px-2 text-sm font-medium py-1 text-gray-900 hover:bg-white rounded"
          onClick={() => {
            router.push(window.location.pathname);
          }}
        >
          Clear
        </button>
      </div>

      <div className="mt-4">
        <div>Params (Client):</div>

        <div className="mt-2">
          {genres.map((genre) => (
            <p key={genre}>{genre}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
