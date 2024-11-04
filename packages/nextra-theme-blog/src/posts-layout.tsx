import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useBlogContext } from './blog-context'
import { collectPostsAndNavs } from './utils/collect'
import getTags from './utils/get-tags'

export function PostsLayout(): ReactElement {
  const { config, opts } = useBlogContext()
  const { posts } = collectPostsAndNavs({ config, opts })
  const router = useRouter()
  const { type } = opts.frontMatter
  const tagName = type === 'tag' ? router.query.tag : null

  const postList = posts.map((post, index) => {
    if (tagName) {
      const tags = getTags(post)
      if (!Array.isArray(tagName) && !tags.includes(tagName)) {
        return null
      }
    } else if (type === 'tag') {
      return null
    }

    const postName = post.route.split('/').pop()
    const coverImagePath = `/assets/blog/${postName}/cover.webp`

    const postTitle = post.frontMatter?.title || post.name
    const date: Date | null = post.frontMatter?.date
      ? new Date(post.frontMatter.date)
      : null
    const description = post.frontMatter?.description

    return (
      <div key={post.route}>
        <Link href={post.route} passHref className="_no-underline block">
          <article className="_mb-3 _p-4 _flex _h-full _gap-x-4 _rounded-md _border-2 _border-transparent _shadow _transition-all hover:_border-blue-500 hover:_shadow-xl">
            <div className="_relative _hidden _h-[calc(260px_-_2*4*4px_-_2*4px)] _w-[calc(320px_-_2*2*4px)] sm:_block">
              <Image
                width={320 - 2 * 2 * 4}
                height={260 - 2 * 4 * 4 - 2 * 4}
                src={coverImagePath}
                alt="coverimage from Unsplash"
                priority={index < 3}
                className="_m-0 _h-full _rounded-md _object-cover"
              />
            </div>
            <div className="_my-auto _flex _flex-col sm:_w-[calc(100%_-_320px)]">
              <h2 className="_not-prose _mt-0 _mb-2 _text-xl _font-semibold">
                {postTitle}
              </h2>
              {date && (
                <time
                  className="_text-sm dark:_text-gray-400 _text-gray-600"
                  dateTime={date.toISOString()}
                >
                  {date
                    .toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })
                    .replace(/\//g, '-')}
                </time>
              )}
              {description && (
                <p className="_mt-2 _mb-0 _text-sm dark:_text-gray-400 _text-gray-600">
                  {description}
                </p>
              )}
              {config.readMore && (
                <span className="_block _text-sm _uppercase _font-semibold _text-blue-500">
                  {config.readMore}
                </span>
              )}
            </div>
          </article>
        </Link>
      </div>
    )
  })
  return <>{postList}</>
}
