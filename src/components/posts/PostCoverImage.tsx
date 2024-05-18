import Image from "next/image";

type ChildCompProps = {
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
};

export default function PostCoverImage(props: ChildCompProps) {
  return (
    <>
      {/* 画像サイズを親要素で指定する */}
      <div className="relative h-[200px] w-full sm:h-[300px] md:h-[450px]">
        <Image
          src={props.coverImagePath}
          alt="cover image from Unsplash"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <p className="text-right text-sm">
        Photo by{" "}
        <a
          href={props.coverImageSrcUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0f83fd] hover:underline"
        >
          {props.coverImagePhotographer}
        </a>
        {" "}on{" "}
        <a
          href="https://unsplash.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0f83fd] hover:underline"
        >
          Unsplash
        </a>
      </p>
    </>
  );
}
