import { Suspense } from "react";
import TagList from "./tag-list";

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string[] };
}) {
  let tags: string[] = [];
  if (typeof searchParams.tag === "string") {
    tags = [searchParams.tag];
  } else if (searchParams.tag) {
    tags = searchParams.tag;
  }

  return (
    <div className="grid grid-cols-2 max-w-md mx-auto min-h-screen gap-4">
      <div className="p-4">
        <Suspense fallback={<p>Loading...</p>}>
          <Content tags={tags} />
        </Suspense>
      </div>
      <div className="bg-gray-200 p-4">
        <p className="text-sm font-semibold">Filter</p>

        <TagList />

        <div className="mt-3 text-sm"></div>
      </div>
    </div>
  );
}

async function Content({ tags }: { tags: string[] }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>
      <div>Params (server):</div>
      <div>
        {tags.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
    </div>
  );
}
