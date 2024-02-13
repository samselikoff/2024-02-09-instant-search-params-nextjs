import TagList from "./tag-list";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let tags = !searchParams.tag
    ? []
    : typeof searchParams.tag === "string"
    ? [searchParams.tag]
    : searchParams.tag;
  let urlSearchParams = getURLSearchParams(searchParams);

  // Fetch the content...
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <TagList tags={tags} urlSearchParams={urlSearchParams.toString()} />;
}

function getURLSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const urlSearchParams = new URLSearchParams();

  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      // If the value is an array, append each value under the same key
      value.forEach((item) => {
        if (item !== undefined) {
          urlSearchParams.append(key, item);
        }
      });
    } else if (value !== undefined) {
      // If the value is a string (and not undefined), append it
      urlSearchParams.append(key, value);
    }
    // Undefined values are skipped
  });

  return urlSearchParams;
}
