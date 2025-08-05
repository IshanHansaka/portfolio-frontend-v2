import { Bot } from 'lucide-react';

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 z-20 w-full h-auto">
      <footer>
        <div className="bg-initial py-3">
          <div className="container-fluid mx-auto px-5">
            <div className="flex flex-wrap items-end justify-between">
              <div className="relative px-4">
                <div className="font-sans font-primary relative z-10 text-left text-gray-800 text-sm xl:text-[1.02rem] font-normal">
                  <p>Copyright © {new Date().getFullYear()} Ishan</p>
                  <p>All Rights Reserved.</p>
                </div>
              </div>
              <div className="relative flex items-center mt-2 sm:mt-0 flex-row-reverse md:flex-row-reverse group">
                <div
                  className="p-3 border-3 cursor-pointer border-gray-800 rounded-full"
                  aria-label="Chat with me"
                >
                  <Bot width={42} height={42} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
