import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-grape-100/70 bg-cream-50">
      <div className="container-page py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-ink-600">
              아이가 AI와 함께 상상하고 만드는 시간.
            </p>
          </div>

          <nav
            aria-label="푸터 메뉴"
            className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13.5px] font-semibold text-ink-700 sm:grid-cols-4"
          >
            <a className="transition hover:text-grape-700" href="#why">
              About
            </a>
            <a className="transition hover:text-grape-700" href="#beta">
              Beta
            </a>
            <a className="transition hover:text-grape-700" href="#experience">
              Experience
            </a>
            <a className="transition hover:text-grape-700" href="#beta">
              Contact
            </a>
            <a className="transition hover:text-grape-700" href="#">
              Privacy
            </a>
            <a className="transition hover:text-grape-700" href="#">
              Terms
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-grape-100/60 pt-6 text-[12px] text-ink-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} MongleKids · 몽글키즈. All rights reserved.</p>
          <p>Made with 💜 for the next generation of creators.</p>
        </div>
      </div>
    </footer>
  );
}
