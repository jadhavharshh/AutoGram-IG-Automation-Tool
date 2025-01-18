import { GalleryVerticalEnd } from 'lucide-react';
import { useState, useEffect } from 'react';


const Navbar = () => {
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
<nav className={`fixed top-4 left-0 right-0 mx-auto w-full max-w-7xl z-50 transition-all duration-300 rounded-lg ${
  shadow ? 'bg-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent'
}`}>
      <div className="container box-border !max-w-[1672px] !px-6 md:!px-9">
        <div className="relative flex h-[var(--navbar-height)] w-full items-center justify-between rounded-lg border border-transparent bg-brand-background px-2 py-1.5 transition-[box-shadow_background-color_border-color] duration-300 motion-reduce:transition-none lg:grid lg:grid-cols-[1fr_auto_1fr] lg:rounded-2xl lg:py-[0.4375rem] lg:pr-[0.4375rem]">
          <a
            aria-label="Homepage"
            className="relative flex w-fit items-center  overflow-hidden lg:px-3 gap-3"
            href="/"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground ">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className=" font-semibold text-lg tracking-4 uppercase text-brand-neutrals-700 dark:text-brand-neutrals-200">
              AutoGram.
            </span>
          </a>
          <ul className="col-start-2 gap-5 px-2 font-mono font-semibold uppercase -tracking-2 text-brand-neutrals-700 dark:text-brand-neutrals-200 xl:gap-11 hidden lg:flex">
            <li><a className="transition-colors duration-300 hover:text-brand-foreground text-neutral-600 dark:text-neutral-300" href="/pricing">Pricing</a></li>
            <li><a className="transition-colors duration-300 hover:text-brand-foreground text-neutral-600 dark:text-neutral-300" href="/features">Features</a></li>
            <li><a className="transition-colors duration-300 hover:text-brand-foreground text-neutral-600 dark:text-neutral-300" href="/enterprise">Enterprise</a></li>
            <li><a className="transition-colors duration-300 hover:text-brand-foreground text-neutral-600 dark:text-neutral-300" href="/blog">Blog</a></li>
            <li><a className="transition-colors duration-300 hover:text-brand-foreground text-neutral-600 dark:text-neutral-300" href="https://forum.cursor.com" target="_blank" rel="noreferrer">Forum</a></li>
            <li><a className="transition-colors duration-300 hover:text-brand-foreground text-neutral-600 dark:text-neutral-300" href="https://anysphere.inc" target="_blank" rel="noreferrer">Careers</a></li>
          </ul>
          <div className="col-start-3 hidden w-full justify-end gap-2 lg:flex">
            <a
              className="relative inline-flex items-center justify-center whitespace-nowrap rounded-lg uppercase overflow-hidden transition-colors bg-brand-white text-brand-black border border-brand-neutrals-100 dark:border-brand-neutrals-800 hover:!border-brand-gray-400 md:px-4 md:py-3.5 font-mono font-semibold text-sm/[1.125rem] tracking-4"
              href="/dashboard"
            >
              <span className="relative z-10 flex">Go to Dashboard</span>
            </a>
          </div>
          <div className="contents">
            <button
              className="relative size-6 lg:hidden"
              aria-expanded="false"
              aria-controls="mobile-menu"
              aria-label="Menu"
            >
              <svg
                className="-ml-2 -mt-2 size-10"
                viewBox="0 0 100 100"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="5.5"
                fill="none"
                stroke="currentColor"
              >
                <path className="..." d="..." />
              </svg>
            </button>
          </div>
        </div>
      </div>
</nav>
  );
};

export default Navbar;