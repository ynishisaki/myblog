import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FcBusinesswoman } from "react-icons/fc";
import { FiExternalLink } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative z-[100] bg-[#efece7] p-8">
      <div className="flex max-w-xl flex-col justify-center md:mx-auto">
        <div className="flex items-end">
          <FcBusinesswoman className="text-3xl" />
          <span className="text-md font-bold text-slate-900">もにょ</span>
        </div>
        <div className="my-3 text-sm text-slate-900">
          海なし岐阜県生まれ。今は東京に住んでいる。<br></br>
          なぜあだ名がもにょなのかというと、「もにょっとしているから」とのこと。
          <br></br>
          主な使用言語はTypeScriptとPython。
        </div>

        <div className="my-5 border-t border-slate-300" />

        <ul>
          <li>
            <Link
              href="/posts/20220215-privacy-policy/"
              className="text-sm text-slate-900 hover:underline"
            >
              プライバシーポリシー/免責事項
            </Link>
          </li>

          <li>
            <a
              href="https://github.com/ynishisaki/myblog.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-1 text-sm text-slate-900 hover:underline"
            >
              <AiFillGithub />
              お問い合わせはGitHubにて
              <FiExternalLink />
            </a>
          </li>
        </ul>

        <div className="mx-auto mt-4 text-sm text-slate-700">
          © 2022 もにょ
        </div>
      </div>
    </footer>
  );
}
