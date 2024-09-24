import {
  elementScroll,
  useVirtualizer,
  VirtualizerOptions,
} from "@tanstack/react-virtual";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
  date: string;
  category: string;
}

export const VirtualPosts = ({ props }: { props: Post[] }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const scrollingRef = useRef<number>();

  const scrollToFn: VirtualizerOptions<any, any>["scrollToFn"] = useCallback(
    (offset, canSmooth, instance) => {
      const duration = 1000;
      const start = parentRef.current?.scrollTop || 0;
      const startTime = (scrollingRef.current = Date.now());

      const run = () => {
        if (scrollingRef.current !== startTime) return;
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
        const interpolated = start + (offset - start) * progress;

        if (elapsed < duration) {
          elementScroll(interpolated, canSmooth, instance);
          requestAnimationFrame(run);
        } else {
          elementScroll(interpolated, canSmooth, instance);
        }
      };

      requestAnimationFrame(run);
    },
    [],
  );

  const virtualizer = useVirtualizer({
    count: props.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 260,
    overscan: 5,
    scrollToFn,
  });

  return (
    <div className="relative">
      <div className="absolute bottom-2 right-2 z-20 text-center">
        <button
          className="rounded-full bg-[#FAF7F2] p-2 text-2xl shadow-xl hover:shadow-2xl"
          onClick={() => {
            virtualizer.scrollToIndex(0);
          }}
        >
          <AiOutlineArrowUp />
        </button>
      </div>

      <div
        ref={parentRef}
        className="relative h-[calc(100vh_-_50px_-_112px)] w-full overflow-y-auto py-4"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
          className="relative"
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const post = props[virtualItem.index];
            const { title, coverImagePath, date, slug, excerpt } = post;
            return (
              <div
                key={virtualItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                className="py-1.5"
              >
                <Link
                  href={`/posts/${slug}`}
                  passHref
                  className="shadow hover:shadow-xl"
                >
                  <article className="mx-auto flex h-full w-[90%] gap-x-4 rounded-md border-2 border-transparent bg-[#FAF7F2] p-4 shadow-xl transition-all hover:border-blue-500 sm:w-[600px] md:w-[750px]">
                    <div className="relative hidden h-[calc(260px_-_2*4*4px_-_2*4px)] w-[calc(320px_-_2*2*4px)] md:block">
                      <Image
                        fill={true}
                        src={coverImagePath}
                        alt="coverimage from Unsplash"
                        style={{
                          borderRadius: "0.375rem", // md
                        }}
                      />
                    </div>
                    <div className="my-auto flex flex-col md:w-[calc(100%_-_320px)]">
                      <h2 className="text-xl font-bold text-slate-900">
                        {title}
                      </h2>
                      <time
                        dateTime={date}
                        className="mt-4 text-sm italic text-slate-600"
                      >
                        {date}
                      </time>
                      <p className="mt-1 line-clamp-3 text-sm text-slate-600">
                        {excerpt}
                      </p>
                      <div className="mt-4 text-sm font-black uppercase text-blue-500">
                        Read More
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
