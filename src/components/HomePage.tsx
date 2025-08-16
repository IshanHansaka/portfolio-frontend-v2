import React from 'react';
import ViewResumeButton from './ViewResumeButton';
import Image from 'next/image';
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-fixed bg-no-repeat bg-cover bg-center px-6 pt-16 pb-16 md:px-10 md:pt-24 md:pb-24 font-sans">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-5">
        <div className="flex flex-col mt-10 items-center md:items-start text-center md:text-left">
          <h4 className="font-poppins text-slate-800 pl-[3px] text-1xl md:text-3xl">
            Undergraduate at University of Moratuwa
          </h4>
          <h1 className="font-black text-slate-800 text-4xl md:text-7xl">
            Ishan Hansaka
          </h1>
          <div className="w-full md:w-[30rem] text-slate-600 text-base md:text-lg mt-6 md:text-left text-center">
            I&apos;m a self-driven IT undergraduate passionate about software
            engineering, quick to learn new technologies, and eager to take on
            real-world challenges.
          </div>
          <ViewResumeButton />
        </div>
        <div className="relative w-48 md:w-[25rem] h-48 md:h-[25rem]">
          <Image
            src="/images/ishan-dp2.webp"
            alt="Profile Picture"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
