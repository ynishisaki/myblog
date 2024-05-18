import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import FixedBackgroundImage from "../../components/common/FixedBackgroundImage";
import HeaderAndFooter from "../../components/common/HeaderAndFooter";
import hexDecConverterImage from "/public/public-productions/hex-dec-converter.webp";
import pillmeImage from "/public/public-productions/pillme.webp";
import rainForecastMapImage from "/public/public-productions/rain-forecast-map.webp";

export default function About() {
  const careerHistory = [
    {
      date: "2019.04",
      content: "千葉大学大学院 融合理工学府 地球環境科学専攻 修了",
    },
    {
      date: "2021.04",
      content:
        "地質調査・コンサルティング企業に入社 地質調査、解析、評価を担当",
    },
    {
      date: "2023.01",
      content:
        "SIer企業に入社 防災や社会インフラ分野を対象としたシステム開発を担当",
    },
  ];

  const publicProductions = [
    {
      title: "16 進数-10 進数変換アプリ",
      repositoryUrl: "https://github.com/ynishisaki/Hex-Dec-Converter",
      productionUrl: "https://www.hexdecconverter.com/",
      imageUrl: hexDecConverterImage,
    },
    {
      title: "雨が降りそうかがわかるサイト",
      repositoryUrl: "https://github.com/ynishisaki/rain-forecast-map",
      productionUrl: "https://rain-forecast-map.vercel.app/",
      imageUrl: rainForecastMapImage,
    },
    {
      title: "ピルミー（低用量ピル服薬管理アプリ）",
      repositoryUrl: "https://github.com/ynishisaki/pill-me",
      productionUrl: "https://github.com/ynishisaki/pill-me",
      imageUrl: pillmeImage,
    },
  ];

  return (
    <>
      <Head>
        <title>Home｜もにょblog</title>
        <meta name="description" content="もにょのテックブログ。" />
        {/* og */}
        <meta property="og:site_name" content="もにょblog" />
        <meta property="og:title" content="Home｜もにょblog" />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://www.monyoblog.com/" />
        {/* <meta property='og:image' content='' /> */}
        <meta property="og:description" content="もにょのテックブログ。" />
        {/* twitter */}
        <meta name="twitter:title" content="もにょblog" />
      </Head>
      <FixedBackgroundImage />
      <HeaderAndFooter>
        <main className="mb-4 mt-[50px] w-full pt-4 md:mt-[70px]">
          <div className="relative mx-auto max-w-[90%] bg-[#FAF7F2] p-8 sm:max-w-[600px] md:max-w-[800px]">
            <div className="mx-auto max-w-[500px]">
              <h1 className="text-3xl font-bold text-slate-900">About</h1>
              <div className="flex flex-col gap-y-8">
                <p className="text-slate-900">
                  地質・測量をバックグラウンドに持つwebエンジニアです。
                </p>

                <section>
                  <h2 className="py-2 text-xl font-bold text-slate-900">
                    経歴
                  </h2>
                  <div className="flex flex-col gap-y-2 text-slate-900">
                    {careerHistory.map((history) => (
                      <div key={history.date} className="flex gap-x-4">
                        <span>{history.date}</span>
                        <span>{history.content}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="py-2 text-xl font-bold text-slate-900">
                    公開制作物
                  </h2>

                  <div className="flex flex-col gap-y-8">
                    {publicProductions.map((production) => (
                      <div key={production.title} className="max-w-[500px]">
                        <h3 className="text-lg text-slate-900">
                          {production.title}
                        </h3>
                        <a
                          href={production.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-x-1 text-sm text-slate-900 hover:underline"
                        >
                          GitHubレポジトリ
                          <FiExternalLink />
                        </a>

                        <Link href={production.productionUrl} passHref>
                          <Image
                            src={production.imageUrl}
                            alt={production.title}
                            style={{
                              objectPosition: "top",
                              objectFit: "cover",
                              border: "8px solid white",
                            }}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </HeaderAndFooter>
    </>
  );
}
