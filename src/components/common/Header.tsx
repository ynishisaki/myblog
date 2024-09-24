import { NextRouter, useRouter } from "next/router";

export default function Header() {
  const router: NextRouter = useRouter();

  const jumpToHome = () => {
    router.push(`/`);
  };

  return (
    <header className="fixed top-0 z-[100] flex h-[50px] w-screen items-center bg-[#FAF7F2] shadow">
      <nav className="mx-auto flex w-[90%] items-center justify-between sm:w-[600px] md:w-[800px]">
        <button
          className="absolute left-[calc(50%-3em)] font-blogtitle text-lg font-bold text-slate-900 hover:animate-bump"
          onClick={jumpToHome}
        >
          もにょぶろぐ
        </button>
      </nav>
    </header>
  );
}
