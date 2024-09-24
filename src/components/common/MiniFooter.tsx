import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative z-10 h-28 bg-[#efece7] p-4">
      <div className="flex max-w-xl flex-col justify-center md:mx-auto">
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
