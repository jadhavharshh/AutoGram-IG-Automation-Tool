
const Footer = () => {
  return (
    <div className="border-t border-neutral-100 dark:border-neutral-800 px-8 pt-20  relative bg-white dark:bg-black">
      <div className=" mx-auto text-sm text-neutral dark:text-neutral-400 flex sm:flex-row flex-col justify-between items-start">
        <div>
          <div className="mr-4 md:flex mb-4">
            <a
              className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20"
              href="/"
            >
              <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm"></div>
              <span className="font-medium text-black dark:text-white">AutoGram</span>
            </a>
          </div>
          <div>Copyright &copy; 2025 AutoGram</div>
          <div className="mt-2 text-left">All rights reserved</div>
        </div>
        <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
          <div className="flex justify-center space-y-4 flex-col mt-4">
            <a
              className="transition-colors hover:text-black text-white dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
              href="/pricing"
            >
              Pricing
            </a>
            <a
              className="transition-colors hover:text-black text-white dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
              href="/blog"
            >
              Blog
            </a>
            <a
              className="transition-colors hover:text-black text-white dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
              href="/contact"
            >
              Contact
            </a>
          </div>
          <div className="flex justify-center space-y-4 flex-col mt-4">
            <a
              className="transition-colors hover:text-black text-white dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
            <a
              className="transition-colors hover:text-black text-white dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
              href="/terms-of-service"
            >
              Terms of Service
            </a>
            <a
              className="transition-colors hover:text-black text-white dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
              href="/refund-policy"
            >
              Refund Policy
            </a>
          </div>
          <div className="flex justify-center space-y-4 flex-col mt-4">
            <a
              className="transition-colors hover:text-black text-white dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
              href="https://x.com/theharshjadhav"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              className="transition-colors hover:text-black text-white dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
              href="https://linkedin.com/in/jadhavharsh"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="transition-colors hover:text-black text-white dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
              href="https://github.com/jadhavharshh"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-3xl md:text-5xl lg:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0 mt-20 pb-10 ">
        AUTOGRAM
      </p>
    </div>
  );
};

export default Footer;
