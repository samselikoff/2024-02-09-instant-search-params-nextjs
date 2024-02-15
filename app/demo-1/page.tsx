import Image from "next/image";
import GenresPanel from "./genres-panel";
import { PrismaClient } from "@prisma/client";
import Transition from "./transition";
import URLBar from "./url-bar";
const prisma = new PrismaClient();

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let genres = !searchParams.genre
    ? []
    : typeof searchParams.genre === "string"
    ? [searchParams.genre]
    : searchParams.genre;

  // prisma query to find the first 20 movies where genre is in genres
  let moviesPromise;
  if (genres.length === 0) {
    moviesPromise = prisma.movies.findMany({
      orderBy: {
        imdb_score: "desc",
      },
    });
  } else {
    moviesPromise = prisma.movies.findMany({
      where: {
        AND: genres.map((genre) => ({
          genres: {
            contains: genre,
          },
        })),
      },
      orderBy: {
        imdb_score: "desc",
      },
    });
  }

  // Artificial delay
  let [movies] = await Promise.all([
    moviesPromise,
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);

  return (
    <>
      <URLBar />

      <div className="isolate max-w-7xl mx-auto px-6 py-4 lg:p-12 flex gap-6 ">
        <div className="shrink-0 relative">
          <div className="sticky top-16">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Top movies
            </h1>

            <GenresPanel genres={genres} />
          </div>
        </div>

        <Transition className="grow" pendingClassName="animate-pulse">
          <p className="leading-9 text-right">
            <span className="font-semibold">{movies.length}</span> results
          </p>
          <div className="mt-6 w-full grid grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.length === 0 ? (
              <p className="text-center text-gray-400 col-span-full">
                No movies found.
              </p>
            ) : (
              movies.map((movie) => (
                <div className="relative w-full aspect-[2/3]" key={movie.id}>
                  <Image
                    alt={movie.title}
                    fill
                    sizes="300px"
                    className="absolute inset-0 object-cover rounded-lg shadow-sm shadow-black"
                    src={`https://img.omdbapi.com/?apikey=2e4d632&i=${movie.imdb_id}`}
                  />
                </div>
              ))
            )}
          </div>
        </Transition>
      </div>
    </>
  );
}

export const runtime = "nodejs";
