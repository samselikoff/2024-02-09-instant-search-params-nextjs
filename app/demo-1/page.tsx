import Image from "next/image";
import TagList from "./tag-list";
import { PrismaClient } from "@prisma/client";
import Transition from "./transition";
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
        OR: genres.map((genre) => ({
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
    <div className="max-w-7xl mx-auto p-12 flex gap-6">
      <TagList genres={genres} />

      <Transition className="grow" pendingClassName="animate-pulse">
        <p className="leading-9">
          <span className="font-semibold">{movies.length}</span> results
        </p>

        <div className="mt-6 w-full grid grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div className="relative w-full aspect-[2/3]" key={movie.id}>
              <Image
                alt={movie.title}
                fill
                className="absolute inset-0 object-cover rounded-lg shadow-sm shadow-black"
                src={`https://img.omdbapi.com/?apikey=ba958b67&i=${movie.imdb_id}`}
              />
            </div>
          ))}
        </div>
      </Transition>
    </div>
  );

  // Fetch the content...
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // return <TagList tags={tags} />;
}

export const runtime = "nodejs";
