import Sidebar from "./sidebar";

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string | string[] };
}) {
  let tags = !searchParams.tag
    ? []
    : typeof searchParams.tag === "string"
    ? [searchParams.tag]
    : searchParams.tag;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <Sidebar tags={tags}>
      <div>
        <div>Params (server):</div>
        <div>
          {tags.map((tag) => (
            <p key={tag}>{tag}</p>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}
