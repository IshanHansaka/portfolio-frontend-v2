import Image from 'next/image';
import Link from 'next/link';
import LottieAnimation from './LottieAnimation';
import chatIconAnimation from '../assets/chat-icon.json';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 z-20 h-auto w-full">
      <header>
        <div className="container-fluid mx-auto my-0 px-4 sm:px-6 md:px-7 lg:px-8 xl:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">

            <div className="flex-shrink-0 relative w-48 h-12 md:w-48 md:h-6 lg:w-60 lg:h-10 xl:w-80 xl:h-24">
              <Image
                src="/name-logo3.webp"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>

            <div className="relative flex items-center mt-2 sm:mt-0 flex-row-reverse md:flex-row-reverse group">
              <Link href="/chat" aria-label="Chat with me">
                <LottieAnimation
                  animationData={chatIconAnimation}
                  className="w-10 sm:w-10 md:w-12 lg:w-12 xl:w-16"
                />
              </Link>
              <div className="absolute right-20 bottom-2 mb-2 px-2 py-1 bg-black text-white whitespace-nowrap text-sm sm:text-base lg:text-lg font-popins rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Curious about me? 🤔 Let&apos;s chat!
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
