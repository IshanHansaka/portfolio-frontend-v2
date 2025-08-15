import Image from 'next/image';
import Link from 'next/link';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 z-20 h-auto w-full">
      <header>
        <div className="container-fluid mx-auto my-0 px-4 sm:px-6 md:px-7 lg:px-8 xl:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-shrink-0 relative w-48 h-12 md:w-48 md:h-6 lg:w-60 lg:h-10 xl:w-80 xl:h-24">
              <Image
                src="/images/name-logo3.webp"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative px-2">
              <ul className="relative space-x-8 z-10 text-center leading-tight text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl">
                <Link href="mailto:ishanhansakasilva@gmail.com">
                  <li className="bg-slate-700 inline-block rounded-full p-3">
                    <Mail stroke="white" width={18} height={18} />
                  </li>
                </Link>
                <Link href="https://www.linkedin.com/in/ishanhansakasilva">
                  <li className="bg-slate-700 inline-block rounded-full p-3">
                    <Linkedin stroke="white" width={18} height={18} />
                  </li>
                </Link>
                <Link href="https://github.com/IshanHansaka">
                  <li className="bg-slate-700 inline-block rounded-full p-3">
                    <Github stroke="white" width={18} height={18} />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
