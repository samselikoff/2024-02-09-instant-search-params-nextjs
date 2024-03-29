import { Suspense } from "react";
import URLBar from "../demo-1/url-bar";
import GenresPanel from "./genres-panel";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let genres = Array.isArray(searchParams.genre)
    ? searchParams.genre
    : searchParams.genre
    ? [searchParams.genre]
    : [];

  return (
    <div>
      <URLBar />

      <div className="sm:flex group">
        <div className="p-4 sm:p-6">
          <GenresPanel genres={genres} />
        </div>

        <div className="p-4 mt-2">
          <Suspense fallback={<p>Loading...</p>}>
            <MovieList genres={genres} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function MovieList({ genres }: { genres: string[] }) {
  // Fetch the content...
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      <p>Params (Server):</p>

      <div className="mt-2">
        {genres.map((genre) => (
          <p key={genre}>{genre}</p>
        ))}
      </div>
    </>
  );
}
