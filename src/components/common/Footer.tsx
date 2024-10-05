import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FcBusinesswoman } from "react-icons/fc";
import { FiExternalLink } from "react-icons/fi";
import { COLORS } from "../../styles/colors";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: COLORS.footer,
      }}
      className="relative p-8 shadow-xl"
    >
      <div className="mx-auto flex w-[90%] flex-col justify-center gap-4 md:w-[750px] lg:w-[1000px]">
        <div>
          <div className="flex items-end">
            <FcBusinesswoman className="text-3xl" />
            <span className="text-md font-bold text-slate-900">もにょ</span>
          </div>
          <div className="mt-2 text-sm text-slate-900">
            海なし岐阜県生まれ。今は東京に住んでいる。<br></br>
            なぜあだ名がもにょなのかというと、「もにょっとしているから」とのこと。
            <br></br>
            主な使用言語はTypeScriptとPython。
          </div>
        </div>

        <div className="border-t border-slate-300" />

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-4">
          <div>
            <Link
              href="/posts/20220215-privacy-policy/"
              className="text-sm text-slate-900 hover:underline"
            >
              プライバシーポリシー/免責事項
            </Link>
          </div>

          <div>
            <a
              href="https://github.com/ynishisaki/myblog.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-1 text-sm text-slate-900 hover:underline"
            >
              <AiFillGithub />
              お問い合わせはGitHubにて
              <FiExternalLink />
            </a>
          </div>
        </div>

        <div className="text-sm text-slate-500">© 2022 もにょ</div>
      </div>
    </footer>
  );
}
