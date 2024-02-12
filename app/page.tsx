import TagList from "./tag-list";

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

  // Fetch the content...
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <TagList tags={tags} />;
}
