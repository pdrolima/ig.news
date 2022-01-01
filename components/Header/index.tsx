import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-neutral-900 border-b border-neutral-600 h-14">
      <div className="flex items-center h-16 mx-auto p-0 px-4">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={110}
            height={31}
            fill="#fff"
          />
        </Link>
        <nav className="mr-4 h-14 flex items-center ml-5 py-4">
          <Link href="#">
            <a className="inline-block mr-4 leading-10 text-gray-100 font-normal hover:font-semibold transition-[hover] duration-100 border-b hover:border-b-orange-400">
              Home
            </a>
          </Link>
          <Link href="#">
            <a className="inline-block mr-4 leading-10 text-gray-100 font-normal hover:font-semibold transition-[hover] duration-100 border-b hover:border-b-orange-400">
              Posts
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
