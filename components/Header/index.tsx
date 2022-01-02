import Link from "next/link";
import Image from "next/image";
import ctl from "@netlify/classnames-template-literals";
import { SignInWithGitHub } from "../sIgnIn/GitHub";

export function Header() {
  return (
    <header className="bg-neutral-900 border-b border-neutral-600 h-20">
      <div className="flex items-center max-w-screen-lg h-20 mx-auto">
        <Link href="/">
          <img src="/images/logo.svg" alt="logo" className="text-white" />
        </Link>
        <nav className="flex items-center ml-20 h-20 mx-auto">
          <Link href="#">
            <a
              className="
                inline-block mr-4 leading-[5rem] text-gray-100 font-normal hover:font-semibold transition-[color]
                duration-300 border-b-2 border-transparent hover:border-b-orange-400"
            >
              Home
            </a>
          </Link>
          <Link href="#">
            <a className="inline-block mr-4 leading-[5rem] text-gray-100 font-normal hover:font-semibold transition-[color] duration-300 border-b-2  border-transparent hover:border-b-orange-400 ml-8">
              Posts
            </a>
          </Link>
        </nav>
        <SignInWithGitHub />
      </div>
    </header>
  );
}
