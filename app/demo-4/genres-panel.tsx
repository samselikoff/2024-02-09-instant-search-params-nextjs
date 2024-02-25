"use client";

import { useRouter } from "next/navigation";

export default function GenresPanel({ genres }: { genres: string[] }) {
  let router = useRouter();

  return (
    <div className="bg-gray-700 rounded sm:w-60 shadow-md shadow-gray-950/30 p-4">
      <div className="flex gap-6 sm:block overflow-x-scroll pb-4 sm:pb-0 -mx-4 px-4 sm:-mx-0 sm:px-0">
        {["1", "2", "3", "4", "5"].map((genre) => (
          <label
            key={genre}
            className="flex gap-2 items-center whitespace-nowrap"
          >
            <input
              checked={genres.includes(genre)}
              onChange={(e) => {
                let { name, checked } = e.target;
                let newGenres = checked
                  ? [...genres, name]
                  : genres.filter((g) => g !== name);
                let newParams = new URLSearchParams(
                  newGenres.map((genre) => ["genre", genre])
                );
                router.push(`?${newParams}`);
              }}
              name={genre}
              type="checkbox"
              className="accent-blue-500"
            />
            Genre {genre}
          </label>
        ))}
      </div>

      <div className="mt-4">
        <button
          className="bg-gray-100 px-2 text-sm font-medium py-1 text-gray-900 hover:bg-white rounded"
          onClick={() => router.push(`?`)}
        >
          Clear
        </button>
      </div>

      <div className="mt-4">
        <p>Params (Client):</p>

        <div className="mt-2">
          {genres.map((genre) => (
            <p key={genre}>{genre}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
