import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { COLORS } from "../../styles/colors";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: COLORS.main.medium,
      }}
      className="h-30 relative p-8 shadow-xl shadow-black/10"
    >
      <div className="mx-auto flex  flex-col justify-center gap-4 md:w-[750px]">
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
