import { Tags } from "./tags";

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

  return <Tags tags={tags} />;
}
