import CategoryTag from "./CategoryTag";
import PostCoverImage from "./PostCoverImage";

export default function PostTitle({
  title,
  date,
  coverImagePath,
  coverImagePhotographer,
  coverImageSrcUrl,
  category,
}: {
  title: string;
  date: string;
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
  category: string;
}) {
  return (
    <div className="mb-4 items-center">
      <CategoryTag label={category} />
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      <time dateTime={date} className="text-slate-900">
        {date}
      </time>
      <PostCoverImage
        coverImagePath={coverImagePath}
        coverImagePhotographer={coverImagePhotographer}
        coverImageSrcUrl={coverImageSrcUrl}
      />
    </div>
  );
}
