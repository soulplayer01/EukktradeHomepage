import { ArrowRight, BookOpen, CheckCircle2, ChevronDown, Code2, Component, GitBranch, Headphones, Layers3, Server, ShieldCheck, Sparkles, Terminal, TestTube2, Type } from "lucide-react";
import { Link } from "react-router";

const guideItems = ["Installation Guide", "Development Guide", "Design Guide"];
const statuses = [
  { title: "UI Development", state: "In progress", detail: "Design-system aligned homepage, guide surfaces, and component documentation.", icon: Layers3, value: "72%" },
  { title: "Backend Development", state: "Planning", detail: "Service contracts, project APIs, auth boundaries, and environment strategy.", icon: Server, value: "34%" },
  { title: "Strategy Engine", state: "Research", detail: "Module specifications and testable strategy execution architecture.", icon: GitBranch, value: "18%" },
  { title: "Testing", state: "Queued", detail: "Regression checklist, accessibility pass, and deployment verification flows.", icon: TestTube2, value: "12%" },
];

const guides = [
  { title: "Installation Guide", copy: "Environment setup, dependencies, and local project bootstrapping.", icon: Terminal, href: "#" },
  { title: "Development Guide", copy: "Contribution workflow, file structure, naming, and implementation standards.", icon: Code2, href: "#" },
  { title: "Design Guide", copy: "Connects to the existing EUKK TRADE Design System page and component rules.", icon: BookOpen, href: "/design-system", featured: true },
];

const previews = [
  { title: "Buttons", copy: "Primary, secondary, ghost, outline, status, icon, and destructive variants.", icon: Component },
  { title: "Typography", copy: "Inter-based hierarchy with mono labels for technical project metadata.", icon: Type },
  { title: "Components", copy: "Cards, navigation, panels, guide links, and structured documentation blocks.", icon: Layers3 },
  { title: "States", copy: "Hover, active, focus, loading, disabled, selected, and status-specific behavior.", icon: Sparkles },
];

const changelog = [
  { date: "2026.06", title: "Homepage hub structure added", copy: "Project website shell defined using the established design-system tokens." },
  { date: "2026.06", title: "Design guide retained as source of truth", copy: "Button exploration and component standards remain available from the Design Guide card." },
  { date: "2026.05", title: "Navigation model prepared", copy: "Expandable guide navigation structured for future documentation categories." },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-800/70">{children}</p>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">{eyebrow.startsWith("01") ? "자동매매 시스템 EUKK TRADE" : eyebrow.startsWith("02") ? "개발 로드맵" : eyebrow.startsWith("03") ? "EUKK TRADE 가이드" : eyebrow.startsWith("04") ? "개발자 디자인 레퍼런스" : eyebrow.startsWith("06") ? "홈페이지 업데이트 로그" : title}</h2>
      <p className="mt-4 text-base leading-7 text-emerald-950/68 md:text-lg">{eyebrow.startsWith("01") ? "시장은 24시간 움직이고, 사람은 쉬어야 합니다. EUKK TRADE는 거래 자동화의 가능성을 연구하고 구현하는 프로젝트입니다." : eyebrow.startsWith("02") ? "현재 EUKK TRADE의 개발 진행 상황을 확인할 수 있습니다. 구현 완료 기능, 개발 중인 기능, 향후 계획을 제공합니다." : eyebrow.startsWith("03") ? "EUKK TRADE를 이해하고 활용하기 위한 문서를 제공합니다. 설치 방법, 개발 정보, 디자인 가이드를 확인할 수 있습니다." : eyebrow.startsWith("04") ? "디자이너와 개발자가 같은 기준으로 작업할 수 있도록 제작된 가이드입니다. UI 컴포넌트, 스타일 규칙, 인터랙션 패턴을 한 곳에서 확인할 수 있습니다." : copy}</p>
    </div>
  );
}

function GlobalNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-900/10 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/62">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/homepage" className="flex items-center gap-3" aria-label="EUKK TRADE Homepage">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-700/20 bg-emerald-500/20 text-[11px] font-bold tracking-[-0.04em] shadow-[0_8px_30px_rgba(16,184,90,0.2)]">ET</span>
          <span className="text-sm font-bold tracking-[-0.02em]">EUKK TRADE</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <a href="#overview" className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-emerald-500/12 hover:text-foreground">프로젝트 소개</a>
          <a href="#status" className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-emerald-500/12 hover:text-foreground">개발 로드맵</a>
          <div className="group relative">
            <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-emerald-500/12 hover:text-foreground">
              프로젝트 가이드 <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
            </button>
            <div className="invisible absolute right-0 top-full w-64 translate-y-2 rounded-lg border border-border bg-popover/95 p-2 opacity-0 shadow-[0_24px_90px_rgba(16,184,90,0.16)] backdrop-blur-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {guideItems.map((item) => (
                <a key={item} href={item === "Design Guide" ? "/design-system" : "#guides"} className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-popover-foreground hover:bg-accent">
                  {item}<ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <a href="#support" className="rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-accent">Support</a>
      </nav>
    </header>
  );
}

export function Homepage() {
  return (
    <main className="min-h-screen bg-[#eefcf1] text-[#052014] [--background:#eefcf1] [--foreground:#052014] [--card:#fbfff9] [--card-foreground:#052014] [--popover:#fbfff9] [--popover-foreground:#052014] [--primary:#10b85a] [--primary-foreground:#ffffff] [--secondary:#dff8e7] [--secondary-foreground:#07351f] [--muted:#c9f1d7] [--muted-foreground:#2f5b42] [--accent:#b9f6c9] [--accent-foreground:#07351f] [--border:oklch(0.72_0.08_145_/_0.38)] [--ring:oklch(0.68_0.19_148_/_0.42)]">
      <GlobalNavigation />

      <section className="relative flex min-h-[860px] items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(74,222,128,0.38),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(16,185,129,0.28),transparent_32%),linear-gradient(135deg,#f3fff4_0%,#dbfbe4_48%,#f7fff8_100%)]" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/55 to-transparent" />
        <div className="absolute right-[-8rem] top-28 hidden h-[520px] w-[760px] rotate-[-8deg] rounded-[2rem] border border-emerald-900/10 bg-white/45 shadow-[0_24px_90px_rgba(16,184,90,0.16)] backdrop-blur md:block">
          <div className="grid h-full grid-cols-[1.1fr_0.9fr] gap-4 p-6">
            <div className="rounded-xl border border-emerald-900/10 bg-white/55 p-5">
              <div className="mb-5 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-widest text-emerald-800/70">project telemetry</span><span className="h-2 w-2 rounded-full bg-emerald-500" /></div>
              <div className="space-y-3">
                {["w-[86%]", "w-[62%]", "w-[44%]", "w-[72%]", "w-[51%]"].map((width, i) => (
                  <div key={i} className="h-3 rounded-full bg-emerald-500/20">
                    <div className={`h-full rounded-full bg-emerald-500/70 ${width}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-emerald-900/10 bg-white/45 p-5"><div className="font-mono text-[10px] uppercase tracking-widest text-emerald-800/70">guide index</div><div className="mt-6 space-y-3">{guideItems.map((g) => <div key={g} className="rounded-md border border-emerald-900/10 bg-emerald-500/12 px-3 py-3 text-xs">{g}</div>)}</div></div>
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-28 md:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-500/12 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-900/70 backdrop-blur"><ShieldCheck className="h-3.5 w-3.5" /> EUKK TRADE Project Hub</div>
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.065em] md:text-8xl">EUKK TRADE</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-950/70 md:text-xl">일목균형표 기반 주식 자동매매 프로젝트</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#overview" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90">Explore Overview <ArrowRight className="h-4 w-4" /></a>
              <Link to="/design-system" className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-secondary px-5 text-sm font-medium text-secondary-foreground transition hover:bg-accent">Open Design Guide</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="overview" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
        <SectionHeading eyebrow="01 / System Overview" title="A neutral command center for the EUKK TRADE project." copy="This homepage introduces the project, organizes documentation paths, and shows development progress. It is not the trading software interface and does not present financial claims." />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Project Introduction", "Concise positioning for stakeholders and collaborators."],
            ["Documentation Portal", "Installation, development, and design-system guide entry points."],
            ["Status Center", "Clear development snapshots without operational or legal claims."],
          ].map(([title, copy]) => <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-[0_18px_60px_rgba(16,184,90,0.14)]"><CheckCircle2 className="mb-8 h-5 w-5 text-muted-foreground" /><h3 className="text-lg font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-3 text-sm leading-6 text-emerald-950/65">{copy}</p></div>)}
        </div>
      </section>

      <section id="status" className="border-y border-border bg-secondary/35 px-5 py-28 md:px-8">
        <SectionHeading eyebrow="02 / Development Status" title="Card-based delivery visibility." copy="Each module uses the same card language, radius, hairline borders, and restrained status labels from the design guide." />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {statuses.map((item) => <div key={item.title} className="rounded-lg border border-border bg-card p-5"><item.icon className="h-5 w-5 text-emerald-700/75" /><div className="mt-8 flex items-end justify-between"><h3 className="text-base font-semibold tracking-[-0.025em]">{item.title}</h3><span className="font-mono text-xs text-emerald-800/70">{item.value}</span></div><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-800/70">{item.state}</p><p className="mt-5 text-sm leading-6 text-emerald-950/65">{item.detail}</p></div>)}
        </div>
      </section>

      <section id="guides" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
        <SectionHeading eyebrow="03 / Guides" title="Expandable documentation entry points." copy="The guide model is intentionally modular so additional guide categories can be added without redesigning the navigation or card system." />
        <div className="grid gap-4 md:grid-cols-3">
          {guides.map((guide) => <a key={guide.title} href={guide.href} className={`group rounded-lg border p-6 transition hover:-translate-y-1 ${guide.featured ? "border-emerald-600/30 bg-primary text-primary-foreground shadow-[0_24px_90px_rgba(16,184,90,0.16)]" : "border-border bg-card"}`}><guide.icon className="h-5 w-5 opacity-70" /><h3 className="mt-12 text-xl font-semibold tracking-[-0.04em]">{guide.title}</h3><p className={`mt-3 text-sm leading-6 ${guide.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{guide.copy}</p><ArrowRight className="mt-8 h-4 w-4 transition group-hover:translate-x-1" /></a>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <SectionHeading eyebrow="04 / Design System Preview" title="The homepage references the system; it does not replace it." copy="Preview cards point back to the rules already established for buttons, typography, reusable components, and interaction states." />
        <div className="grid gap-4 md:grid-cols-4">{previews.map((p) => <div key={p.title} className="rounded-lg border border-border bg-card p-5"><p.icon className="h-5 w-5 text-emerald-700/75" /><h3 className="mt-10 text-lg font-semibold tracking-[-0.035em]">{p.title}</h3><p className="mt-3 text-sm leading-6 text-emerald-950/65">{p.copy}</p></div>)}</div>
      </section>

      <section id="support" className="border-y border-border bg-secondary/35 px-5 py-24 md:px-8"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr]"><div><SectionLabel>05 / Support</SectionLabel><h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">도움말 및 지원</h2></div><div className="rounded-lg border border-border bg-card p-6"><Headphones className="h-5 w-5 text-emerald-700/75" /><p className="mt-6 text-lg leading-8 text-emerald-950/68">프로젝트 이용 중 궁금한 점이나 문제가 발생한 경우, 윾토피아 채널을 통해 문의해 주세요. 버그 제보, 기능 제안, 사용 중 발생한 이슈 등 다양한 의견을 환영합니다.</p></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-28 md:px-8"><SectionHeading eyebrow="06 / Changelog" title="Recent project updates." copy="A concise record of design-system and project-hub updates for collaborators." /><div className="mx-auto max-w-3xl divide-y divide-border rounded-lg border border-border bg-card">{changelog.map((item) => <div key={item.title} className="grid gap-4 p-6 md:grid-cols-[120px_1fr]"><span className="font-mono text-xs text-emerald-800/70">{item.date}</span><div><h3 className="font-semibold tracking-[-0.02em]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-emerald-950/65">{item.copy}</p></div></div>)}</div></section>

      <footer className="border-t border-border px-5 py-12 md:px-8"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4"><div><p className="font-bold tracking-[-0.02em]">EUKK TRADE</p><p className="mt-3 text-sm leading-6 text-emerald-950/65">Official project hub and documentation portal.</p></div>{[["Project", ["System Overview", "Development Status", "Changelog"]], ["Documentation", ["Installation Guide", "Development Guide", "Design Guide"]], ["Contact", ["Support placeholder", "Project information", "Repository link"]]].map(([title, links]) => <div key={title as string}><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{title as string}</p><div className="mt-4 space-y-2">{(links as string[]).map((l) => <p key={l} className="text-sm text-emerald-950/60">{l}</p>)}</div></div>)}</div><div className="mx-auto mt-10 max-w-7xl border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-950/55">© 2026 EUKK TRADE. Project information placeholder.</div></footer>
    </main>
  );
}
