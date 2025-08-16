'use client';

import Image from 'next/image';
import { X, Bot } from 'lucide-react';
import ChatModal from './ChatModal';
import { useState } from 'react';

export default function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-20 h-auto w-full">
        <header>
          <div className="container-fluid mx-auto my-0 px-4 sm:px-6 md:px-7 lg:px-8 xl:px-8">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0 relative w-48 h-12 md:w-48 md:h-6 lg:w-60 lg:h-10 xl:w-80 xl:h-24">
                <Image
                  src="/images/name-logo3.webp"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={toggleChat}
                  className="p-3 md:p-4 bg-slate-800 cursor-pointer rounded-full hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center"
                  aria-label="Chat with me"
                >
                  {isChatOpen ? (
                    <X className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <ChatModal isOpen={isChatOpen} />
    </>
  );
}
