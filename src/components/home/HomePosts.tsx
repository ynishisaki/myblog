import Image from "next/image";
import Link from "next/link";

export const HomePosts = ({
  title,
  coverImagePath,
  coverImagePhotographer,
  coverImageSrcUrl,
  date,
  slug,
  excerpt,
  category,
}: {
  title: string;
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
  date: string;
  slug: string;
  excerpt: string;
  category: string;
}) => {
  return (
    <Link href={`/posts/${slug}`} passHref className="relative z-[10]">
      <article className="mb-2 transform rounded-md bg-[#FAF7F2] p-4 shadow transition-shadow transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:full h-1/2 pb-3 pr-0 md:w-1/2 md:pb-0 md:pr-3">
            <Image
              width={400}
              height={300}
              src={coverImagePath}
              alt="coverimage from Unsplash"
              style={{
                objectFit: "cover",
                borderRadius: "0.375rem", // md
              }}
            />
          </div>
          <div className="my-auto flex flex-1 flex-col md:w-1/2 md:pl-3 md:pt-3">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {title}
            </h2>
            <time dateTime={date} className="mt-4 text-sm text-slate-600">
              {date}
            </time>
            <p className="mt-1 line-clamp-3 hidden text-sm text-slate-600 md:block">
              {excerpt}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};
