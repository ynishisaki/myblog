import Link from "next/link";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="mt-32">
      <div>
        <div className="grid grid-cols-1 gap-1 text-xs text-slate-800 sm:grid-cols-2 sm:gap-4">
          <div>
            <div className="text-slate-500">
              © {new Date().getFullYear()} monyo.
            </div>
            <div className="mt-4">
              <Link href="/posts/20220215-privacy-policy/">
                プライバシーポリシー/免責事項
              </Link>
            </div>
          </div>

          <div>
            <div>
              <a
                href="https://github.com/ynishisaki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-1"
              >
                <AiFillGithub className="text-xl" />
                GitHub ↗
              </a>
            </div>
            <div>
              <a
                href="https://x.com/monyo75559702"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-1"
              >
                <AiFillTwitterCircle className="text-xl" />
                Twitter ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
