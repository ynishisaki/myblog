import { NextRouter, useRouter } from "next/router";
import React from "react";
import HoverButton from "./HoverButton";
export default function Header() {
  const router: NextRouter = useRouter();

  const jumpToHome = () => {
    router.push(`/`);
  };
  const jumpToAbout = () => {
    router.push(`/about/`);
  };

  return (
    <div className="fixed top-0 z-[100] flex h-[50px] w-screen items-center bg-[#FAF7F2] md:h-[70px]">
      <div className="mx-auto flex w-[90%] items-center justify-between sm:w-[600px] md:w-[800px]">
        <button
          className="font-blogtitle hover:animate-bump absolute left-[calc(50%-3em)] text-lg font-bold text-slate-900 md:text-2xl"
          onClick={jumpToHome}
        >
          もにょぶろぐ
        </button>
        <div className="ml-auto hidden sm:block">
          <HoverButton
            textContent="About"
            areaLabel={"About button"}
            onClick={jumpToAbout}
          />
        </div>
      </div>
    </div>
  );
}
