import { useState, useEffect, useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { ButtonCell, ButtonRow, GridSection } from "./ButtonLabel";
import {
  ArrowRight, Plus, TrendingUp, TrendingDown, X, Target, ShieldAlert,
  BarChart2, ChevronDown, Bell, Settings, Search, Loader2, Check,
  AlertCircle, Star, RefreshCw, ArrowUpRight, Zap, Github, Moon, Sun,
} from "lucide-react";
import { Link } from "react-router";

const NAV_ITEMS = [
  { id: "primary", label: "Primary Buttons", index: "01" },
  { id: "secondary", label: "Secondary Buttons", index: "02" },
  { id: "ghost", label: "Ghost Buttons", index: "03" },
  { id: "icon", label: "Icon Buttons", index: "04" },
  { id: "shape", label: "Border Radius Variants", index: "05" },
  { id: "trading", label: "Trading Action Buttons", index: "06" },
  { id: "states", label: "Button States", index: "07" },
  { id: "variations", label: "Button Variations", index: "08" },
  { id: "premium", label: "Fintech Style Patterns", index: "09" },
  { id: "playground", label: "Customization Area", index: "10" },
];

const githubDownloadUrl = "https://github.com/OverDlive/AutoTrading-releases";
const developersThemeStorageKey = "eukk-trade-developers-theme";

function getInitialDevelopersTheme() {
  if (typeof window === "undefined") return true;

  const savedTheme = window.localStorage.getItem(developersThemeStorageKey);
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const DOC_NAV_ITEMS = [
  { id: "installation-guide", label: "Installation Guide" },
  { id: "development-guide", label: "Development Guide" },
  { id: "design-guide", label: "Design Guide" },
];

const BASIC_BUTTON_SECTIONS = ["primary", "secondary", "ghost", "icon", "shape", "variations", "premium", "playground"];

const SEARCH_ITEMS = [
  ...DOC_NAV_ITEMS,
  { id: "top", label: "EUKK TRADE Developers" },
  { id: "buttons", label: "Buttons" },
  { id: "primary", label: "Basic Buttons" },
  { id: "states", label: "Button States" },
  { id: "trading", label: "Trading Actions" },
  ...NAV_ITEMS,
];

const INSTALLATION_PLACEHOLDERS = [
  "설치 전 확인 사항",
  "다운로드 및 실행",
  "초기 설정",
  "업데이트 및 문제 해결",
];

const DEVELOPMENT_PLACEHOLDERS = [
  "프로젝트 구조",
  "브랜치 및 커밋 규칙",
  "배포 흐름",
  "변경 이력 관리",
];

function ProjectLogo({ surface = "light", className = "" }: { surface?: "light" | "dark"; className?: string }) {
  return (
    <img
      src={surface === "dark" ? "/project-logo-white.svg" : "/project-logo-black.svg"}
      alt="EUKK TRADE Project Logo"
      className={className}
    />
  );
}

function DesignGuideHeader({
  isDarkMode,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onToggleTheme,
  onDevelopersClick,
}: {
  isDarkMode: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onToggleTheme: () => void;
  onDevelopersClick: () => void;
}) {
  const headerClass = isDarkMode
    ? "border-white/8 bg-[#020f0f] text-[#F2FFFB]"
    : "border-black/8 bg-[#F4F7F6] text-[#06201F]";
  const mutedTextClass = isDarkMode ? "text-[#D8FFF6]/62" : "text-[#06201F]/58";
  const developerClass = isDarkMode ? "border-white/14 text-[#F2FFFB]/84" : "border-black/12 text-[#06201F]/78";
  const controlClass = isDarkMode
    ? "border-white/12 bg-white/6 text-[#F2FFFB] placeholder:text-[#8AA5A1] hover:bg-white/10"
    : "border-black/10 bg-white text-[#06201F] placeholder:text-[#607A76] hover:bg-[#EDF2F1]";
  const githubClass = isDarkMode
    ? "border-white/24 bg-[#F2FFFB] text-[#06201F] hover:bg-[#F8FFFD]"
    : "border-black/12 bg-[#071416] text-[#F2FFFB] hover:bg-[#102224]";

  return (
    <header className={`sticky top-0 z-50 border-b ${headerClass}`}>
      <nav className="flex h-14 w-full items-center justify-between gap-4 px-4 sm:h-16 sm:px-5 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2" aria-label="EUKK TRADE 홈페이지로 이동">
            <ProjectLogo surface={isDarkMode ? "dark" : "light"} className="h-5 w-auto object-contain sm:h-6" />
            <span className={`text-sm font-medium tracking-[-0.02em] sm:text-base ${mutedTextClass}`}>.com</span>
          </Link>
          <button
            type="button"
            onClick={onDevelopersClick}
            className={`ml-2 border-l bg-transparent pl-3 text-sm font-medium sm:text-base ${developerClass}`}
          >
            Developers
          </button>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <form onSubmit={onSearchSubmit} className="relative hidden sm:block">
            <Search className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${isDarkMode ? "text-[#8AA5A1]" : "text-[#607A76]"}`} aria-hidden="true" />
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="문서 검색"
              className={`h-9 w-48 rounded-md border py-2 pl-9 pr-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#00C8D7]/70 md:w-64 ${controlClass}`}
            />
          </form>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C8D7]/70 sm:h-10 sm:w-10 ${controlClass}`}
          >
            {isDarkMode ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>
          <a
            href={githubDownloadUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub에서 다운로드"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border shadow-[0_18px_50px_rgba(20,227,178,0.08)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C8D7]/70 sm:h-10 sm:w-10 ${githubClass}`}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}

const base = "inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const sizeMap = {
  lg: { padding: "12px 24px", fontSize: "14px", height: "44px" },
  md: { padding: "8px 16px", fontSize: "13px", height: "36px" },
  sm: { padding: "5px 12px", fontSize: "12px", height: "28px" },
};

