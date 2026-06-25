import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Moon, Sun } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { developerDocs } from "../../content/developers";

const developersThemeStorageKey = "eukk-trade-developers-theme";

function getInitialDevelopersTheme() {
  if (typeof window === "undefined") return true;
  const savedTheme = window.localStorage.getItem(developersThemeStorageKey);
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function ProjectLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/app-logo.svg"
      alt="EUKK TRADE Logo"
      className={className}
    />
  );
}

export function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState(developerDocs[0]?.id ?? "");
  const [isDarkMode, setIsDarkMode] = useState(getInitialDevelopersTheme);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { root: null, rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const element = sectionRefs.current[id] ?? document.getElementById(id);
      if (!element) return;
      window.scrollTo({ top: element.offsetTop - 96, behavior: "smooth" });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem(developersThemeStorageKey)) return;
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((previous) => {
      const next = !previous;
      window.localStorage.setItem(developersThemeStorageKey, next ? "dark" : "light");
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (!element) return;
    window.scrollTo({ top: element.offsetTop - 88, behavior: "smooth" });
  };

  const scrollToTop = () => {
    const element = sectionRefs.current["top"];
    if (element) {
      window.scrollTo({ top: element.offsetTop - 88, behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const registerSection = (id: string) => (element: HTMLElement | null) => {
    sectionRefs.current[id] = element;
  };

  const pageClass = isDarkMode
    ? "bg-[#020f0f] text-[#F2FFFB] [--background:#020f0f] [--foreground:#F2FFFB] [--card:#071416] [--card-foreground:#F2FFFB] [--popover:#071416] [--popover-foreground:#F2FFFB] [--primary:#F4F7F6] [--primary-foreground:#061514] [--secondary:#0B2021] [--secondary-foreground:#D8FFF6] [--muted:#102224] [--muted-foreground:#8AA5A1] [--accent:#123133] [--accent-foreground:#F2FFFB] [--border:rgba(255,255,255,0.1)] [--ring:rgba(0,200,215,0.7)]"
    : "bg-[#F4F7F6] text-[#06201F] [--background:#F4F7F6] [--foreground:#06201F] [--card:#FFFFFF] [--card-foreground:#06201F] [--popover:#FFFFFF] [--popover-foreground:#06201F] [--primary:#111111] [--primary-foreground:#FFFFFF] [--secondary:#EDF2F1] [--secondary-foreground:#173432] [--muted:#E4EBEA] [--muted-foreground:#607A76] [--accent:#E8EEED] [--accent-foreground:#06201F] [--border:oklch(0.74_0.02_180_/_0.5)] [--ring:oklch(0.64_0.14_190_/_0.42)]";

  const headerClass = isDarkMode ? "border-white/8 bg-[#020f0f] text-[#F2FFFB]" : "border-black/8 bg-[#F4F7F6] text-[#06201F]";
  const mutedTextClass = isDarkMode ? "text-[#D8FFF6]/62" : "text-[#06201F]/58";
  const developerClass = isDarkMode ? "border-white/14 text-[#F2FFFB]/84" : "border-black/12 text-[#06201F]/78";
  const controlClass = isDarkMode
    ? "border-white/12 bg-white/6 text-[#F2FFFB] placeholder:text-[#8AA5A1] hover:bg-white/10"
    : "border-black/10 bg-white text-[#06201F] placeholder:text-[#607A76] hover:bg-[#EDF2F1]";
  const githubClass = isDarkMode
    ? "border-white/24 bg-[#F2FFFB] text-[#06201F] hover:bg-[#F8FFFD]"
    : "border-black/12 bg-[#071416] text-[#F2FFFB] hover:bg-[#102224]";

  const sidebarClass = isDarkMode ? "border-white/8 bg-[#020f0f]" : "border-black/8 bg-[#F4F7F6]";
  const mutedClass = isDarkMode ? "text-[#A8C7C1]" : "text-[#254441]/68";
  const accentClass = isDarkMode ? "text-[#14E3B2]" : "text-[#008A94]";
  const dividerClass = isDarkMode ? "border-white/10" : "border-border";
  const activeNavClass = isDarkMode ? "bg-white/10 text-[#F2FFFB]" : "bg-secondary text-[#06201F]";
  const inactiveNavClass = isDarkMode ? "text-[#A8C7C1] hover:bg-white/6 hover:text-[#F2FFFB]" : "text-[#254441]/66 hover:bg-secondary/70 hover:text-[#06201F]";

  const searchItems = developerDocs.map((doc) => ({ id: doc.id, label: doc.title }));

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;
    const match = searchItems.find((item) => item.label.toLowerCase().includes(query) || item.id.toLowerCase().includes(query));
    if (match) scrollToSection(match.id);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${pageClass}`} style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <header className={`sticky top-0 z-50 border-b ${headerClass}`}>
        <nav className="flex h-14 w-full items-center justify-between gap-4 px-4 sm:h-16 sm:px-5 md:px-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2" aria-label="EUKK TRADE 홈페이지로 이동">
              <ProjectLogo className="h-5 w-auto object-contain sm:h-6" />
              <span className={`text-sm font-medium tracking-[-0.02em] sm:text-base ${mutedTextClass}`}>.com</span>
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className={`ml-2 border-l bg-transparent pl-3 text-sm font-medium sm:text-base ${developerClass}`}
            >
              Developers
            </button>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="문서 검색"
                className={`h-9 w-48 rounded-md border py-2 pl-3 pr-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#00C8D7]/70 md:w-64 ${controlClass}`}
              />
            </form>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C8D7]/70 sm:h-10 sm:w-10 ${controlClass}`}
            >
              {isDarkMode ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      <main className="grid w-full lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className={`hidden border-r transition-colors duration-200 lg:block ${sidebarClass}`}>
          <nav className="sticky top-16 px-5 py-8" aria-label="Developer documentation">
            <p className="mb-4 px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Documentation</p>
            <div className="space-y-2">
              {developerDocs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`flex w-full items-start justify-between rounded-xl px-3 py-3 text-left text-sm transition ${activeSection === item.id ? activeNavClass : inactiveNavClass}`}
                >
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        <div className="min-w-0 px-5 py-8 md:px-8 lg:px-10 lg:py-10">
          <div className="mb-8 flex flex-col gap-4 lg:hidden">
            {developerDocs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`rounded-md border px-3 py-2 text-sm transition ${activeSection === item.id ? activeNavClass : inactiveNavClass}`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <section id="top" ref={registerSection("top")} className={`scroll-mt-24 border-b pb-10 ${dividerClass}`}>
            <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${accentClass}`}>EUKK TRADE Developers</p>
            <h1 className="mt-4 text-[clamp(2.5rem,5vw,3rem)] font-semibold tracking-[-0.04em]">Official developer documentation for EUKK TRADE</h1>
            <p className={`mt-5 max-w-3xl text-base leading-7 ${mutedClass}`}>설치, 브로커 설정, 보안, FAQ, 개발자 관련 문서를 한 곳에서 관리합니다.</p>
            <p className={`mt-4 max-w-4xl text-[15px] leading-7 ${mutedClass}`}>Markdown으로 작성된 콘텐츠는 `src/content/developers/` 아래에서 관리됩니다. 새로운 문서가 추가되면 페이지에 자동으로 반영됩니다.</p>
          </section>

          {developerDocs.map((doc) => (
            <section
              key={doc.id}
              id={doc.id}
              ref={registerSection(doc.id)}
              className={`scroll-mt-24 border-b py-10 ${dividerClass}`}
            >
              <div className="mb-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{doc.title}</p>
                <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.2rem)] font-semibold tracking-[-0.03em]">{doc.title}</h2>
                <p className={`mt-3 max-w-3xl text-[15px] leading-7 ${mutedClass}`}>{doc.description}</p>
              </div>
              <div className={isDarkMode ? "prose prose-invert max-w-none" : "prose max-w-none"}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className={`border-t px-5 py-8 md:px-8 ${isDarkMode ? "border-white/8 bg-[#020f0f]" : "border-black/8 bg-[#F4F7F6]"}`}>
        <div className="flex w-full flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <ProjectLogo surface={isDarkMode ? "dark" : "light"} className="h-8 w-auto object-contain opacity-90" />
            <p className="mt-4 font-semibold tracking-[-0.02em]">EUKK TRADE Developers</p>
            <p className={`mt-2 text-sm ${mutedClass}`}>Documentation for installation, broker setup, security, and developer workflows.</p>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/" className={`text-sm font-medium ${accentClass} hover:text-foreground`}>Home</Link>
            <a href="https://github.com/OverDlive/AutoTrading-releases" target="_blank" rel="noreferrer" className={`text-sm font-medium ${accentClass} hover:text-foreground`}>GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
