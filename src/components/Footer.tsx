import Link from 'next/link';

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 z-20 w-full h-auto">
      <footer>
        <div className="bg-initial py-3">
          <div className="container-fluid mx-auto px-5">
            <div className="flex flex-wrap items-center justify-between">
              <div className="relative px-4">
                <div className="font-primary relative z-10 text-left text-gray-700 text-sm xl:text-[1.05rem] font-normal">
                  <p>Copyright © {new Date().getFullYear()} Ishan</p>
                  <p>All Rights Reserved.</p>
                </div>
              </div>
              <div className="footerSocial relative px-2">
                <ul className="relative z-10 text-center leading-tight text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl">
                  <li className="inline-block mx-2">
                    <Link href="mailto:ishanhansakasilva@gmail.com">
                      {/* <Icon name="material-symbols:mail-outline-rounded" /> */}
                    </Link>
                  </li>
                  <li className="inline-block mx-2">
                    <Link href="https://www.linkedin.com/in/ishanhansakasilva">
                      {/* <Icon name="uil:linkedin" /> */}
                    </Link>
                  </li>
                  <li className="inline-block mx-2">
                    <Link href="https://github.com/IshanHansaka">
                      {/* <Icon name="uil:github" /> */}
                    </Link>
                  </li>
                  <li className="inline-block mx-2">
                    <Link href="https://medium.com/@ishanhansakasilva">
                      {/* <Icon name="simple-icons:medium" /> */}
                    </Link>
                  </li>
                  <li className="inline-block mx-2">
                    <Link href="https://stackoverflow.com/users/22502508/ishan-hansaka-silva">
                      {/* <Icon name="mdi:stackoverflow" /> */}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
