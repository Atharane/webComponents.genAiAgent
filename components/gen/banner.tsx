const fallback = {
  brand: "Brand",
  anchorsString: "Home, About, Services, Contact, FAQs, Careers",
};

const PrimaryBanner = (props: typeof fallback) => {
  const config = {
    ...fallback,
    ...props,
  };

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-blue-600 text-sm py-3 sm:py-0">
      <nav
        className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold text-white"
            href="#"
            aria-label="Brand"
          >
            {config.brand}
          </a>
        </div>
        <div className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
            {config.anchorsString.split(",").map((anchor) => {
              return (
                <a
                  key={anchor}
                  className="text-white/80 hover:text-white font-medium"
                  href="#"
                >
                  {anchor}
                </a>
              );
            })}

            <a
              className="flex items-center gap-x-2 font-medium text-white/80 hover:text-white sm:border-s sm:border-white/30 sm:my-6 sm:ps-6"
              href="#"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Register
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default PrimaryBanner;
