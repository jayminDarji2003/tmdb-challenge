"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-10">
      <nav className="bg-transparent flex items-center justify-around p-3">
        {/* logo */}
        <div className="flex items-center gap-5 font-bold text-2xl">
          <div className="relative w-12 h-12">
            <Image
              src="/logo.svg"
              alt="Next.js Logo"
              fill
              className="object-contain cursor-pointer"
            />
          </div>

          <p className="text-white cursor-pointer">MovieBox</p>
        </div>

        {/* Search box */}
        <div className="border-gray-200 border hover:border-white hover:border-2 rounded-md px-2 py-1">
          <input
            type="text"
            placeholder="What do you want to watch?"
            className="bg-transparent p-1 text-sm w-96 focus:outline-none text-white placeholder:text-white"
          />
          <i className="fa-solid fa-magnifying-glass text-white text-sm"></i>
        </div>

        {/* sign in and menu button*/}
        <div className="flex gap-5 items-center">
          <p className="text-white text-sm font-bold cursor-pointer">Sign in</p>

          <div className="rounded-full bg-[#BF123C] w-10 h-10 flex justify-center items-center cursor-pointer">
            <i className="fa-regular fa-equals text-white text-xl"></i>
          </div>
        </div>
      </nav>
    </header>
  );
}