function PrimaryBtn({ size = "md", label = "Continue", icon }: { size?: keyof typeof sizeMap; label?: string; icon?: React.ReactNode }) {
  const s = sizeMap[size];
  return <button className={`${base} rounded-md active:scale-[0.98]`} style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em", background: "var(--button-primary-bg)", color: "var(--button-primary-text)", border: "1px solid var(--button-primary-border)" }}>{icon}{label}</button>;
}
function SecondaryBtn({ size = "md", label = "Cancel" }: { size?: keyof typeof sizeMap; label?: string }) {
  const s = sizeMap[size];
  return <button className={`${base} rounded-md active:scale-[0.98]`} style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em", background: "var(--button-secondary-bg)", color: "var(--button-secondary-text)", border: "1px solid var(--button-secondary-border)" }}>{label}</button>;
}
function GhostBtn({ size = "md", label = "View details" }: { size?: keyof typeof sizeMap; label?: string }) {
  const s = sizeMap[size];
  return <button className={`${base} rounded-md active:scale-[0.98]`} style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em", background: "transparent", color: "var(--button-ghost-text)" }}>{label}</button>;
}
function OutlineBtn({ size = "md", label = "View details" }: { size?: keyof typeof sizeMap; label?: string }) {
  const s = sizeMap[size];
  return <button className={`${base} rounded-md active:scale-[0.98]`} style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em", background: "transparent", color: "var(--button-ghost-text)", border: "1px solid var(--button-outline-border)" }}>{label}</button>;
}
function IconBtn({ icon, variant = "secondary", size = "md" }: { icon: React.ReactNode; variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "44px" : size === "md" ? "36px" : "28px";
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: "var(--button-primary-bg)", color: "var(--button-primary-text)", border: "1px solid var(--button-primary-border)" },
    secondary: { background: "var(--button-secondary-bg)", color: "var(--button-secondary-text)", border: "1px solid var(--button-secondary-border)" },
    ghost: { background: "transparent", color: "var(--button-ghost-text)", border: "1px solid transparent" },
  };
  return <button className={`${base} rounded-md`} style={{ width: dim, height: dim, padding: 0, ...styles[variant] }}>{icon}</button>;
}
function RoundIconBtn({ icon, variant = "secondary" }: { icon: React.ReactNode; variant?: "primary" | "secondary" | "ghost" }) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: "var(--button-primary-bg)", color: "var(--button-primary-text)", border: "1px solid var(--button-primary-border)" },
    secondary: { background: "var(--button-secondary-bg)", color: "var(--button-secondary-text)", border: "1px solid var(--button-secondary-border)" },
    ghost: { background: "transparent", color: "var(--button-ghost-text)", border: "1px solid transparent" },
  };
  return <button className={`${base} rounded-full`} style={{ width: "36px", height: "36px", padding: 0, ...styles[variant] }}>{icon}</button>;
}
function TradingBtn({ label, sub, color, hoverColor, icon, size = "md" }: { label: string; sub?: string; color: string; hoverColor: string; icon?: React.ReactNode; size?: "sm" | "md" | "lg" }) {
  const s = sizeMap[size];
  return (
    <button className={`${base} rounded-md text-white active:scale-[0.98]`} style={{ ...s, background: color, fontWeight: 600, letterSpacing: "-0.01em", minWidth: "120px" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = hoverColor)} onMouseLeave={(e) => (e.currentTarget.style.background = color)}>
      {icon}<span className="flex flex-col items-start"><span>{label}</span>{sub && <span style={{ fontSize: "10px", opacity: 0.75, fontWeight: 400 }}>{sub}</span>}</span>
    </button>
  );
}
function PillBtn({ label = "Confirm", size = "md" }: { label?: string; size?: "sm" | "md" | "lg" }) {
  const s = sizeMap[size];
  return <button className={`${base} rounded-full active:scale-[0.98]`} style={{ ...s, fontWeight: 500, background: "var(--button-primary-bg)", color: "var(--button-primary-text)", border: "1px solid var(--button-primary-border)" }}>{label}</button>;
}
function SquareBtn({ label = "Confirm", size = "md" }: { label?: string; size?: "sm" | "md" | "lg" }) {
  const s = sizeMap[size];
  return <button className={`${base} rounded-none active:scale-[0.98]`} style={{ ...s, fontWeight: 500, background: "var(--button-primary-bg)", color: "var(--button-primary-text)", border: "1px solid var(--button-primary-border)" }}>{label}</button>;
}
function SplitBtn() {
  return (
    <div className="inline-flex overflow-hidden rounded-md" style={{ border: "1px solid var(--button-primary-border)" }}>
      <button className="px-4 transition-opacity hover:opacity-90" style={{ height: "36px", fontSize: "13px", fontWeight: 500, background: "var(--button-primary-bg)", color: "var(--button-primary-text)" }}>Buy BTC</button>
      <div className="w-px" style={{ background: "var(--button-primary-border)" }} />
      <button className="px-2 transition-opacity hover:opacity-90" style={{ height: "36px", background: "var(--button-primary-bg)", color: "var(--button-primary-text)" }}><ChevronDown size={14} /></button>
    </div>
  );
}
function ButtonGroupExample() {
  const [act, setAct] = useState(0);
  const items = ["1D", "1W", "1M", "3M", "1Y", "ALL"];
  return (
    <div className="inline-flex rounded-md border border-border overflow-hidden">
      {items.map((item, i) => (
        <button key={item} onClick={() => setAct(i)} className="transition-colors" style={{ height: "32px", padding: "0 12px", fontSize: "12px", fontWeight: 500, fontFamily: "'JetBrains Mono', monospace", background: act === i ? "var(--button-primary-bg)" : "var(--button-secondary-bg)", color: act === i ? "var(--button-primary-text)" : "var(--button-secondary-text)", borderRight: i < items.length - 1 ? "1px solid var(--button-secondary-border)" : "none", cursor: "pointer" }}>
          {item}
        </button>
      ))}
    </div>
  );
}
function TagBtn({ label, active }: { label: string; active?: boolean }) {
  return <button className={`${base} rounded-full transition-colors`} style={{ padding: "4px 12px", fontSize: "12px", fontWeight: 500, height: "26px", background: active ? "var(--button-primary-bg)" : "var(--button-secondary-bg)", color: active ? "var(--button-primary-text)" : "var(--button-secondary-text)", border: active ? "1px solid var(--button-primary-border)" : "1px solid var(--button-secondary-border)" }}>{label}</button>;
}
function StateBtn({ state }: { state: "default" | "hover" | "pressed" | "disabled" | "loading" | "success" | "error" }) {
  const cfg = {
    default: { cls: `${base} rounded-md`, label: "Place Order", icon: null as React.ReactNode, bg: "var(--button-primary-bg)", color: "var(--button-primary-text)", border: "var(--button-primary-border)" },
    hover: { cls: `${base} rounded-md`, label: "Place Order", icon: null as React.ReactNode, bg: "var(--button-primary-hover-bg)", color: "var(--button-primary-text)", border: "var(--button-primary-border)" },
    pressed: { cls: `${base} rounded-md scale-[0.98]`, label: "Place Order", icon: null as React.ReactNode, bg: "var(--button-primary-pressed-bg)", color: "var(--button-primary-text)", border: "var(--button-primary-border)" },
    disabled: { cls: `${base} rounded-md cursor-not-allowed`, label: "Place Order", icon: null as React.ReactNode, bg: "var(--button-disabled-bg)", color: "var(--button-disabled-text)", border: "var(--button-disabled-border)" },
    loading: { cls: `${base} rounded-md cursor-wait`, label: "Processing…", icon: <Loader2 size={14} className="animate-spin" />, bg: "var(--button-primary-bg)", color: "var(--button-primary-text)", border: "var(--button-primary-border)" },
    success: { cls: `${base} rounded-md text-white`, label: "Order Filled", icon: <Check size={14} />, bg: "#1a7a4a" },
    error: { cls: `${base} rounded-md text-white`, label: "Order Failed", icon: <AlertCircle size={14} />, bg: "#c8102e" },
  }[state];
  return <button className={cfg.cls} disabled={state === "disabled"} style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500, letterSpacing: "-0.01em", background: cfg.bg, color: "color" in cfg ? cfg.color : undefined, border: "border" in cfg ? `1px solid ${cfg.border}` : undefined }}>{cfg.icon}{cfg.label}</button>;
}
function WireframeBtn({ label, dashed }: { label: string; dashed?: boolean }) {
  return <button className={`${base} rounded-md`} style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 400, background: "transparent", color: "var(--button-disabled-text)", border: dashed ? "1.5px dashed var(--button-disabled-border)" : "1.5px solid var(--button-outline-border)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.02em" }}>{label}</button>;
}
function EmptyBox({ w = 120, h = 36, label }: { w?: number; h?: number; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div style={{ width: w, height: h, border: "1.5px dashed #c4c4cc", borderRadius: "6px", background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(180,180,200,0.06) 4px, rgba(180,180,200,0.06) 8px)" }} />
      {label && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#aaaabc", letterSpacing: "0.05em" }}>{label}</span>}
    </div>
  );
}
function PremiumBtn({ label, sub, variant }: { label: string; sub?: string; variant: "dark" | "subtle" | "mono" | "ruled" }) {
  const styles: Record<string, React.CSSProperties> = {
    dark: { background: "#0f0f11", color: "#fff", border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" },
    subtle: { background: "#fff", color: "#0f0f11", border: "1px solid #e2e2e6", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
    mono: { background: "transparent", color: "#0f0f11", border: "1.5px solid #0f0f11", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontSize: "11px" },
    ruled: { background: "#fff", color: "#0f0f11", border: "1px solid #e2e2e6", borderBottom: "2px solid #0f0f11" },
  };
  return (
    <button className={`${base} rounded-md active:scale-[0.98]`} style={{ padding: "10px 20px", fontSize: "13px", height: "40px", fontWeight: 500, transition: "all 0.15s", ...styles[variant] }}>
      <span className="flex flex-col items-start"><span>{label}</span>{sub && <span style={{ fontSize: "10px", opacity: 0.6, fontWeight: 400 }}>{sub}</span>}</span>
    </button>
  );
}
function FilledBtn() { return <button className={`${base} rounded-md`} style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500, background: "#0f0f11", color: "#fff" }}>Filled</button>; }
function SoftBtn() { return <button className={`${base} rounded-md`} style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500, background: "rgba(15,15,17,0.08)", color: "#0f0f11" }}>Soft</button>; }
function MinimalBtn() { return <button className={`${base} rounded-md`} style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500, background: "transparent", color: "#0f0f11", textDecoration: "underline", textUnderlineOffset: "2px" }}>Minimal</button>; }
function GlassBtn() {
  return <button className={`${base} rounded-md`} style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.8)", color: "#0f0f11", boxShadow: "0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)" }}>Glassmorphism</button>;
}
function DarkFilledBtn() { return <button className={`${base} rounded-md hover:opacity-90`} style={{ ...sizeMap.md, fontWeight: 500, background: "#F4F7F6", color: "#061514", border: "1px solid rgba(255,255,255,0.2)" }}>Continue</button>; }
function DarkOutlineBtn() { return <button className={`${base} rounded-md hover:bg-white/10`} style={{ ...sizeMap.md, fontWeight: 500, background: "transparent", color: "#F2FFFB", border: "1px solid rgba(242,255,251,0.32)" }}>Cancel</button>; }
function DarkGhostBtn() { return <button className={`${base} rounded-md hover:bg-white/10`} style={{ ...sizeMap.md, fontWeight: 500, background: "transparent", color: "#B8D6D0" }}>Dismiss</button>; }
function DarkSoftBtn() { return <button className={`${base} rounded-md hover:bg-white/15`} style={{ ...sizeMap.md, fontWeight: 500, background: "rgba(242,255,251,0.1)", color: "#F2FFFB", border: "1px solid rgba(242,255,251,0.12)" }}>View Chart</button>; }
function DarkGlassBtn() { return <button className={`${base} rounded-md`} style={{ ...sizeMap.md, fontWeight: 500, background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.14)", color: "#F2FFFB" }}>Place Order</button>; }

function ButtonShowcaseSection({ section }: { section: string }) {
  if (section === "primary") return (
    <section className="mb-20">
      <SectionHeader label="01 — Core" title="Primary Buttons" description="사용자의 주요 행동을 유도하는 핵심 버튼입니다. 각 화면에서 가장 중요한 작업에 사용됩니다." />
      <ButtonRow title="Large — 44px">
        <ButtonCell label="Default"><PrimaryBtn size="lg" label="Place Order" icon={<ArrowRight size={16} />} /></ButtonCell>
        <ButtonCell label="Icon Left"><PrimaryBtn size="lg" label="New Position" icon={<Plus size={16} />} /></ButtonCell>
        <ButtonCell label="Icon Right"><button className={`${base} bg-primary text-primary-foreground rounded-md hover:opacity-90`} style={{ ...sizeMap.lg, fontWeight: 500 }}>View Portfolio <ArrowRight size={16} /></button></ButtonCell>
        <ButtonCell label="No Icon"><PrimaryBtn size="lg" label="Confirm Trade" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Medium — 36px">
        <ButtonCell label="Default"><PrimaryBtn size="md" label="Place Order" /></ButtonCell>
        <ButtonCell label="With Icon"><PrimaryBtn size="md" label="Add Funds" icon={<Plus size={14} />} /></ButtonCell>
        <ButtonCell label="Trailing Icon"><button className={`${base} bg-primary text-primary-foreground rounded-md hover:opacity-90`} style={{ ...sizeMap.md, fontWeight: 500 }}>Continue <ArrowRight size={14} /></button></ButtonCell>
        <ButtonCell label="Short Label"><PrimaryBtn size="md" label="Buy" /></ButtonCell>
        <ButtonCell label="Long Label"><PrimaryBtn size="md" label="Confirm & Execute" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Small — 28px">
        <ButtonCell label="Default"><PrimaryBtn size="sm" label="Confirm" /></ButtonCell>
        <ButtonCell label="With Icon"><PrimaryBtn size="sm" label="Add" icon={<Plus size={12} />} /></ButtonCell>
        <ButtonCell label="Label Only"><PrimaryBtn size="sm" label="Apply" /></ButtonCell>
      </ButtonRow>
    </section>
  );
  if (section === "secondary") return (
    <section className="mb-20">
      <SectionHeader label="02 — Core" title="Secondary Buttons" description="보조적인 작업을 수행하기 위한 버튼입니다. 주요 행동을 지원하며, Primary Button과 함께 사용됩니다." />
      <ButtonRow title="Large — 44px">
        <ButtonCell label="Default"><SecondaryBtn size="lg" label="Cancel Order" /></ButtonCell>
        <ButtonCell label="With Icon"><button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.lg, fontWeight: 500 }}><Settings size={16} /> Settings</button></ButtonCell>
        <ButtonCell label="Icon Right"><button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.lg, fontWeight: 500 }}>Export Data <ArrowRight size={16} /></button></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Medium — 36px">
        <ButtonCell label="Default"><SecondaryBtn size="md" label="Cancel" /></ButtonCell>
        <ButtonCell label="Refresh"><button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}><RefreshCw size={14} /> Refresh</button></ButtonCell>
        <ButtonCell label="Search"><button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}><Search size={14} /> Search</button></ButtonCell>
        <ButtonCell label="Alerts"><button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}><Bell size={14} /> Alerts</button></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Small — 28px">
        <ButtonCell label="Default"><SecondaryBtn size="sm" label="Dismiss" /></ButtonCell>
        <ButtonCell label="Remove"><button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.sm, fontWeight: 500 }}><X size={12} /> Remove</button></ButtonCell>
        <ButtonCell label="Edit"><SecondaryBtn size="sm" label="Edit" /></ButtonCell>
      </ButtonRow>
    </section>
  );
  if (section === "ghost") return (
    <section className="mb-20">
      <SectionHeader label="03 — Core" title="Ghost Buttons" description="도움말, 상세 정보, 로그 확인 등 보조 기능에 사용되는 버튼입니다. 사용자의 거래 흐름을 방해하지 않도록 최소한의 시각적 강조를 제공합니다." />
      <ButtonRow title="Sizes">
        <ButtonCell label="Large"><GhostBtn size="lg" label="View Details" /></ButtonCell>
        <ButtonCell label="Medium"><GhostBtn size="md" label="View Details" /></ButtonCell>
        <ButtonCell label="Small"><GhostBtn size="sm" label="View" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="With Icons">
        <ButtonCell label="Arrow Right"><button className={`${base} bg-transparent text-foreground rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}>Positions <ArrowRight size={14} /></button></ButtonCell>
        <ButtonCell label="External Link"><button className={`${base} bg-transparent text-foreground rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}>Open Chart <ArrowUpRight size={14} /></button></ButtonCell>
        <ButtonCell label="Icon Prefix"><button className={`${base} bg-transparent text-foreground rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}><BarChart2 size={14} /> Analytics</button></ButtonCell>
      </ButtonRow>
    </section>
  );
  if (section === "icon") return (
    <section className="mb-20">
      <SectionHeader label="04 — Core" title="Icon Buttons" description="설정, 새로고침, 즐겨찾기, 알림, 차트 제어 등 반복적으로 사용되는 기능에 적용되는 버튼입니다. 최소한의 공간으로 빠른 접근성을 제공합니다." />
      <GridSection title="Square — Primary / Secondary / Ghost" cols={9}>
        <ButtonCell label="Primary Lg"><IconBtn icon={<Plus size={18} />} variant="primary" size="lg" /></ButtonCell>
        <ButtonCell label="Primary Md"><IconBtn icon={<Plus size={16} />} variant="primary" size="md" /></ButtonCell>
        <ButtonCell label="Primary Sm"><IconBtn icon={<Plus size={13} />} variant="primary" size="sm" /></ButtonCell>
        <ButtonCell label="Secondary Lg"><IconBtn icon={<Search size={18} />} variant="secondary" size="lg" /></ButtonCell>
        <ButtonCell label="Secondary Md"><IconBtn icon={<Search size={16} />} variant="secondary" size="md" /></ButtonCell>
        <ButtonCell label="Secondary Sm"><IconBtn icon={<Search size={13} />} variant="secondary" size="sm" /></ButtonCell>
        <ButtonCell label="Ghost Lg"><IconBtn icon={<Settings size={18} />} variant="ghost" size="lg" /></ButtonCell>
        <ButtonCell label="Ghost Md"><IconBtn icon={<Settings size={16} />} variant="ghost" size="md" /></ButtonCell>
        <ButtonCell label="Ghost Sm"><IconBtn icon={<Settings size={13} />} variant="ghost" size="sm" /></ButtonCell>
      </GridSection>
      <GridSection title="Circular" cols={9}>
        <ButtonCell label="Primary"><RoundIconBtn icon={<Plus size={16} />} variant="primary" /></ButtonCell>
        <ButtonCell label="Secondary"><RoundIconBtn icon={<Search size={16} />} variant="secondary" /></ButtonCell>
        <ButtonCell label="Ghost"><RoundIconBtn icon={<Bell size={16} />} variant="ghost" /></ButtonCell>
        <ButtonCell label="Refresh"><RoundIconBtn icon={<RefreshCw size={16} />} variant="secondary" /></ButtonCell>
        <ButtonCell label="Star"><RoundIconBtn icon={<Star size={16} />} variant="ghost" /></ButtonCell>
        <ButtonCell label="Close"><RoundIconBtn icon={<X size={16} />} variant="ghost" /></ButtonCell>
        <ButtonCell label="Zap"><RoundIconBtn icon={<Zap size={16} />} variant="primary" /></ButtonCell>
        <ButtonCell label="Chart"><RoundIconBtn icon={<BarChart2 size={16} />} variant="secondary" /></ButtonCell>
        <ButtonCell label="Target"><RoundIconBtn icon={<Target size={16} />} variant="ghost" /></ButtonCell>
      </GridSection>
    </section>
  );
  if (section === "shape") return (
    <section className="mb-20">
      <SectionHeader label="05 — Shape" title="Border Radius Variants (추후 수정 예정)" description="컴포넌트의 모서리 반경(Border Radius)을 정의하는 규칙입니다. Radius 값은 브랜드 아이덴티티와 인터페이스의 분위기에 직접적인 영향을 주며, 일관된 시각적 경험을 위해 지정된 값을 준수해야 합니다." />
      <ButtonRow title="Pill (border-radius: 9999px)">
        <ButtonCell label="Large"><PillBtn size="lg" label="Place Order" /></ButtonCell>
        <ButtonCell label="Medium"><PillBtn size="md" label="Place Order" /></ButtonCell>
        <ButtonCell label="Small"><PillBtn size="sm" label="Place Order" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Rounded (border-radius: 6px — default)">
        <ButtonCell label="Large"><PrimaryBtn size="lg" label="Place Order" /></ButtonCell>
        <ButtonCell label="Medium"><PrimaryBtn size="md" label="Place Order" /></ButtonCell>
        <ButtonCell label="Small"><PrimaryBtn size="sm" label="Place Order" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Slight (border-radius: 3px)">
        <ButtonCell label="Large"><button className={`${base} bg-primary text-primary-foreground hover:opacity-90`} style={{ ...sizeMap.lg, fontWeight: 500, borderRadius: "3px" }}>Place Order</button></ButtonCell>
        <ButtonCell label="Medium"><button className={`${base} bg-primary text-primary-foreground hover:opacity-90`} style={{ ...sizeMap.md, fontWeight: 500, borderRadius: "3px" }}>Place Order</button></ButtonCell>
        <ButtonCell label="Small"><button className={`${base} bg-primary text-primary-foreground hover:opacity-90`} style={{ ...sizeMap.sm, fontWeight: 500, borderRadius: "3px" }}>Place Order</button></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Square (border-radius: 0)">
        <ButtonCell label="Large"><SquareBtn size="lg" label="Place Order" /></ButtonCell>
        <ButtonCell label="Medium"><SquareBtn size="md" label="Place Order" /></ButtonCell>
        <ButtonCell label="Small"><SquareBtn size="sm" label="Place Order" /></ButtonCell>
      </ButtonRow>
    </section>
  );
  if (section === "trading") return (
    <section className="mb-20">
      <SectionHeader label="06 — Domain" title="Trading Action Buttons" description="매수, 매도, 주문 취소 등 거래 기능을 수행하기 위한 전용 액션 버튼입니다. 일반 버튼과 구분되는 명확한 시각적 표현을 사용합니다." />
      <ButtonRow title="Primary Trading Actions — Large">
        <ButtonCell label="Buy"><TradingBtn label="Buy" sub="Market Order" color="#16a34a" hoverColor="#15803d" icon={<TrendingUp size={16} />} size="lg" /></ButtonCell>
        <ButtonCell label="Sell"><TradingBtn label="Sell" sub="Market Order" color="#c8102e" hoverColor="#b00d28" icon={<TrendingDown size={16} />} size="lg" /></ButtonCell>
        <ButtonCell label="Close Position"><TradingBtn label="Close Position" sub="All Lots" color="#374151" hoverColor="#1f2937" icon={<X size={16} />} size="lg" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Risk Management — Medium">
        <ButtonCell label="Take Profit"><TradingBtn label="Take Profit" color="#0369a1" hoverColor="#0284c7" icon={<Target size={15} />} size="md" /></ButtonCell>
        <ButtonCell label="Stop Loss"><TradingBtn label="Stop Loss" color="#c8102e" hoverColor="#b00d28" icon={<ShieldAlert size={15} />} size="md" /></ButtonCell>
        <ButtonCell label="Buy Limit"><TradingBtn label="Buy Limit" color="#166534" hoverColor="#14532d" size="md" /></ButtonCell>
        <ButtonCell label="Sell Limit"><TradingBtn label="Sell Limit" color="#9f1239" hoverColor="#881337" size="md" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Outlined Trading Actions — Medium">
        <ButtonCell label="Buy — Outline"><button className={`${base} rounded-md active:scale-[0.98]`} style={{ ...sizeMap.md, fontWeight: 600, background: "#f0fdf4", color: "#16a34a", border: "1.5px solid #16a34a" }}><TrendingUp size={14} /> Buy</button></ButtonCell>
        <ButtonCell label="Sell — Outline"><button className={`${base} rounded-md active:scale-[0.98]`} style={{ ...sizeMap.md, fontWeight: 600, background: "#fff1f2", color: "#c8102e", border: "1.5px solid #c8102e" }}><TrendingDown size={14} /> Sell</button></ButtonCell>
        <ButtonCell label="Close — Outline"><button className={`${base} rounded-md active:scale-[0.98]`} style={{ ...sizeMap.md, fontWeight: 600, background: "#f9fafb", color: "#374151", border: "1.5px solid #374151" }}><X size={14} /> Close</button></ButtonCell>
        <ButtonCell label="Take Profit — Soft"><button className={`${base} rounded-md active:scale-[0.98]`} style={{ ...sizeMap.md, fontWeight: 600, background: "#eff6ff", color: "#0369a1" }}><Target size={14} /> Take Profit</button></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Compound Controls">
        <ButtonCell label="Split Button"><SplitBtn /></ButtonCell>
        <ButtonCell label="Period Selector"><ButtonGroupExample /></ButtonCell>
      </ButtonRow>
    </section>
  );
  if (section === "states") return (
    <section className="mb-20">
      <SectionHeader label="07 — States" title="Button States" description="버튼 컴포넌트의 상태(State)와 사용자 상호작용(Interaction)에 대한 표현 규칙입니다. 각 상태는 사용 가능 여부, 진행 상황 및 결과를 명확하게 전달하여 예측 가능하고 신뢰성 있는 사용자 경험을 제공해야 합니다." />
      <GridSection title="All States" cols={7}>
        <ButtonCell label="Default"><StateBtn state="default" /></ButtonCell>
        <ButtonCell label="Hover"><StateBtn state="hover" /></ButtonCell>
        <ButtonCell label="Pressed"><StateBtn state="pressed" /></ButtonCell>
        <ButtonCell label="Disabled"><StateBtn state="disabled" /></ButtonCell>
        <ButtonCell label="Loading"><StateBtn state="loading" /></ButtonCell>
        <ButtonCell label="Success"><StateBtn state="success" /></ButtonCell>
        <ButtonCell label="Error"><StateBtn state="error" /></ButtonCell>
      </GridSection>
      <ButtonRow title="Disabled Across Variants">
        <ButtonCell label="Primary disabled"><button className={`${base} bg-muted text-muted-foreground rounded-md cursor-not-allowed`} disabled style={{ ...sizeMap.md, fontWeight: 500 }}>Place Order</button></ButtonCell>
        <ButtonCell label="Secondary disabled"><button className={`${base} bg-muted/60 text-muted-foreground border border-border rounded-md cursor-not-allowed`} disabled style={{ ...sizeMap.md, fontWeight: 500 }}>Cancel</button></ButtonCell>
        <ButtonCell label="Ghost disabled"><button className={`${base} bg-transparent text-muted-foreground rounded-md cursor-not-allowed opacity-40`} disabled style={{ ...sizeMap.md, fontWeight: 500 }}>View Details</button></ButtonCell>
        <ButtonCell label="Buy disabled"><button className={`${base} rounded-md cursor-not-allowed`} disabled style={{ ...sizeMap.md, fontWeight: 600, background: "#bbf7d0", color: "#86efac" }}>Buy</button></ButtonCell>
        <ButtonCell label="Sell disabled"><button className={`${base} rounded-md cursor-not-allowed`} disabled style={{ ...sizeMap.md, fontWeight: 600, background: "#fecdd3", color: "#fda4af" }}>Sell</button></ButtonCell>
      </ButtonRow>
    </section>
  );
  if (section === "variations") return (
    <section className="mb-20">
      <SectionHeader label="08 — Style" title="Button Variations" description="다양한 UI 환경에 대응하기 위한 버튼 스타일 변형입니다. Filled, Outline, Soft, Glass, Minimal 등의 스타일을 통해 상황에 맞는 시각적 강조 수준을 제공합니다." />
      <div className="mb-6 rounded-xl p-8" style={{ background: "var(--surface-light)", border: "1px solid rgba(6,21,20,0.12)" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.08em", color: "#607A76" }} className="mb-5 uppercase">On light surface</p>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonCell label="Filled"><FilledBtn /></ButtonCell>
          <ButtonCell label="Outline"><button className={`${base} rounded-md`} style={{ ...sizeMap.md, fontWeight: 500, background: "transparent", color: "#0f0f11", border: "1px solid rgba(15,15,17,0.22)" }}>View details</button></ButtonCell>
          <ButtonCell label="Soft"><SoftBtn /></ButtonCell>
          <ButtonCell label="Ghost"><button className={`${base} rounded-md hover:bg-black/5`} style={{ ...sizeMap.md, fontWeight: 500, background: "transparent", color: "#0f0f11" }}>View details</button></ButtonCell>
          <ButtonCell label="Minimal"><MinimalBtn /></ButtonCell>
          <ButtonCell label="Glassmorphism"><GlassBtn /></ButtonCell>
        </div>
      </div>
      <div className="rounded-xl p-8" style={{ background: "var(--surface-dark)", border: "1px solid rgba(242,255,251,0.12)" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.08em", color: "#8AA5A1" }} className="mb-5 uppercase">On dark surface</p>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonCell label={<span className="text-[#8AA5A1]">White Fill</span>}><DarkFilledBtn /></ButtonCell>
          <ButtonCell label={<span className="text-[#8AA5A1]">Outline</span>}><DarkOutlineBtn /></ButtonCell>
          <ButtonCell label={<span className="text-[#8AA5A1]">Ghost</span>}><DarkGhostBtn /></ButtonCell>
          <ButtonCell label={<span className="text-[#8AA5A1]">Soft White</span>}><DarkSoftBtn /></ButtonCell>
          <ButtonCell label={<span className="text-[#8AA5A1]">Glass Dark</span>}><DarkGlassBtn /></ButtonCell>
        </div>
      </div>
    </section>
  );
  if (section === "premium") return (
    <section className="mb-20">
      <SectionHeader label="09 — Premium" title="Fintech Style Patterns (추후 한국 플랫폼에 맞춰 수정 예정)" description="Bloomberg Terminal, Vercel, Stripe, Linear 등 선도적인 디지털 서비스의 인터페이스 패턴을 참고하여 구성한 프리미엄 버튼 스타일 모음입니다." />
      <ButtonRow title="Premium Styles">
        <ButtonCell label="Dark Elevated"><PremiumBtn label="Execute Trade" variant="dark" /></ButtonCell>
        <ButtonCell label="Subtle Raised"><PremiumBtn label="View Report" variant="subtle" /></ButtonCell>
        <ButtonCell label="Mono Uppercase"><PremiumBtn label="Confirm" variant="mono" /></ButtonCell>
        <ButtonCell label="Bottom-ruled"><PremiumBtn label="Continue" variant="ruled" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Contextual Tag Filters">
        <ButtonCell label="All (active)"><TagBtn label="All Assets" active /></ButtonCell>
        <ButtonCell label="Crypto"><TagBtn label="Crypto" /></ButtonCell>
        <ButtonCell label="Stocks"><TagBtn label="Stocks" /></ButtonCell>
        <ButtonCell label="Forex"><TagBtn label="Forex" /></ButtonCell>
        <ButtonCell label="ETFs"><TagBtn label="ETFs" /></ButtonCell>
        <ButtonCell label="Options"><TagBtn label="Options" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Full-width CTA">
        <div className="w-full max-w-sm">
          <button className={`${base} w-full bg-primary text-primary-foreground rounded-md hover:opacity-90 active:scale-[0.99]`} style={{ height: "48px", fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <TrendingUp size={16} /> Buy BTC — $43,218.50
          </button>
        </div>
      </ButtonRow>
    </section>
  );
  if (section === "playground") return (
    <section className="mb-20">
      <SectionHeader label="10 — Playground" title="Customization Area" description="디자인 검증 및 프로토타이핑을 위한 커스터마이징 영역입니다. 기본 와이어프레임 구조를 바탕으로 색상, Radius, Typography, Shadow 등의 시각적 요소를 자유롭게 변경하며 다양한 UI 스타일을 실험할 수 있습니다." />
      <ButtonRow title="Empty Placeholder Buttons">
        <ButtonCell label="[color, dashed]"><WireframeBtn label="Button Text" dashed /></ButtonCell>
        <ButtonCell label="[outline]"><WireframeBtn label="Button Text" /></ButtonCell>
        <ButtonCell label="[lg]"><WireframeBtn label="Button Text — Large" /></ButtonCell>
        <ButtonCell label="[sm]"><button style={{ height: "28px", padding: "0 12px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", background: "transparent", border: "1.5px dashed #c4c4cc", borderRadius: "4px", color: "#9999aa", cursor: "pointer" }}>Small</button></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Empty Containers by Size">
        <ButtonCell label="44px tall"><EmptyBox w={160} h={44} label="44px height" /></ButtonCell>
        <ButtonCell label="36px tall"><EmptyBox w={140} h={36} label="36px height" /></ButtonCell>
        <ButtonCell label="28px tall"><EmptyBox w={120} h={28} label="28px height" /></ButtonCell>
        <ButtonCell label="Icon 36"><EmptyBox w={36} h={36} label="icon sq" /></ButtonCell>
        <ButtonCell label="Icon 44"><EmptyBox w={44} h={44} label="icon sq" /></ButtonCell>
        <ButtonCell label="Pill"><EmptyBox w={160} h={36} label="pill shape" /></ButtonCell>
        <ButtonCell label="Full Width CTA"><EmptyBox w={320} h={48} label="full width CTA" /></ButtonCell>
      </ButtonRow>
      <ButtonRow title="Radius Scale Wireframes">
        <div className="flex flex-wrap gap-4 items-end">
          {[["0", "Square"], ["3px", "Slight"], ["6px", "Default"], ["8px", "Medium"], ["12px", "Large"], ["9999px", "Pill"]].map(([r, lbl]) => (
            <div key={r} className="flex flex-col items-center gap-1.5">
              <div style={{ width: 90, height: 34, border: "1.5px dashed #c4c4cc", borderRadius: r === "9999px" ? "9999px" : r, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#c4c4cc" }}>{r}</span>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#aaaabc", letterSpacing: "0.04em" }}>{lbl}</span>
            </div>
          ))}
        </div>
      </ButtonRow>
      <ButtonRow title="State Annotation Layer">
        <div className="w-full">
          <div className="rounded-lg p-6" style={{ background: "#fff", border: "1px solid #e2e2e6" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#aaaabc", letterSpacing: "0.06em", marginBottom: "20px" }} className="uppercase">Annotation layer — replace with final design tokens</p>
            <div className="flex flex-wrap items-end gap-5">
              {["Primary CTA", "Secondary", "Destructive", "Success", "Loading", "Disabled"].map((lbl) => (
                <div key={lbl} className="flex flex-col items-center gap-2">
                  <div style={{ width: 130, height: 36, border: "1.5px dashed #c4c4cc", borderRadius: "6px", background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(180,180,200,0.06) 4px, rgba(180,180,200,0.06) 8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#c4c4cc", letterSpacing: "0.04em" }}>{lbl.toUpperCase()}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#c4c4cc", letterSpacing: "0.04em" }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ButtonRow>
    </section>
  );
  return null;
}

export function DesignSystemPage() {
  const [active, setActive] = useState("installation-guide");
  const [isDarkMode, setIsDarkMode] = useState(getInitialDevelopersTheme);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) { setActive(entry.target.id); break; }
        }
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;

      window.setTimeout(() => {
        const el = sectionRefs.current[id] ?? document.getElementById(id);
        if (!el) return;
        window.scrollTo({ top: el.offsetTop - 88, behavior: "smooth" });
      }, 0);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem(developersThemeStorageKey)) return;
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", syncSystemTheme);
    return () => mediaQuery.removeEventListener("change", syncSystemTheme);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 88, behavior: "smooth" });
  };

  const registerSection = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setIsDarkMode((value) => {
      const nextValue = !value;
      window.localStorage.setItem(developersThemeStorageKey, nextValue ? "dark" : "light");
      return nextValue;
    });
  };

  const isSidebarActive = (id: string) => {
    if (id === "design-guide") {
      return active === "design-guide" || NAV_ITEMS.some((item) => item.id === active);
    }

    return active === id;
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return;

    const match = SEARCH_ITEMS.find((item) => (
      item.label.toLowerCase().includes(normalizedQuery) || item.id.toLowerCase().includes(normalizedQuery)
    ));

    if (match) {
      scrollTo(match.id);
    }
  };

  const pageClass = isDarkMode
    ? "bg-[#020f0f] text-[#F2FFFB] [--background:#020f0f] [--foreground:#F2FFFB] [--card:#071416] [--card-foreground:#F2FFFB] [--popover:#071416] [--popover-foreground:#F2FFFB] [--primary:#F4F7F6] [--primary-foreground:#061514] [--secondary:#0B2021] [--secondary-foreground:#D8FFF6] [--muted:#102224] [--muted-foreground:#8AA5A1] [--accent:#123133] [--accent-foreground:#F2FFFB] [--border:rgba(255,255,255,0.1)] [--ring:rgba(0,200,215,0.7)] [--button-primary-bg:#F4F7F6] [--button-primary-hover-bg:#FFFFFF] [--button-primary-pressed-bg:#D8E4E1] [--button-primary-text:#061514] [--button-primary-border:rgba(255,255,255,0.24)] [--button-secondary-bg:#0B2021] [--button-secondary-text:#D8FFF6] [--button-secondary-border:rgba(216,255,246,0.16)] [--button-outline-border:rgba(216,255,246,0.28)] [--button-ghost-text:#D8FFF6] [--button-disabled-bg:#102224] [--button-disabled-text:#66817C] [--button-disabled-border:rgba(216,255,246,0.1)] [--surface-light:#F8FAF9] [--surface-dark:#0F1718]"
    : "bg-[#F4F7F6] text-[#06201F] [--background:#F4F7F6] [--foreground:#06201F] [--card:#FFFFFF] [--card-foreground:#06201F] [--popover:#FFFFFF] [--popover-foreground:#06201F] [--primary:#111111] [--primary-foreground:#FFFFFF] [--secondary:#EDF2F1] [--secondary-foreground:#173432] [--muted:#E4EBEA] [--muted-foreground:#607A76] [--accent:#E8EEED] [--accent-foreground:#06201F] [--border:oklch(0.74_0.02_180_/_0.5)] [--ring:oklch(0.64_0.14_190_/_0.42)] [--button-primary-bg:#111111] [--button-primary-hover-bg:#252525] [--button-primary-pressed-bg:#3A3A3A] [--button-primary-text:#FFFFFF] [--button-primary-border:rgba(0,0,0,0.12)] [--button-secondary-bg:#EDF2F1] [--button-secondary-text:#173432] [--button-secondary-border:rgba(6,21,20,0.12)] [--button-outline-border:rgba(6,21,20,0.22)] [--button-ghost-text:#06201F] [--button-disabled-bg:#E4EBEA] [--button-disabled-text:#80938F] [--button-disabled-border:rgba(6,21,20,0.08)] [--surface-light:#F8FAF9] [--surface-dark:#0F1718]";
  const sidebarClass = isDarkMode ? "border-white/8 bg-[#020f0f]" : "border-black/8 bg-[#F4F7F6]";
  const mutedClass = isDarkMode ? "text-[#A8C7C1]" : "text-[#254441]/68";
  const strongMutedClass = isDarkMode ? "text-[#D8FFF6]/78" : "text-[#254441]/74";
  const eyebrowClass = isDarkMode ? "text-[#14E3B2]" : "text-[#008A94]";
  const dividerClass = isDarkMode ? "border-white/10" : "border-border";
  const navItemClass = (isActive: boolean) => isActive
    ? isDarkMode ? "bg-white/8 text-[#F2FFFB]" : "bg-secondary text-[#06201F]"
    : isDarkMode ? "text-[#A8C7C1] hover:bg-white/6 hover:text-[#F2FFFB]" : "text-[#254441]/66 hover:bg-secondary/70 hover:text-[#06201F]";
  const mobileNavItemClass = (isActive: boolean) => isActive
    ? isDarkMode ? "border-white/14 bg-white/8 text-[#F2FFFB]" : "border-[#111111]/20 bg-white text-[#06201F]"
    : isDarkMode ? "border-white/10 bg-transparent text-[#A8C7C1] hover:bg-white/6 hover:text-[#F2FFFB]" : "border-slate-900/10 bg-transparent text-[#254441]/68 hover:bg-white/70 hover:text-[#06201F]";

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${pageClass}`}
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <DesignGuideHeader
        isDarkMode={isDarkMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onToggleTheme={toggleTheme}
        onDevelopersClick={scrollToTop}
      />

      <main className="grid w-full lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className={`hidden border-r transition-colors duration-200 lg:block ${sidebarClass}`}>
          <nav className="sticky top-16 px-5 py-8" aria-label="Developer documentation">
            <p className="mb-4 px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Documentation</p>
            <div className="space-y-1">
              {DOC_NAV_ITEMS.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full rounded-md px-2 py-2 text-left text-sm transition ${navItemClass(isSidebarActive(item.id))}`}
                  >
                    {item.label}
                  </button>
                  {item.id === "design-guide" && (
                    <div className="mt-1 space-y-1 pl-4">
                      {[
                        { id: "buttons", label: "Buttons" },
                        { id: "states", label: "Button States" },
                        { id: "trading", label: "Trading Actions" },
                      ].map((anchor) => (
                        <button
                          key={anchor.id}
                          onClick={() => scrollTo(anchor.id)}
                          className={`block w-full rounded-md px-2 py-1.5 text-left text-xs transition ${navItemClass(active === anchor.id || (anchor.id === "buttons" && BASIC_BUTTON_SECTIONS.includes(active)))}`}
                        >
                          {anchor.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </aside>

        <div className="min-w-0 px-5 py-8 md:px-8 lg:px-10 lg:py-10">
          <nav className="mb-8 flex gap-2 overflow-x-auto border-b border-border pb-4 lg:hidden" aria-label="Design guide sections">
            {DOC_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`shrink-0 rounded-md border px-3 py-2 text-left text-xs transition ${mobileNavItemClass(isSidebarActive(item.id))}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="w-full">
            <div id="top" className={`scroll-mt-24 border-b pb-10 ${dividerClass}`}>
              <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${eyebrowClass}`}>EUKK TRADE Developers</p>
              <h1 className="mt-4 text-[clamp(3rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-foreground">
                EUKK TRADE Developers
              </h1>
              <p className={`mt-5 max-w-3xl text-base leading-7 ${strongMutedClass}`}>
                EUKK TRADE의 설치, 개발, 디자인 기준을 한 곳에서 확인할 수 있는 개발자 문서입니다.
              </p>
              <p className={`mt-4 max-w-4xl text-[15px] leading-7 ${mutedClass}`}>
                본 문서는 프로젝트 진행 과정에서 필요한 설치 가이드, 개발 가이드, 디자인 가이드를 정리하기 위한 공간입니다. 현재 일부 항목은 준비 중이며, 실제 구현 상황에 맞춰 지속적으로 갱신됩니다.
              </p>
            </div>

            <section id="installation-guide" ref={registerSection("installation-guide")} className={`scroll-mt-24 border-b py-10 ${dividerClass}`}>
              <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${eyebrowClass}`}>Documentation</p>
              <h2 className="mt-3 text-[clamp(1.75rem,3vw,2rem)] font-semibold tracking-[-0.03em]">Installation Guide</h2>
              <p className={`mt-4 max-w-3xl text-[15px] leading-7 ${mutedClass}`}>
                EUKK TRADE를 실행하기 위한 설치 흐름과 초기 설정 항목을 정리하는 공간입니다.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {INSTALLATION_PLACEHOLDERS.map((title) => (
                  <div key={title} className={`rounded-lg border p-5 ${isDarkMode ? "border-white/10 bg-white/4" : "border-black/8 bg-white"}`}>
                    <h3 className="text-lg font-semibold tracking-[-0.02em]">{title}</h3>
                    <p className={`mt-3 text-[15px] leading-7 ${mutedClass}`}>해당 항목은 실제 배포 방식과 운영 환경이 확정된 뒤 갱신됩니다.</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="development-guide" ref={registerSection("development-guide")} className={`scroll-mt-24 border-b py-10 ${dividerClass}`}>
              <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${eyebrowClass}`}>Guides</p>
              <h2 className="mt-3 text-[clamp(1.75rem,3vw,2rem)] font-semibold tracking-[-0.03em]">Development Guide</h2>
              <p className={`mt-4 max-w-3xl text-[15px] leading-7 ${mutedClass}`}>
                EUKK TRADE의 개발 구조, 작업 규칙, 배포 흐름을 정리하는 공간입니다.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {DEVELOPMENT_PLACEHOLDERS.map((title) => (
                  <div key={title} className={`rounded-lg border p-5 ${isDarkMode ? "border-white/10 bg-white/4" : "border-black/8 bg-white"}`}>
                    <h3 className="text-lg font-semibold tracking-[-0.02em]">{title}</h3>
                    <p className={`mt-3 text-[15px] leading-7 ${mutedClass}`}>프로젝트 운영 방식에 맞춰 추후 상세 내용을 추가합니다.</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="design-guide" ref={registerSection("design-guide")} className={`scroll-mt-24 border-b py-10 ${dividerClass}`}>
              <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${eyebrowClass}`}>Documentation</p>
              <h2 className="mt-3 text-[clamp(1.75rem,3vw,2rem)] font-semibold tracking-[-0.03em]">Design Guide</h2>
              <p className={`mt-4 max-w-3xl text-[15px] leading-7 ${mutedClass}`}>
                EUKK TRADE의 UI 컴포넌트, 스타일 규칙, 인터랙션 기준을 정리한 디자인 가이드입니다.
              </p>
              <p className={`mt-4 max-w-4xl text-[15px] leading-7 ${mutedClass}`}>
                EukkTrade의 인터페이스 품질을 유지하기 위한 공식 UI 가이드라인입니다. 본 문서는 디자인 시스템의 핵심 원칙과 컴포넌트 사양을 정의하며, 각 UI 요소의 크기, 간격, 상태 변화 및 상호작용 규칙을 포함합니다.
              </p>
            </section>

            <section className="py-10">
              <div className="mb-10">
                <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${eyebrowClass}`}>Buttons</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Buttons</h2>
              </div>

              <section id="buttons" ref={registerSection("buttons")} className={`scroll-mt-24 border-b pb-8 ${dividerClass}`}>
                <h3 className="mb-8 text-xl font-semibold tracking-[-0.03em]">Basic Buttons</h3>
                {BASIC_BUTTON_SECTIONS.map((section) => (
                  <section key={section} id={section} ref={registerSection(section)} className={`scroll-mt-24 border-b py-4 last:border-b-0 ${dividerClass}`}>
                    <ButtonShowcaseSection section={section} />
                  </section>
                ))}
              </section>

              <section id="states" ref={registerSection("states")} className={`scroll-mt-24 border-b py-10 ${dividerClass}`}>
                <h3 className="mb-8 text-xl font-semibold tracking-[-0.03em]">Button States</h3>
                <ButtonShowcaseSection section="states" />
              </section>

              <section id="trading" ref={registerSection("trading")} className="scroll-mt-24 py-10">
                <h3 className="mb-8 text-xl font-semibold tracking-[-0.03em]">Trading Actions</h3>
                <ButtonShowcaseSection section="trading" />
              </section>
            </section>
          </div>
        </div>
      </main>

      <footer className={`border-t px-5 py-8 md:px-8 ${isDarkMode ? "border-white/8 bg-[#020f0f]" : "border-black/8 bg-[#F4F7F6]"}`}>
        <div className="flex w-full flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <ProjectLogo surface={isDarkMode ? "dark" : "light"} className="h-8 w-auto object-contain opacity-90" />
            <p className="mt-4 font-semibold tracking-[-0.02em]">EUKK TRADE Developers</p>
            <p className={`mt-2 text-sm ${mutedClass}`}>Documentation for installation, development, and design guidelines.</p>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/" className={`text-sm font-medium ${isDarkMode ? "text-[#14E3B2] hover:text-[#F2FFFB]" : "text-[#008A94] hover:text-[#06201F]"}`}>
              Home
            </Link>
            <a
              href={githubDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className={`text-sm font-medium ${isDarkMode ? "text-[#14E3B2] hover:text-[#F2FFFB]" : "text-[#008A94] hover:text-[#06201F]"}`}
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
