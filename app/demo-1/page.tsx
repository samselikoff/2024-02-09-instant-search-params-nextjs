import Image from "next/image";
import TagList from "./tag-list";
import { PrismaClient } from "@prisma/client";
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
    <div className="max-w-7xl mx-auto flex gap-6 p-12">
      <TagList genres={genres} />

      <div className="grow">
        <p>{movies.length} results</p>

        <div className="mt-4 w-full grid grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div className="flex" key={movie.id}>
              <Image
                alt={movie.title}
                width={200}
                height={300}
                className="w-full object-cover rounded-lg shadow-sm shadow-black"
                src={`https://img.omdbapi.com/?apikey=ba958b67&i=${movie.imdb_id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Fetch the content...
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // return <TagList tags={tags} />;
}
