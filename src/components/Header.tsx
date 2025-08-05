import Image from 'next/image';
import Link from 'next/link';
import LottieAnimation from './LottieAnimation';
import chatIconAnimation from '../assets/chat-icon.json';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 z-20 h-auto w-full">
      <header>
        <div className="container mx-auto px-4 sm:px-6 md:px-7 lg:px-8 xl:px-8">
          <div className="py-3 md:py-4 flex items-center justify-between custom:flex-row">
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/name-logo3.webp"
                alt="logo"
                className="w-48 md:w-48 lg:w-60 xl:w-80"
              />
            </div>
            <div className="relative flex items-center mt-2 sm:mt-0 custom:flex-row-reverse">
              <div className="relative group">
                <Link href="/chat" aria-label="Chat with me">
                  <LottieAnimation
                    animationData={chatIconAnimation}
                    className="w-10 sm:w-10 md:w-12 lg:w-12 xl:w-16"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
