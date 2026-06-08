import {
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
import { useEffect, useState } from "react";
import { Link } from "react-router";
import logoImage from "../../imports/image.png";

const guideItems = [
  { label: "Installation Guide", href: "#installation-guide" },
  { label: "Development Guide", href: "#development-guide" },
  { label: "Design Guide", href: "/design-system" },
];

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
  return <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-800/70">{children}</p>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-emerald-950/68 md:text-lg">{copy}</p>
    </div>
  );
}

function GlobalNavigation({ isHeroVisible }: { isHeroVisible: boolean }) {
  const navTextClass = isHeroVisible ? "text-white/76 hover:bg-white/8 hover:text-white" : "text-[#2f5b42] hover:bg-emerald-500/12 hover:text-[#052014]";
  const dropdownClass = isHeroVisible
    ? "border-white/10 bg-[#111113]/95 text-white shadow-[0_24px_90px_rgba(0,0,0,0.34)]"
    : "border-border bg-popover/95 text-popover-foreground shadow-[0_24px_90px_rgba(16,184,90,0.16)]";
  const dropdownItemClass = isHeroVisible ? "text-white/78 hover:bg-white/8 hover:text-white" : "text-popover-foreground hover:bg-accent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 [transition:all_300ms_ease] ${
        isHeroVisible
          ? "border-b border-transparent bg-transparent"
          : "border-b border-emerald-900/10 bg-[#eefcf1]/82 backdrop-blur-xl supports-[backdrop-filter]:bg-[#eefcf1]/72"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/homepage" className="flex items-center gap-3" aria-label="EUKK TRADE Homepage">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-md text-[11px] font-bold tracking-[-0.04em] shadow-[0_8px_30px_rgba(16,184,90,0.2)] [transition:all_300ms_ease] ${
              isHeroVisible ? "border border-white/14 bg-white/10 text-white" : "border border-emerald-700/20 bg-emerald-500/20 text-[#052014]"
            }`}
          >
            ET
          </span>
          <span className={`text-sm font-bold tracking-[-0.02em] [transition:all_300ms_ease] ${isHeroVisible ? "text-white" : "text-[#052014]"}`}>EUKK TRADE</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <a href="#overview" className={`rounded-md px-3 py-2 text-sm [transition:all_300ms_ease] ${navTextClass}`}>프로젝트 소개</a>
          <a href="#status" className={`rounded-md px-3 py-2 text-sm [transition:all_300ms_ease] ${navTextClass}`}>개발 현황</a>
          <div className="group relative">
            <button className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm [transition:all_300ms_ease] ${navTextClass}`}>
              가이드 <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
            </button>
            <div className={`invisible absolute right-0 top-full w-64 translate-y-2 rounded-lg border p-2 opacity-0 backdrop-blur-xl [transition:all_300ms_ease] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${dropdownClass}`}>
              {guideItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link key={item.label} to={item.href} className={`flex items-center justify-between rounded-md px-3 py-3 text-sm [transition:all_300ms_ease] ${dropdownItemClass}`}>
                    {item.label}<ArrowRight className={`h-3.5 w-3.5 ${isHeroVisible ? "text-white/46" : "text-muted-foreground"}`} />
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} className={`flex items-center justify-between rounded-md px-3 py-3 text-sm [transition:all_300ms_ease] ${dropdownItemClass}`}>
                    {item.label}<ArrowRight className={`h-3.5 w-3.5 ${isHeroVisible ? "text-white/46" : "text-muted-foreground"}`} />
                  </a>
                )
              )}
            </div>
          </div>
          <a href="#support" className={`rounded-md px-3 py-2 text-sm [transition:all_300ms_ease] ${navTextClass}`}>지원</a>
        </div>
        <a
          href="#guides"
          className={`rounded-md border px-4 py-2 text-sm font-medium [transition:all_300ms_ease] ${
            isHeroVisible ? "border-white/16 bg-white/8 text-white hover:bg-white/14" : "border-border bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          문서 보기
        </a>
      </nav>
    </header>
  );
}

export function Homepage() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

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

  return (
    <main className="min-h-screen bg-[#eefcf1] text-[#052014] [--background:#eefcf1] [--foreground:#052014] [--card:#fbfff9] [--card-foreground:#052014] [--popover:#fbfff9] [--popover-foreground:#052014] [--primary:#10b85a] [--primary-foreground:#ffffff] [--secondary:#dff8e7] [--secondary-foreground:#07351f] [--muted:#c9f1d7] [--muted-foreground:#2f5b42] [--accent:#b9f6c9] [--accent-foreground:#07351f] [--border:oklch(0.72_0.08_145_/_0.38)] [--ring:oklch(0.68_0.19_148_/_0.42)]">
      <GlobalNavigation isHeroVisible={isHeroVisible} />

      <section id="hero" className="relative min-h-screen overflow-hidden bg-[#08080a] px-5 py-24 text-[#f8f8f9] md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(16,184,90,0.18),transparent_34%),linear-gradient(180deg,#08080a_0%,#0b1110_58%,#08080a_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-3xl -translate-y-8 flex-col items-center justify-center text-center md:-translate-y-12">
          <img
            src={logoImage}
            alt="EUKK TRADE"
            className="h-24 w-24 rounded-lg object-contain shadow-[0_22px_70px_rgba(16,184,90,0.22)] md:h-28 md:w-28"
          />
          <h1 className="mt-10 text-4xl font-semibold leading-none text-[#f8f8f9] md:text-6xl">EUKK TRADE</h1>
          <p className="mt-4 font-mono text-sm text-[#8c8c99] md:text-base">ver 1.0.0</p>
          <a
            href="https://github.com/OverDlive/AutoTrading"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#f8f8f9] px-6 text-sm font-medium text-[#08080a] shadow-[0_18px_50px_rgba(255,255,255,0.08)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 md:h-[52px] md:px-7 md:text-base"
          >
            <Github className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
            GitHub에서 다운로드
          </a>
          <p className="mt-5 text-sm leading-6 text-[#8c8c99] md:text-[15px]">현재 Windows와 macOS에서 사용 가능합니다</p>
        </div>
        <div className="absolute inset-x-0 bottom-8 z-10 mx-auto max-w-5xl px-5 text-center md:bottom-12 md:px-8">
          <h2 className="text-3xl font-extrabold leading-tight text-[#f8f8f9] md:text-5xl">
            일목균형표 기반의 자동매매기를 경험해보세요
          </h2>
          <p className="mt-5 whitespace-pre-line text-lg font-extrabold leading-8 text-[#f8f8f9]/55 md:text-2xl md:leading-9">
            {"백테스팅부터 자동 매매까지,\n더 쉽고 직관적으로."}
          </p>
        </div>
      </section>

      <section id="overview" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHeading
          eyebrow="01 / Project Overview"
          title="자동매매 시스템 EUKK TRADE"
          copy="시장은 24시간 움직이고, 사람은 쉬어야 합니다. EUKK TRADE는 거래 자동화의 가능성을 연구하고 구현하는 프로젝트입니다."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {overviewItems.map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-card p-6 shadow-[0_18px_60px_rgba(16,184,90,0.14)]">
              <CheckCircle2 className="mb-8 h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-950/65">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="status" className="border-y border-border bg-secondary/35 px-5 py-24 md:px-8">
        <SectionHeading
          eyebrow="02 / Development Status"
          title="개발 현황"
          copy="현재 EUKK TRADE의 개발 진행 상황을 모듈별로 공유합니다. 각 항목은 진행 단계, 진행률, 다음 작업을 함께 제공합니다."
        />
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-4">
          {statusItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-emerald-700/75" />
                  <span className="font-mono text-xs text-emerald-800/70">{item.value}</span>
                </div>
                <h3 className="mt-8 text-base font-semibold tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-800/70">{item.state}</p>
                <div className="mt-5 h-2 rounded-full bg-emerald-500/16">
                  <div className="h-full rounded-full bg-primary" style={{ width: item.value }} />
                </div>
                <p className="mt-5 text-sm leading-6 text-emerald-950/65">{item.detail}</p>
                <div className="mt-5 rounded-md border border-border bg-secondary/50 p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-800/70">Next</p>
                  <p className="mt-2 text-sm leading-5 text-emerald-950/68">{item.next}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="guides" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHeading
          eyebrow="03 / Guides"
          title="EUKK TRADE 가이드"
          copy="EUKK TRADE를 이해하고 활용하기 위한 문서 진입점입니다. 설치와 개발 문서를 우선 배치하고, Design Guide는 하위 레퍼런스로 연결합니다."
        />
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.8fr]">
          {guides.map((guide) => {
            const Icon = guide.icon;
            const content = (
              <>
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 opacity-70" />
                  <span className={`rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${guide.reference ? "bg-secondary text-secondary-foreground" : "bg-emerald-500/12 text-emerald-900/70"}`}>{guide.label}</span>
                </div>
                <h3 className="mt-10 text-xl font-semibold tracking-[-0.04em]">{guide.title}</h3>
                <p className={`mt-3 text-sm leading-6 ${guide.reference ? "text-emerald-950/65" : "text-muted-foreground"}`}>{guide.copy}</p>
                <div className="mt-7 space-y-2">
                  {guide.points.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-sm text-emerald-950/65">
                      <ListChecks className="h-4 w-4 text-emerald-700/60" />
                      {point}
                    </div>
                  ))}
                </div>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  문서 열기 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </>
            );

            return guide.href.startsWith("/") ? (
              <Link
                id={guide.id}
                key={guide.title}
                to={guide.href}
                className="group rounded-lg border border-border bg-card p-6 transition hover:-translate-y-1"
              >
                {content}
              </Link>
            ) : (
              <a
                id={guide.id}
                key={guide.title}
                href={guide.href}
                className="group rounded-lg border border-border bg-card p-6 transition hover:-translate-y-1"
              >
                {content}
              </a>
            );
          })}
        </div>
      </section>

      <section id="support" className="border-y border-border bg-secondary/35 px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>04 / Support</SectionLabel>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">지원 및 문의</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <Headphones className="h-5 w-5 text-emerald-700/75" />
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.03em]">문의 안내</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-950/65">프로젝트 이용 중 궁금한 점, 버그 제보, 기능 제안은 윾토피아 채널을 통해 공유해 주세요.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <FileText className="h-5 w-5 text-emerald-700/75" />
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.03em]">문서 요청</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-950/65">설치, 개발, 디자인 가이드에 추가가 필요한 내용은 프로젝트 문서 개선 항목으로 관리합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHeading
          eyebrow="05 / Changelog"
          title="홈페이지 업데이트 로그"
          copy="프로젝트 포털, 개발 현황, 가이드 문서 구조의 주요 변경 사항을 간단히 기록합니다."
        />
        <div className="mx-auto max-w-3xl divide-y divide-border rounded-lg border border-border bg-card">
          {changelog.map((item) => (
            <div key={item.title} className="grid gap-4 p-6 md:grid-cols-[120px_1fr]">
              <span className="font-mono text-xs text-emerald-800/70">{item.date}</span>
              <div>
                <h3 className="font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-950/65">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <p className="font-bold tracking-[-0.02em]">EUKK TRADE</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-950/65">Official project portal for overview, development status, guides, and support.</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Project</p>
            <div className="mt-4 space-y-2">
              <a href="#overview" className="block text-sm text-emerald-950/60">프로젝트 소개</a>
              <a href="#status" className="block text-sm text-emerald-950/60">개발 현황</a>
              <a href="#support" className="block text-sm text-emerald-950/60">지원 및 문의</a>
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Guides</p>
            <div className="mt-4 space-y-2">
              <a href="#installation-guide" className="block text-sm text-emerald-950/60">Installation Guide</a>
              <a href="#development-guide" className="block text-sm text-emerald-950/60">Development Guide</a>
              <Link to="/design-system" className="block text-sm text-emerald-950/60">Design Guide</Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Status</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-emerald-950/60">Portal in progress</p>
              <p className="text-sm text-emerald-950/60">Docs expanding</p>
              <p className="text-sm text-emerald-950/60">Design Guide linked</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-950/55">© 2026 EUKK TRADE. Official project portal.</div>
      </footer>
    </main>
  );
}
