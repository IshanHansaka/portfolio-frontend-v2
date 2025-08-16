import Link from 'next/link';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 z-20 w-full h-auto">
      <footer>
        <div className="bg-initial pb-3">
          <div className="container-fluid mx-auto px-5">
            <div className="flex flex-wrap items-end justify-between">
              <div className="relative px-4">
                <div className="font-sans font-primary relative z-10 text-left text-slate-800 text-sm xl:text-[1.02rem] font-normal">
                  <p>Copyright © {new Date().getFullYear()} Ishan</p>
                  <p>All Rights Reserved.</p>
                </div>
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
        </div>
      </footer>
    </div>
  );
}
