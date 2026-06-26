import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  FileText,
  Headphones,
  Github,
  LockKeyhole,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const guideItems = [
  { label: "설치 가이드", href: "/developers#installation-guide" },
  { label: "개발 가이드", href: "/developers#development-guide" },
  { label: "디자인 가이드", href: "/developers#design-guide" },
];

const githubDownloadUrl = "https://github.com/OverDlive/AutoTrading-releases";

const heroBackgroundWords = [
  { text: "EUKK SEUNG SHIN", className: "left-[-8%] top-[15%] text-[clamp(4.5rem,12vw,10rem)] motion-safe:animate-[heroFloat_18s_ease-in-out_infinite]" },
  { text: "BACKTEST", className: "right-[-9%] top-[26%] hidden text-[clamp(4rem,10vw,8.5rem)] motion-safe:animate-[heroFloat_22s_ease-in-out_infinite_reverse] sm:block" },
  { text: "AUTO TRADE", className: "bottom-[20%] left-[4%] hidden text-[clamp(3.5rem,9vw,8rem)] motion-safe:animate-[heroFloat_20s_ease-in-out_infinite] md:block" },
  { text: "STRATEGY", className: "bottom-[8%] right-[2%] hidden text-[clamp(3rem,8vw,7rem)] motion-safe:animate-[heroFloat_24s_ease-in-out_infinite_reverse] lg:block" },
];

const heroCodeFragments = [
  { text: "strategy.signal()", className: "left-[9%] top-[33%] hidden md:block motion-safe:animate-[heroDrift_15s_ease-in-out_infinite]" },
  { text: "backtest.run()", className: "right-[12%] top-[42%] hidden lg:block motion-safe:animate-[heroDrift_18s_ease-in-out_infinite_reverse]" },
  { text: "execute.order()", className: "bottom-[27%] right-[18%] hidden md:block motion-safe:animate-[heroDrift_17s_ease-in-out_infinite]" },
  { text: "cloud.spanA", className: "left-[16%] bottom-[36%] hidden sm:block motion-safe:animate-[heroDrift_19s_ease-in-out_infinite_reverse]" },
  { text: "cloud.spanB", className: "right-[24%] bottom-[18%] hidden lg:block motion-safe:animate-[heroDrift_16s_ease-in-out_infinite]" },
  { text: "status: ready", className: "left-[8%] bottom-[17%] hidden md:block motion-safe:animate-[heroPulse_7s_ease-in-out_infinite]" },
  { text: "market.open()", className: "right-[8%] top-[62%] hidden sm:block motion-safe:animate-[heroPulse_8s_ease-in-out_infinite]" },
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
    title: "시장 데이터 시스템",
    detail: "상세 정보는 추후 공개됩니다.",
  },
  {
    title: "전략 엔진",
    detail: "상세 정보는 추후 공개됩니다.",
  },
  {
    title: "백테스트 시스템",
    detail: "상세 정보는 추후 공개됩니다.",
  },
  {
    title: "자동매매 시스템",
    detail: "상세 정보는 추후 공개됩니다.",
  },
];

const overviewItems = [
  {
    title: "살아남기",
    copy: "이 시대에 필요한 금융 도구를 만듭니다.",
  },
  {
    title: "시간 절약",
    copy: "반복되는 판단과 실행을 자동화합니다.",
  },
  {
    title: "함께 성장",
    copy: "윾승이들과 지식을 나누며 발전합니다.",
  },
];

const guideCards = [
  {
    title: "처음 시작한다면 설치 가이드부터",
    copy: "EUKK TRADE를 실행하기 위한 기본 흐름과 초기 설정 방법을 확인하세요.",
    cta: "설치 가이드 보기",
    href: "/developers#installation-guide",
    primary: true,
  },
  {
    title: "개발 가이드",
    copy: "프로젝트 구조와 개발 규칙은 이곳에서 정리됩니다.",
    cta: "개발 문서 보기",
    href: "/developers#development-guide",
  },
  {
    title: "디자인 가이드",
    copy: "UI 컴포넌트와 인터랙션 기준을 확인할 수 있습니다.",
    cta: "디자인 기준 보기",
    href: "/developers#design-guide",
  },
];

