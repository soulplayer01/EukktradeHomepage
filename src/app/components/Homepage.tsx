import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileText,
  GitBranch,
  Headphones,
  Layers3,
  ListChecks,
  Server,
  Github,
  Terminal,
  TestTube2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const guideItems = [
  { label: "Installation Guide", description: "설치 및 초기 세팅 가이드", href: "#installation-guide", icon: Terminal },
  { label: "Development Guide", description: "개발 구조와 구현 규칙", href: "#development-guide", icon: Code2 },
  { label: "Design Guide", description: "UI 컴포넌트와 디자인 시스템", href: "/design-system", icon: BookOpen },
];

const sectionShortcuts = [
  ["hero", "Hero"],
  ["overview", "Product message"],
  ["status", "Development status"],
  ["guides", "Guides"],
  ["support", "Support"],
  ["final", "Final"],
];

function hexToRgb(hex: string) {
  const normalized = hex.trim().replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => `${char}${char}`).join("")
    : normalized;

  const parsed = Number.parseInt(value, 16);
  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  };
}

function mixRgb(from: ReturnType<typeof hexToRgb>, to: ReturnType<typeof hexToRgb>, progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  const r = Math.round(from.r + (to.r - from.r) * clamped);
  const g = Math.round(from.g + (to.g - from.g) * clamped);
  const b = Math.round(from.b + (to.b - from.b) * clamped);
  return `rgb(${r}, ${g}, ${b})`;
}

const statusItems = [
  {
    title: "Homepage Portal",
    state: "In progress",
    detail: "Project introduction, status sharing, guides, and support entry points are being consolidated.",
    next: "Add real document links and release notes.",
    icon: Layers3,
    value: "72%",
  },
  {
    title: "Backend Planning",
    state: "Planning",
    detail: "Service contracts, project APIs, auth boundaries, and environment strategy are being defined.",
    next: "Confirm API scope and environment variables.",
    icon: Server,
    value: "34%",
  },
  {
    title: "Strategy Engine",
    state: "Research",
    detail: "Ichimoku-based module specifications and testable execution architecture are under review.",
    next: "Document strategy module inputs and outputs.",
    icon: GitBranch,
    value: "18%",
  },
  {
    title: "Testing",
    state: "Queued",
    detail: "Regression checklist, accessibility pass, and deployment verification flows are prepared for later stages.",
    next: "Create smoke-test checklist.",
    icon: TestTube2,
    value: "12%",
  },
];

const overviewItems = [
  {
    title: "Project Introduction",
    copy: "EUKK TRADE의 목적, 개발 방향, 현재 제공 범위를 한 곳에서 확인합니다.",
  },
  {
    title: "Development Status",
    copy: "진행 중인 영역과 다음 작업을 공유해 프로젝트 상황을 빠르게 파악할 수 있게 합니다.",
  },
  {
    title: "Documentation Hub",
    copy: "설치, 개발, 디자인 관련 문서로 이동하는 공식 진입점을 제공합니다.",
  },
];

const guides = [
  {
    id: "installation-guide",
    title: "Installation Guide",
    label: "Primary Guide",
    copy: "로컬 실행 환경, 의존성 설치, 프로젝트 실행 순서를 정리하는 시작 문서입니다.",
    points: ["Runtime and package setup", "Local development command", "Environment checklist"],
    icon: Terminal,
    href: "#guides",
  },
  {
    id: "development-guide",
    title: "Development Guide",
    label: "Primary Guide",
    copy: "폴더 구조, 작업 규칙, 구현 기준, 검증 절차를 공유하는 개발자용 문서입니다.",
    points: ["Project structure", "Contribution workflow", "Testing and review checklist"],
    icon: Code2,
    href: "#guides",
  },
  {
    id: "design-guide",
    title: "Design Guide",
    label: "Reference Document",
    copy: "메인 콘텐츠가 아닌 하위 레퍼런스로 유지하며, UI 컴포넌트와 버튼 규칙을 확인합니다.",
    points: ["Button variants", "Typography references", "Interaction states"],
    icon: BookOpen,
    href: "/design-system",
    reference: true,
  },
];

