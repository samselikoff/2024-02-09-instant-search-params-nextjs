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

  // Fetch the content...
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>
      <URLBar />

      <div className="flex">
        <div className="p-6">
          <GenresPanel genres={genres} />
        </div>

        <div className="p-4 mt-2">
          <p>Params (Server):</p>

          <div className="mt-2">
            {genres.map((genre) => (
              <p key={genre}>{genre}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