const changelog = [
  {
    date: "2026.06.08 (월)",
    title: "공식 프로젝트 포털 공개",
    copy: "EUKK TRADE 프로젝트 소개, 개발 현황, 가이드 문서, 지원 안내를 포함한 공식 포털을 공개했습니다.",
  },
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
  const navTextClass = isHeroVisible ? "text-[#F2FFFB]/76 hover:bg-white/8 hover:text-[#F2FFFB]" : "text-[#31403e] hover:bg-slate-900/6 hover:text-[#06201F]";
  const githubButtonClass = isHeroVisible
    ? "border-white/24 bg-[#F2FFFB] text-[#06201F] hover:border-white/34 hover:bg-[#F8FFFD]"
    : "border-slate-900/12 bg-[#071416] text-[#F2FFFB] hover:border-slate-900/18 hover:bg-[#102224]";
  const menuPanelClass = isHeroVisible
    ? "border-[#1E3638] bg-[#071416] text-[#F2FFFB] shadow-[0_18px_42px_rgba(0,0,0,0.26)]"
    : "border-[#DDE5E3] bg-white text-[#102624] shadow-[0_18px_42px_rgba(15,38,35,0.12)]";
  const menuTitleClass = isHeroVisible ? "text-[#B7D8D2]" : "text-[#55706B]";
  const menuItemClass = isHeroVisible
    ? "text-[#EEFDF9] hover:bg-white/7 hover:text-white focus-visible:bg-white/7 focus-visible:text-white"
    : "text-[#142C29] hover:bg-[#EEF4F2] hover:text-[#06201F] focus-visible:bg-[#EEF4F2] focus-visible:text-[#06201F]";

  const renderMenuLink = (item: { label: string; href: string }, className: string, onClick?: () => void) => (
    item.href.startsWith("/") ? (
      <Link key={item.label} to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    ) : (
      <a key={item.label} href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    )
  );

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
          <div className="group/guides relative">
            <a
              href="#guides"
              aria-haspopup="true"
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm [transition:all_75ms_ease] ${navTextClass}`}
            >
              가이드 <ChevronDown className="h-3.5 w-3.5" />
            </a>
            <div className="absolute left-1/2 top-full hidden w-max min-w-[220px] max-w-[min(320px,calc(100vw-2rem))] -translate-x-1/2 pt-2 group-hover/guides:block group-focus-within/guides:block">
              <div className={`rounded-xl border px-5 py-5 ${menuPanelClass}`}>
                <p className={`text-xs font-medium ${menuTitleClass}`}>Developers</p>
                <div className="mt-4 space-y-1">
                  {guideItems.map((item) => renderMenuLink(item, `block whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium tracking-[-0.01em] outline-none [transition:color_75ms_ease,background-color_75ms_ease] ${menuItemClass}`))}
                </div>
              </div>
            </div>
          </div>
          <a href="#support" className={`rounded-md px-3 py-2 text-sm [transition:all_300ms_ease] ${navTextClass}`}>지원</a>
        </div>
        <div className="relative">
          <a
            href={githubDownloadUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub에서 다운로드"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border shadow-[0_18px_50px_rgba(20,227,178,0.08)] [transition:background-color_180ms_ease,border-color_180ms_ease,color_180ms_ease] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C8D7]/70 sm:h-10 sm:w-10 ${githubButtonClass}`}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </nav>
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
  const macTrackpadLockUntilRef = useRef(0);

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

    const isMacPlatform = (() => {
      const platform = navigator.platform.toLowerCase();
      const userAgent = navigator.userAgent.toLowerCase();
      return platform.includes("mac") || userAgent.includes("macintosh");
    })();

    const isLikelyTrackpadWheel = (event: WheelEvent) => {
      const absDeltaY = Math.abs(event.deltaY);

      return (
        event.deltaMode === 0 &&
        (absDeltaY % 1 !== 0 || absDeltaY < 30 || Math.abs(event.deltaX) > 0)
      );
    };

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

      const now = Date.now();
      const absDelta = Math.abs(event.deltaY);
      const direction = event.deltaY > 0 ? 1 : -1;
      const isMacTrackpadGesture = isMacPlatform && isLikelyTrackpadWheel(event);

      // macOS trackpad inertial scroll guard
      // Keep the existing snap feel for Windows while ignoring tiny residual wheel
      // deltas that can arrive right after a section transition on macOS trackpads.
      if (isMacTrackpadGesture && now < macTrackpadLockUntilRef.current && absDelta < 30) {
        event.preventDefault();
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

      if (isMacTrackpadGesture) {
        macTrackpadLockUntilRef.current = now + 620;
      }

      window.setTimeout(() => {
        cooldownRef.current = false;
        wheelBurstRef.current.delta = 0;
        if (macTrackpadLockUntilRef.current <= Date.now()) {
          macTrackpadLockUntilRef.current = 0;
        }
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
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="hero-light hero-light-mint" />
          <div className="hero-light hero-light-blue" />
          <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(20,227,178,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,215,0.13)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_72%)]" />
          <div className="absolute left-1/2 top-1/2 h-[58rem] w-[58rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#14E3B2]/8 opacity-70 motion-safe:animate-[heroPulse_9s_ease-in-out_infinite]" />
          <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00C8D7]/10 opacity-70 motion-safe:animate-[heroPulse_11s_ease-in-out_infinite_reverse]" />

          <svg className="absolute inset-x-0 top-[18%] hidden h-[62%] w-full opacity-35 sm:block" viewBox="0 0 1200 620" fill="none" preserveAspectRatio="none">
            <path d="M72 420C226 336 334 378 486 296C654 206 792 226 1128 118" stroke="url(#hero-flow-a)" strokeWidth="1" />
            <path d="M118 174C276 228 368 162 512 236C692 328 820 304 1080 420" stroke="url(#hero-flow-b)" strokeWidth="1" />
            <circle cx="486" cy="296" r="3" fill="#14E3B2" opacity="0.55" />
            <circle cx="792" cy="226" r="2.5" fill="#00C8D7" opacity="0.5" />
            <circle cx="512" cy="236" r="2.5" fill="#14E3B2" opacity="0.45" />
            <defs>
              <linearGradient id="hero-flow-a" x1="72" y1="420" x2="1128" y2="118" gradientUnits="userSpaceOnUse">
                <stop stopColor="#14E3B2" stopOpacity="0" />
                <stop offset="0.5" stopColor="#14E3B2" stopOpacity="0.42" />
                <stop offset="1" stopColor="#00A3FF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hero-flow-b" x1="118" y1="174" x2="1080" y2="420" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00A3FF" stopOpacity="0" />
                <stop offset="0.5" stopColor="#00C8D7" stopOpacity="0.34" />
                <stop offset="1" stopColor="#14E3B2" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {heroBackgroundWords.map((item) => (
            <span
              key={item.text}
              className={`absolute select-none whitespace-nowrap font-mono font-semibold uppercase leading-none tracking-[0.08em] text-[#F2FFFB]/[0.035] ${item.className}`}
            >
              {item.text}
            </span>
          ))}

          {heroCodeFragments.map((item) => (
            <span
              key={item.text}
              className={`absolute rounded-md border border-[#14E3B2]/10 bg-[#061B1B]/55 px-3 py-1.5 font-mono text-[11px] text-[#8AA5A1]/38 shadow-[0_12px_34px_rgba(0,0,0,0.12)] ${item.className}`}
            >
              {item.text}
            </span>
          ))}

          <span className="absolute left-[18%] top-[24%] h-1.5 w-1.5 rounded-full bg-[#14E3B2]/35 motion-safe:animate-[heroPulse_6s_ease-in-out_infinite]" />
          <span className="absolute right-[19%] top-[20%] hidden h-1.5 w-1.5 rounded-full bg-[#00C8D7]/35 motion-safe:animate-[heroPulse_7s_ease-in-out_infinite_reverse] sm:block" />
          <span className="absolute bottom-[24%] left-[31%] hidden h-1 w-1 rounded-full bg-[#F2FFFB]/28 motion-safe:animate-[heroPulse_8s_ease-in-out_infinite] md:block" />
        </div>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col will-change-transform lg:transition-none" style={heroMotionStyle}>
          <div className="mx-auto flex w-full max-w-3xl flex-1 -translate-y-4 flex-col items-center justify-center py-8 text-center sm:-translate-y-6 sm:py-10 lg:-translate-y-12">
            <img
              src="/app-logo.svg"
              alt="EUKK TRADE App Logo"
              className="h-[72px] w-[72px] object-contain drop-shadow-[0_18px_44px_rgba(0,208,180,0.16)] sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
            />
            <h1 className="mt-7 text-[clamp(2.1rem,8vw,3.5rem)] font-semibold leading-none text-[#F2FFFB] md:mt-9 lg:mt-10">EUKK TRADE</h1>
            <p className="mt-3 font-mono text-xs text-[#8AA5A1] sm:text-sm md:mt-4 md:text-base">ver 1.3.1</p>
            <a
              href={githubDownloadUrl}
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
            <h2 className="hero-headline-gradient text-[clamp(1.65rem,5vw,2.875rem)] font-extrabold leading-[1.32] md:leading-[1.28] lg:leading-[1.25]">
              시장은 움직여도, 당신의 시간은 그대로
            </h2>
            <p className="mt-4 whitespace-pre-line text-base font-extrabold leading-[1.35] text-[#8AA5A1]/82 sm:text-lg md:mt-5 md:text-xl lg:text-2xl">
              {"한국·미국 주식을 위한 자동매매를\n하나의 플랫폼에서."}
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
            <h2 className="mt-5 max-w-[42rem] text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[1.12] tracking-[-0.04em] text-foreground [overflow-wrap:normal] [word-break:keep-all]">
              <span className="block">자동매매를 쉽고</span>
              <span className="block">직관적인 흐름으로.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#254441]/72 md:text-xl">
              시장은 24시간 움직이고, 사람은 쉬어야 합니다. EUKK TRADE는 한국·미국 주식을 위한 자동매매 · 백테스트 데스크톱 플랫폼 입니다.
            </p>
          </div>
          <div className="min-h-[320px] rounded-lg border border-slate-900/10 bg-card/75 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.12)] md:min-h-[460px]">
            <div className="flex h-full min-h-[280px] flex-col justify-between rounded-md border border-slate-900/10 bg-gradient-to-br from-white/95 to-[#EDF2F1]/85 p-5 md:min-h-[420px]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#008A94]">project principles</span>
                <span className="h-2 w-2 rounded-full bg-[#0FAE98]" />
              </div>
              <div className="space-y-4">
                {overviewItems.map((item, index) => (
                  <div key={item.title} className="group rounded-md border border-[#008A94]/20 bg-white/90 p-5 shadow-[0_16px_46px_rgba(15,38,35,0.08)] transition hover:border-[#008A94]/34 hover:bg-white">
                    <div className="flex items-center gap-5">
                      <span className="shrink-0 font-mono text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.08em] text-[#008A94]/28">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 border-l border-[#008A94]/20 pl-5">
                        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#06201F]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#254441]/68 [word-break:keep-all]">{item.copy}</p>
                      </div>
                    </div>
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
            copy="EUKK TRADE의 주요 시스템은 현재 개발 및 검증 과정에 있습니다. 상세 기술 문서와 기능 설명은 추후 순차적으로 공개될 예정입니다."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {statusItems.map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#008A94]/18 bg-[#008A94]/8 text-[#007F87]">
                    <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[#008A94]/16 bg-[#008A94]/8 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#007F87]">
                    <LockKeyhole className="h-3 w-3" aria-hidden="true" />
                    공개 예정
                  </span>
                </div>
                <h3 className="mt-10 text-lg font-semibold tracking-[-0.025em] text-[#06201F]">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#254441]/68">{item.detail}</p>
                <div className="mt-8 rounded-md border border-dashed border-[#008A94]/22 bg-[#F7FAF9] px-4 py-3">
                  <p className="text-xs leading-5 text-[#254441]/58">기술 세부 정보는 공개 범위 확정 후 문서로 제공됩니다.</p>
                </div>
              </div>
            ))}
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
          <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
            <Link
              to={guideCards[0].href}
              className="group flex min-h-[360px] flex-col justify-between rounded-lg border border-[#14E3B2]/40 bg-[#061B1B] p-7 text-[#F2FFFB] shadow-[0_24px_80px_rgba(20,227,178,0.18)] transition hover:-translate-y-0.5 hover:border-[#14E3B2]/70 sm:p-9 lg:min-h-[440px]"
            >
              <div>
                <span className="inline-flex rounded-md border border-[#14E3B2]/24 bg-[#14E3B2]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8DFFF0]">
                  Recommended
                </span>
                <h3 className="mt-10 max-w-xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
                  {guideCards[0].title}
                </h3>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#C8E8E2] md:text-lg">
                  {guideCards[0].copy}
                </p>
              </div>
              <span className="mt-12 inline-flex w-fit items-center gap-2 rounded-md bg-[#F2FFFB] px-4 py-3 text-sm font-semibold text-[#06201F] shadow-[0_14px_42px_rgba(20,227,178,0.14)] transition group-hover:bg-white">
                {guideCards[0].cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>

            <div className="grid gap-5">
              {guideCards.slice(1).map((guide) => (
                <Link
                  key={guide.title}
                  to={guide.href}
                  className="group flex min-h-[180px] flex-col justify-between rounded-lg border border-border bg-card p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[#008A94]/35 hover:shadow-[0_22px_74px_rgba(15,38,35,0.12)]"
                >
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#06201F]">{guide.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#254441]/68">{guide.copy}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#007F87]">
                    {guide.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="support" className="flex min-h-[100svh] w-full items-center border-y border-border bg-[var(--contrast-bg)] px-5 py-24 md:px-8 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionLabel>04 / Support</SectionLabel>
            <h2 className="mt-5 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.04em]">지원 및 문의</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#254441]/72 md:text-lg">
              프로젝트 이용 중 궁금한 점이나 오류 제보, 기능 제안은 윾토피아 채널에서 공유해주세요.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
              <Headphones className="h-6 w-6 text-[#008A94]/78" />
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em]">문의 안내</h3>
              <p className="mt-4 text-sm leading-6 text-[#254441]/68">EUKK TRADE 관련 문의, 오류 제보, 기능 제안은 디스코드 윾토피아 채널에서 받습니다.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
              <FileText className="h-6 w-6 text-[#008A94]/78" />
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em]">업데이트 안내</h3>
              <p className="mt-4 text-sm leading-6 text-[#254441]/68">기능 추가, 문서 변경, 배포 관련 안내는 사이트와 윾토피아 채널을 통해 순차적으로 공유됩니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="final" className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#020f0f] px-5 py-24 text-[#F2FFFB] md:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(20,227,178,0.16),transparent_34%),radial-gradient(circle_at_76%_70%,rgba(30,167,255,0.12),transparent_38%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(20,227,178,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,215,0.13)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(circle_at_50%_42%,black,transparent_76%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#14E3B2]">05 / Final</p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-[#F2FFFB]">프로젝트 업데이트와 다음 단계</h2>
            <p className="mt-4 text-base leading-7 text-[#A8C7C1] md:text-lg">프로젝트의 주요 공개 이력과 포털 업데이트 내역을 기록합니다.</p>
          </div>
          <div className="mx-auto max-w-3xl divide-y divide-[#14E3B2]/12 rounded-lg border border-[#14E3B2]/16 bg-[#061B1B]/88 shadow-[0_26px_90px_rgba(0,0,0,0.28),0_0_0_1px_rgba(30,167,255,0.04)]">
            <div className="px-6 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#14E3B2]">UPDATE LOG</p>
            </div>
            {changelog.map((item) => (
              <div key={item.title} className="grid gap-4 p-6 md:grid-cols-[120px_1fr]">
                <span className="font-mono text-xs text-[#14E3B2]">{item.date}</span>
                <div>
                  <h3 className="font-semibold tracking-[-0.02em] text-[#F2FFFB]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#A8C7C1]">{item.copy}</p>
                </div>
              </div>
            ))}
            <div className="grid gap-4 bg-white/[0.035] p-6 opacity-80 md:grid-cols-[120px_1fr]">
              <span className="font-mono text-xs text-[#8AA5A1]">Waiting</span>
              <div>
                <h3 className="font-semibold tracking-[-0.02em] text-[#D8FFF6]/78">다음 업데이트 예정</h3>
                <p className="mt-2 text-sm leading-6 text-[#A8C7C1]/78">새로운 기능, 문서, 개발 현황 공개 시 이 영역에 기록됩니다.</p>
              </div>
            </div>
          </div>
          <footer className="mt-14 border-t border-white/10 pt-8">
            <div className="grid gap-10 md:grid-cols-[1.4fr_0.75fr_0.75fr] lg:gap-16">
              <div>
                <ProjectLogo surface="dark" className="mb-5 h-9 w-auto object-contain opacity-90 md:h-11 lg:h-12" />
                <p className="font-bold tracking-[-0.02em] text-[#F2FFFB]">EUKK TRADE</p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#A8C7C1]">
                  자동매매를 쉽고 직관적인 흐름으로.<br />
                  Community: 윾토피아
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8AA5A1]">Documentation</p>
                <div className="mt-4 space-y-2">
                  <Link to="/developers#installation-guide" className="block text-sm text-[#A8C7C1] transition hover:text-[#F2FFFB]">설치 가이드</Link>
                  <Link to="/developers#development-guide" className="block text-sm text-[#A8C7C1] transition hover:text-[#F2FFFB]">개발 가이드</Link>
                  <Link to="/developers#design-guide" className="block text-sm text-[#A8C7C1] transition hover:text-[#F2FFFB]">디자인 가이드</Link>
                </div>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8AA5A1]">Links</p>
                <div className="mt-4 space-y-2">
                  <a href={githubDownloadUrl} target="_blank" rel="noreferrer" className="block text-sm text-[#A8C7C1] transition hover:text-[#F2FFFB]">GitHub Repository</a>
                  <Link to="/developers" className="block text-sm text-[#A8C7C1] transition hover:text-[#F2FFFB]">Developers</Link>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8AA5A1]">© 2026 EUKK TRADE</div>
            <div className="mt-6 border-t border-white/8 pt-6">
              <div className="max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8AA5A1]">NOTICE</p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#A8C7C1] md:text-[15px]">
                  EUKK TRADE는 개인 연구 및 개발 프로젝트입니다.
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8C7C1] md:text-[15px]">
                  본 사이트 및 문서, 배포 프로그램은 투자 권유, 투자 자문, 금융 상품 판매를 목적으로 하지 않습니다.
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8C7C1] md:text-[15px]">
                  모든 투자 판단과 책임은 이용자 본인에게 있으며, 개발자는 투자 결과에 대해 책임을 지지 않습니다.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