const changelog = [
  { date: "2026.06", title: "Project portal structure revised", copy: "Homepage focus shifted from design showcase to official project hub." },
  { date: "2026.06", title: "Development status expanded", copy: "Module cards now include current state, progress, and next-step context." },
  { date: "2026.06", title: "Design guide repositioned", copy: "Design System remains available as a supporting reference document." },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#008A94]">{children}</p>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-foreground">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#254441]/72 md:text-lg">{copy}</p>
    </div>
  );
}

function ProjectLogo({ surface = "light", className = "" }: { surface?: "light" | "dark"; className?: string }) {
  return (
    <img
      src={surface === "dark" ? "/project-logo-white.svg" : "/project-logo-black.svg"}
      alt="EUKK TRADE Project Logo"
      className={className}
    />
  );
}

function GlobalNavigation({ isHeroVisible }: { isHeroVisible: boolean }) {
  const [isGuideMenuOpen, setIsGuideMenuOpen] = useState(false);
  const [isMobileGuideOpen, setIsMobileGuideOpen] = useState(false);
  const guideCloseTimerRef = useRef<number | null>(null);
  const navTextClass = isHeroVisible ? "text-[#F2FFFB]/76 hover:bg-white/8 hover:text-[#F2FFFB]" : "text-[#31403e] hover:bg-slate-900/6 hover:text-[#06201F]";

  const openGuideMenu = () => {
    if (guideCloseTimerRef.current) {
      window.clearTimeout(guideCloseTimerRef.current);
    }
    setIsGuideMenuOpen(true);
  };

  const closeGuideMenu = () => {
    if (guideCloseTimerRef.current) {
      window.clearTimeout(guideCloseTimerRef.current);
    }
    guideCloseTimerRef.current = window.setTimeout(() => {
      setIsGuideMenuOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (guideCloseTimerRef.current) {
        window.clearTimeout(guideCloseTimerRef.current);
      }
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 [transition:all_300ms_ease] ${
        isHeroVisible
          ? "border-b border-transparent bg-transparent"
          : "border-b border-slate-900/10 bg-[#F4F7F6]/82 backdrop-blur-xl supports-[backdrop-filter]:bg-[#F4F7F6]/72"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-5 md:px-8">
        <a href="#hero" className="flex cursor-pointer items-center text-[15px] font-bold tracking-[-0.02em] sm:text-base" aria-label="EUKK TRADE.com Homepage">
          <span className={`[transition:all_300ms_ease] ${isHeroVisible ? "text-[#F2FFFB]" : "text-[#06201F]"}`}>EUKK TRADE</span>
          <span className={`font-medium [transition:all_300ms_ease] ${isHeroVisible ? "text-[#D8FFF6]/62" : "text-[#06201F]/58"}`}>.com</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          <a href="#overview" className={`rounded-md px-3 py-2 text-sm [transition:all_300ms_ease] ${navTextClass}`}>프로젝트 소개</a>
          <a href="#status" className={`rounded-md px-3 py-2 text-sm [transition:all_300ms_ease] ${navTextClass}`}>개발 현황</a>
          <div
            className="relative"
            onMouseEnter={openGuideMenu}
            onMouseLeave={closeGuideMenu}
            onFocus={openGuideMenu}
            onBlur={closeGuideMenu}
          >
            <a
              href="#guides"
              aria-haspopup="true"
              aria-expanded={isGuideMenuOpen}
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm [transition:all_300ms_ease] ${navTextClass}`}
            >
              가이드 <ChevronDown className={`h-3.5 w-3.5 transition ${isGuideMenuOpen ? "rotate-180" : ""}`} />
            </a>
            <div
              className={`absolute right-0 top-[calc(100%+0.7rem)] w-[360px] rounded-xl border border-[#14E3B2]/18 bg-[rgba(5,16,18,0.92)] p-3 text-[#EAFBF8] shadow-[0_28px_90px_rgba(0,0,0,0.34),0_0_0_1px_rgba(30,167,255,0.06)] backdrop-blur-2xl [transition:opacity_300ms_ease,transform_300ms_ease,visibility_300ms_ease] ${
                isGuideMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0"
              }`}
            >
              <div className="border-b border-[#14E3B2]/12 px-3 pb-3 pt-2">
                <p className="text-sm font-semibold tracking-[-0.02em] text-[#EAFBF8]">Guide Center</p>
                <p className="mt-1 text-xs leading-5 text-[#8FBAB5]">Installation, development, and design resources.</p>
              </div>
              <div className="mt-2 space-y-1.5">
                {guideItems.map((item) => {
                  const Icon = item.icon;
                  const itemClass = "group/item flex items-center gap-3 rounded-lg border border-[#14E3B2]/8 px-3 py-3 text-left [transition:all_300ms_ease] hover:border-[#14E3B2]/24 hover:bg-[#14E3B2]/8 hover:shadow-[0_10px_34px_rgba(20,227,178,0.08)]";
                  const content = (
                    <>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#14E3B2]/14 bg-[#14E3B2]/8 text-[#14E3B2]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium tracking-[-0.02em] text-[#EAFBF8]">{item.label}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-[#8FBAB5]">{item.description}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#8FBAB5] transition group-hover/item:translate-x-0.5 group-hover/item:text-[#14E3B2]" aria-hidden="true" />
                    </>
                  );

                  return item.href.startsWith("/") ? (
                    <Link key={item.label} to={item.href} className={itemClass}>
                      {content}
                    </Link>
                  ) : (
                    <a key={item.label} href={item.href} className={itemClass}>
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <a href="#support" className={`rounded-md px-3 py-2 text-sm [transition:all_300ms_ease] ${navTextClass}`}>지원</a>
        </div>
        <div className="relative">
          <button
            type="button"
            aria-expanded={isMobileGuideOpen}
            aria-controls="mobile-guide-menu"
            onClick={() => setIsMobileGuideOpen((open) => !open)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium [transition:all_300ms_ease] sm:px-4 sm:py-2 sm:text-sm lg:hidden ${
              isHeroVisible ? "border-white/16 bg-white/8 text-[#F2FFFB] hover:bg-white/14" : "border-border bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            문서 보기
          </button>
          <a
            href="#guides"
            className={`hidden rounded-md border px-4 py-2 text-sm font-medium [transition:all_300ms_ease] lg:inline-flex ${
              isHeroVisible ? "border-white/16 bg-white/8 text-[#F2FFFB] hover:bg-white/14" : "border-border bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            문서 보기
          </a>
        </div>
      </nav>
      <div
        id="mobile-guide-menu"
        className={`lg:hidden overflow-hidden border-t border-[#14E3B2]/12 bg-[rgba(5,16,18,0.94)] px-4 backdrop-blur-2xl [transition:max-height_300ms_ease,opacity_300ms_ease,padding_300ms_ease] ${
          isMobileGuideOpen ? "max-h-96 py-3 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl space-y-2">
          <div className="px-1 pb-1">
            <p className="text-sm font-semibold tracking-[-0.02em] text-[#EAFBF8]">Guide Center</p>
            <p className="mt-1 text-xs leading-5 text-[#8FBAB5]">Installation, development, and design resources.</p>
          </div>
          {guideItems.map((item) => {
            const Icon = item.icon;
            const itemClass = "flex items-center gap-3 rounded-lg border border-[#14E3B2]/12 bg-[#14E3B2]/6 px-3 py-3 text-left";
            const content = (
              <>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#14E3B2]/14 bg-[#14E3B2]/8 text-[#14E3B2]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-[#EAFBF8]">{item.label}</span>
                  <span className="mt-0.5 block text-xs leading-5 text-[#8FBAB5]">{item.description}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#8FBAB5]" aria-hidden="true" />
              </>
            );

            return item.href.startsWith("/") ? (
              <Link key={item.label} to={item.href} className={itemClass} onClick={() => setIsMobileGuideOpen(false)}>
                {content}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={itemClass} onClick={() => setIsMobileGuideOpen(false)}>
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export function Homepage() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [heroTransitionProgress, setHeroTransitionProgress] = useState(0);
  const [heroTransitionEnabled, setHeroTransitionEnabled] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const currentSectionRef = useRef(0);
  const cooldownRef = useRef(false);
  const wheelBurstRef = useRef({ delta: 0, lastTime: 0 });

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-64px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = mainRef.current;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    if (!container) {
      return;
    }

    const getSections = () =>
      sectionShortcuts
        .map(([id]) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));

    const syncCurrentSection = () => {
      const sections = getSections();
      if (sections.length === 0) {
        return;
      }

      const scrollTop = container.scrollTop;
      const currentIndex = sections.reduce((closestIndex, section, index) => {
        const closestDistance = Math.abs(sections[closestIndex].offsetTop - scrollTop);
        const distance = Math.abs(section.offsetTop - scrollTop);
        return distance < closestDistance ? index : closestIndex;
      }, 0);

      currentSectionRef.current = currentIndex;
    };

    const onWheel = (event: WheelEvent) => {
      if (!desktopQuery.matches || event.ctrlKey || Math.abs(event.deltaY) < 24) {
        return;
      }

      if (cooldownRef.current) {
        return;
      }

      const sections = getSections();
      if (sections.length === 0) {
        return;
      }

      event.preventDefault();
      syncCurrentSection();

      const now = Date.now();
      const absDelta = Math.abs(event.deltaY);
      const direction = event.deltaY > 0 ? 1 : -1;

      if (now - wheelBurstRef.current.lastTime > 180) {
        wheelBurstRef.current.delta = 0;
      }
      wheelBurstRef.current.delta += absDelta;
      wheelBurstRef.current.lastTime = now;

      const step = absDelta > 900 || wheelBurstRef.current.delta > 900 ? 2 : 1;
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentSectionRef.current + direction * step));

      if (nextIndex === currentSectionRef.current) {
        return;
      }

      cooldownRef.current = true;
      currentSectionRef.current = nextIndex;
      sections[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });

      window.setTimeout(() => {
        cooldownRef.current = false;
        wheelBurstRef.current.delta = 0;
        syncCurrentSection();
      }, 450);
    };

    syncCurrentSection();
    container.addEventListener("scroll", syncCurrentSection, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("scroll", syncCurrentSection);
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  useEffect(() => {
    const container = mainRef.current;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    if (!container) {
      return;
    }

    const updateTransition = () => {
      const enabled = desktopQuery.matches;
      setHeroTransitionEnabled(enabled);

      if (!enabled) {
        setHeroTransitionProgress(0);
        container.style.removeProperty("--current-bg");
        return;
      }

      const hero = document.getElementById("hero");
      if (!hero) {
        return;
      }

      const progress = Math.min(1, Math.max(0, container.scrollTop / Math.max(1, hero.offsetHeight)));
      const styles = window.getComputedStyle(container);
      const heroBg = styles.getPropertyValue("--hero-bg");
      const overviewBg = styles.getPropertyValue("--overview-bg");

      if (heroBg && overviewBg) {
        container.style.setProperty("--current-bg", mixRgb(hexToRgb(heroBg), hexToRgb(overviewBg), progress));
      }

      setHeroTransitionProgress(progress);
    };

    updateTransition();
    container.addEventListener("scroll", updateTransition, { passive: true });
    desktopQuery.addEventListener("change", updateTransition);

    return () => {
      container.removeEventListener("scroll", updateTransition);
      desktopQuery.removeEventListener("change", updateTransition);
    };
  }, []);

  const heroMotionStyle = heroTransitionEnabled
    ? {
        opacity: 1 - heroTransitionProgress * 0.25,
        transform: `translateY(${-heroTransitionProgress * 48}px) scale(${1 - heroTransitionProgress * 0.04})`,
      }
    : undefined;

  const overviewMotionStyle = heroTransitionEnabled
    ? {
        opacity: 0.85 + heroTransitionProgress * 0.15,
        transform: `translateY(${(1 - heroTransitionProgress) * 48}px)`,
      }
    : undefined;

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-[#F4F7F6] text-[#06201F] lg:h-[100svh] lg:overflow-y-auto lg:scroll-smooth lg:bg-[var(--current-bg)] [--hero-bg:#020f0f] [--overview-bg:#F4F7F6] [--contrast-bg:#EDF2F1] [--current-bg:var(--hero-bg)] [--background:#F4F7F6] [--foreground:#06201F] [--card:#FFFFFF] [--card-foreground:#06201F] [--popover:#FFFFFF] [--popover-foreground:#06201F] [--primary:#00C8D7] [--primary-foreground:#F2FFFB] [--secondary:#EDF2F1] [--secondary-foreground:#173432] [--muted:#E4EBEA] [--muted-foreground:#607A76] [--accent:#E8EEED] [--accent-foreground:#06201F] [--border:oklch(0.74_0.02_180_/_0.5)] [--ring:oklch(0.64_0.14_190_/_0.42)]"
    >
      <GlobalNavigation isHeroVisible={isHeroVisible} />

      <section id="hero" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[var(--hero-bg)] px-5 pb-8 pt-24 text-[#F2FFFB] sm:pb-10 sm:pt-28 md:px-8 lg:bg-transparent lg:pb-12 lg:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(0,208,180,0.18),transparent_31%),radial-gradient(circle_at_50%_34%,rgba(0,163,255,0.12),transparent_38%)] opacity-90 sm:opacity-100" />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col will-change-transform lg:transition-none" style={heroMotionStyle}>
          <div className="mx-auto flex w-full max-w-3xl flex-1 -translate-y-4 flex-col items-center justify-center py-8 text-center sm:-translate-y-6 sm:py-10 lg:-translate-y-12">
            <img
              src="/app-logo.svg"
              alt="EUKK TRADE App Logo"
              className="h-[72px] w-[72px] object-contain drop-shadow-[0_18px_44px_rgba(0,208,180,0.16)] sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
            />
            <h1 className="mt-7 text-[clamp(2.1rem,8vw,3.5rem)] font-semibold leading-none text-[#F2FFFB] md:mt-9 lg:mt-10">EUKK TRADE</h1>
            <p className="mt-3 font-mono text-xs text-[#8AA5A1] sm:text-sm md:mt-4 md:text-base">ver 1.0.0</p>
            <a
              href="https://github.com/OverDlive/AutoTrading-releases"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#F2FFFB] px-5 text-sm font-medium text-[#06201F] shadow-[0_18px_50px_rgba(20,227,178,0.08)] transition hover:bg-[#F8FFFD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C8D7]/70 sm:h-12 sm:px-6 md:mt-10 md:h-[52px] md:px-7 md:text-base"
            >
              <Github className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
              GitHub에서 다운로드
            </a>
            <p className="mt-4 text-xs leading-6 text-[#8AA5A1] sm:text-sm md:mt-5 md:text-[15px]">현재 Windows와 macOS에서 사용 가능합니다</p>
          </div>
          <div className="mx-auto mt-10 w-full max-w-[22rem] px-1 text-center sm:mt-12 sm:max-w-2xl md:mt-14 md:max-w-3xl lg:mt-8 lg:max-w-5xl">
            <h2 className="bg-gradient-to-r from-[#F4FFFC] via-[#E9FFF8] to-[#14E3B2] bg-clip-text text-[clamp(1.65rem,5vw,2.875rem)] font-extrabold leading-[1.32] text-transparent md:leading-[1.28] lg:leading-[1.25]">
              일목균형표 기반의 자동매매기를 경험해보세요
            </h2>
            <p className="mt-4 whitespace-pre-line text-base font-extrabold leading-[1.35] text-[#8AA5A1]/82 sm:text-lg md:mt-5 md:text-xl lg:text-2xl">
              {"백테스팅부터 자동 매매까지,\n더 쉽고 직관적으로."}
            </p>
            <a
              href="#overview"
              className="mx-auto mt-6 inline-flex flex-col items-center gap-2 text-[11px] font-medium tracking-[-0.01em] text-[#8AA5A1]/70 transition hover:text-[#14E3B2]/85 sm:mt-7 sm:text-xs motion-safe:animate-[scrollHint_2.8s_ease-in-out_infinite]"
            >
              <span>아래로 스크롤</span>
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="overview" className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[var(--overview-bg)] px-5 py-24 md:px-8 lg:bg-transparent lg:py-28">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 will-change-transform lg:grid-cols-[0.95fr_1.05fr]" style={overviewMotionStyle}>
          <div>
            <SectionLabel>01 / Product Message</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground">
              자동매매를 더 쉽고 직관적인 흐름으로.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#254441]/72 md:text-xl">
              시장은 24시간 움직이고, 사람은 쉬어야 합니다. EUKK TRADE는 일목균형표 기반 전략을 백테스팅부터 자동 매매까지 연결하는 프로젝트입니다.
            </p>
          </div>
          <div className="min-h-[320px] rounded-lg border border-slate-900/10 bg-card/75 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.12)] md:min-h-[460px]">
            <div className="flex h-full min-h-[280px] flex-col justify-between rounded-md border border-slate-900/10 bg-gradient-to-br from-white/90 to-[#EDF2F1]/80 p-5 md:min-h-[420px]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#008A94]">future preview area</span>
                <span className="h-2 w-2 rounded-full bg-[#0FAE98]" />
              </div>
              <div className="space-y-3">
                {overviewItems.map((item) => (
                  <div key={item.title} className="rounded-md border border-slate-900/10 bg-white/70 p-4">
                    <CheckCircle2 className="mb-4 h-4 w-4 text-[#008A94]/75" />
                    <h3 className="font-semibold tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#254441]/64">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="status" className="flex min-h-[100svh] w-full items-center border-y border-border bg-[var(--contrast-bg)] px-5 py-24 md:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            eyebrow="02 / Development Status"
            title="개발 현황"
            copy="현재 EUKK TRADE의 개발 진행 상황을 모듈별로 공유합니다. 각 항목은 진행 단계, 진행률, 다음 작업을 함께 제공합니다."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {statusItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-border bg-card p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-[#008A94]/78" />
                    <span className="font-mono text-xs text-[#008A94]">{item.value}</span>
                  </div>
                  <h3 className="mt-10 text-lg font-semibold tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#008A94]">{item.state}</p>
                  <div className="mt-6 h-2 rounded-full bg-slate-900/10">
                    <div className="h-full rounded-full bg-primary" style={{ width: item.value }} />
                  </div>
                  <p className="mt-6 text-sm leading-6 text-[#254441]/68">{item.detail}</p>
                  <div className="mt-6 rounded-md border border-border bg-secondary/50 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#008A94]">Next</p>
                    <p className="mt-2 text-sm leading-5 text-[#254441]/72">{item.next}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="guides" className="flex min-h-[100svh] w-full items-center bg-white px-5 py-24 md:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            eyebrow="03 / Guides"
            title="EUKK TRADE 가이드"
            copy="EUKK TRADE를 이해하고 활용하기 위한 문서 진입점입니다. 설치와 개발 문서를 우선 배치하고, Design Guide는 하위 레퍼런스로 연결합니다."
          />
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_0.8fr]">
            {guides.map((guide) => {
              const Icon = guide.icon;
              const content = (
                <>
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 opacity-70" />
                    <span className={`rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${guide.reference ? "bg-secondary text-secondary-foreground" : "bg-[#0FAE98]/10 text-[#075F57]"}`}>{guide.label}</span>
                  </div>
                  <h3 className="mt-12 text-2xl font-semibold tracking-[-0.04em]">{guide.title}</h3>
                  <p className={`mt-4 text-sm leading-6 ${guide.reference ? "text-[#254441]/68" : "text-muted-foreground"}`}>{guide.copy}</p>
                  <div className="mt-8 space-y-3">
                    {guide.points.map((point) => (
                      <div key={point} className="flex items-center gap-2 text-sm text-[#254441]/68">
                        <ListChecks className="h-4 w-4 text-[#008A94]/70" />
                        {point}
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 inline-flex items-center gap-2 text-sm font-medium">
                    문서 열기 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </>
              );

              return guide.href.startsWith("/") ? (
                <Link
                  id={guide.id}
                  key={guide.title}
                  to={guide.href}
                  className="group rounded-lg border border-border bg-card p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1"
                >
                  {content}
                </Link>
              ) : (
                <a
                  id={guide.id}
                  key={guide.title}
                  href={guide.href}
                  className="group rounded-lg border border-border bg-card p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="support" className="flex min-h-[100svh] w-full items-center border-y border-border bg-[var(--contrast-bg)] px-5 py-24 md:px-8 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionLabel>04 / Support</SectionLabel>
            <h2 className="mt-5 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.04em]">지원 및 문의</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#254441]/72 md:text-lg">
              프로젝트 이용 중 궁금한 점, 버그 제보, 기능 제안, 문서 개선 요청을 한 곳에서 연결합니다.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
              <Headphones className="h-6 w-6 text-[#008A94]/78" />
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em]">문의 안내</h3>
              <p className="mt-4 text-sm leading-6 text-[#254441]/68">프로젝트 이용 중 궁금한 점, 버그 제보, 기능 제안은 윾토피아 채널을 통해 공유해 주세요.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
              <FileText className="h-6 w-6 text-[#008A94]/78" />
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em]">문서 요청</h3>
              <p className="mt-4 text-sm leading-6 text-[#254441]/68">설치, 개발, 디자인 가이드에 추가가 필요한 내용은 프로젝트 문서 개선 항목으로 관리합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="final" className="flex min-h-[100svh] w-full flex-col justify-center bg-white px-5 py-24 md:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            eyebrow="05 / Final"
            title="프로젝트 업데이트와 다음 단계"
            copy="프로젝트 포털, 개발 현황, 가이드 문서 구조의 주요 변경 사항을 간단히 기록합니다."
          />
          <div className="mx-auto max-w-3xl divide-y divide-border rounded-lg border border-border bg-card shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            {changelog.map((item) => (
              <div key={item.title} className="grid gap-4 p-6 md:grid-cols-[120px_1fr]">
                <span className="font-mono text-xs text-[#008A94]">{item.date}</span>
                <div>
                  <h3 className="font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#254441]/68">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
          <footer className="mt-14 border-t border-border pt-8">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
              <div>
                <ProjectLogo surface="light" className="mb-5 h-9 w-auto object-contain opacity-90 md:h-11 lg:h-12" />
                <p className="font-bold tracking-[-0.02em]">EUKK TRADE</p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#254441]/68">Official project portal for overview, development status, guides, and support.</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Project</p>
                <div className="mt-4 space-y-2">
                  <a href="#overview" className="block text-sm text-[#254441]/62">프로젝트 소개</a>
                  <a href="#status" className="block text-sm text-[#254441]/62">개발 현황</a>
                  <a href="#support" className="block text-sm text-[#254441]/62">지원 및 문의</a>
                </div>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Guides</p>
                <div className="mt-4 space-y-2">
                  <a href="#installation-guide" className="block text-sm text-[#254441]/62">Installation Guide</a>
                  <a href="#development-guide" className="block text-sm text-[#254441]/62">Development Guide</a>
                  <Link to="/design-system" className="block text-sm text-[#254441]/62">Design Guide</Link>
                </div>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Status</p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-[#254441]/62">Portal in progress</p>
                  <p className="text-sm text-[#254441]/62">Docs expanding</p>
                  <p className="text-sm text-[#254441]/62">Design Guide linked</p>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[#254441]/58">© 2026 EUKK TRADE. Official project portal.</div>
          </footer>
        </div>
      </section>
    </main>
  );
}
