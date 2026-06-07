import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImage from "../../imports/image.png";
import { SectionHeader } from "./SectionHeader";
import { ButtonCell, ButtonRow, GridSection } from "./ButtonLabel";
import {
  ArrowRight, Plus, TrendingUp, TrendingDown, X, Target, ShieldAlert,
  BarChart2, ChevronDown, Bell, Settings, Search, Loader2, Check,
  AlertCircle, Star, RefreshCw, ArrowUpRight, Zap,
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

const base = "inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const sizeMap = {
  lg: { padding: "12px 24px", fontSize: "14px", height: "44px" },
  md: { padding: "8px 16px", fontSize: "13px", height: "36px" },
  sm: { padding: "5px 12px", fontSize: "12px", height: "28px" },
};

function PrimaryBtn({ size = "md", label = "Continue", icon }: { size?: keyof typeof sizeMap; label?: string; icon?: React.ReactNode }) {
  const s = sizeMap[size];
  return <button className={`${base} bg-primary text-primary-foreground rounded-md hover:opacity-90 active:scale-[0.98]`} style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em" }}>{icon}{label}</button>;
}
function SecondaryBtn({ size = "md", label = "Cancel" }: { size?: keyof typeof sizeMap; label?: string }) {
  const s = sizeMap[size];
  return <button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent active:scale-[0.98]`} style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em" }}>{label}</button>;
}
function GhostBtn({ size = "md", label = "View details" }: { size?: keyof typeof sizeMap; label?: string }) {
  const s = sizeMap[size];
  return <button className={`${base} bg-transparent text-foreground rounded-md hover:bg-accent active:scale-[0.98]`} style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em" }}>{label}</button>;
}
function OutlineBtn({ size = "md", label = "View details" }: { size?: keyof typeof sizeMap; label?: string }) {
  const s = sizeMap[size];
  return <button className={`${base} bg-transparent text-foreground border border-foreground/20 rounded-md hover:border-foreground/40 hover:bg-accent active:scale-[0.98]`} style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em" }}>{label}</button>;
}
function IconBtn({ icon, variant = "secondary", size = "md" }: { icon: React.ReactNode; variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "44px" : size === "md" ? "36px" : "28px";
  const variants = { primary: "bg-primary text-primary-foreground hover:opacity-90", secondary: "bg-secondary text-foreground border border-border hover:bg-accent", ghost: "bg-transparent text-foreground hover:bg-accent" };
  return <button className={`${base} rounded-md ${variants[variant]}`} style={{ width: dim, height: dim, padding: 0 }}>{icon}</button>;
}
function RoundIconBtn({ icon, variant = "secondary" }: { icon: React.ReactNode; variant?: "primary" | "secondary" | "ghost" }) {
  const variants = { primary: "bg-primary text-primary-foreground hover:opacity-90", secondary: "bg-secondary text-foreground border border-border hover:bg-accent", ghost: "bg-transparent text-foreground hover:bg-accent" };
  return <button className={`${base} rounded-full ${variants[variant]}`} style={{ width: "36px", height: "36px", padding: 0 }}>{icon}</button>;
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
  return <button className={`${base} bg-primary text-primary-foreground rounded-full hover:opacity-90 active:scale-[0.98]`} style={{ ...s, fontWeight: 500 }}>{label}</button>;
}
function SquareBtn({ label = "Confirm", size = "md" }: { label?: string; size?: "sm" | "md" | "lg" }) {
  const s = sizeMap[size];
  return <button className={`${base} bg-primary text-primary-foreground rounded-none hover:opacity-90 active:scale-[0.98]`} style={{ ...s, fontWeight: 500 }}>{label}</button>;
}
function SplitBtn() {
  return (
    <div className="inline-flex rounded-md overflow-hidden border border-border">
      <button className="px-4 bg-primary text-primary-foreground hover:opacity-90 transition-opacity" style={{ height: "36px", fontSize: "13px", fontWeight: 500 }}>Buy BTC</button>
      <div className="w-px bg-primary/30" />
      <button className="px-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity" style={{ height: "36px" }}><ChevronDown size={14} /></button>
    </div>
  );
}
function ButtonGroupExample() {
  const [act, setAct] = useState(0);
  const items = ["1D", "1W", "1M", "3M", "1Y", "ALL"];
  return (
    <div className="inline-flex rounded-md border border-border overflow-hidden">
      {items.map((item, i) => (
        <button key={item} onClick={() => setAct(i)} className="transition-colors" style={{ height: "32px", padding: "0 12px", fontSize: "12px", fontWeight: 500, fontFamily: "'JetBrains Mono', monospace", background: act === i ? "#0f0f11" : "#fff", color: act === i ? "#fff" : "#6b6b78", borderRight: i < items.length - 1 ? "1px solid #e8e8ec" : "none", cursor: "pointer" }}>
          {item}
        </button>
      ))}
    </div>
  );
}
function TagBtn({ label, active }: { label: string; active?: boolean }) {
  return <button className={`${base} rounded-full transition-colors`} style={{ padding: "4px 12px", fontSize: "12px", fontWeight: 500, height: "26px", background: active ? "#0f0f11" : "#f1f1f3", color: active ? "#fff" : "#6b6b78", border: active ? "none" : "1px solid #e8e8ec" }}>{label}</button>;
}
function StateBtn({ state }: { state: "default" | "hover" | "pressed" | "disabled" | "loading" | "success" | "error" }) {
  const cfg = {
    default: { cls: `${base} bg-primary text-primary-foreground rounded-md`, label: "Place Order", icon: null as React.ReactNode, bg: "" },
    hover: { cls: `${base} bg-primary/85 text-primary-foreground rounded-md`, label: "Place Order", icon: null as React.ReactNode, bg: "" },
    pressed: { cls: `${base} bg-primary/70 text-primary-foreground rounded-md scale-[0.98]`, label: "Place Order", icon: null as React.ReactNode, bg: "" },
    disabled: { cls: `${base} bg-muted text-muted-foreground rounded-md cursor-not-allowed`, label: "Place Order", icon: null as React.ReactNode, bg: "" },
    loading: { cls: `${base} bg-primary text-primary-foreground rounded-md cursor-wait`, label: "Processing…", icon: <Loader2 size={14} className="animate-spin" />, bg: "" },
    success: { cls: `${base} rounded-md text-white`, label: "Order Filled", icon: <Check size={14} />, bg: "#1a7a4a" },
    error: { cls: `${base} rounded-md text-white`, label: "Order Failed", icon: <AlertCircle size={14} />, bg: "#c8102e" },
  }[state];
  return <button className={cfg.cls} disabled={state === "disabled"} style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500, letterSpacing: "-0.01em", ...(cfg.bg ? { background: cfg.bg } : {}) }}>{cfg.icon}{cfg.label}</button>;
}
function WireframeBtn({ label, dashed }: { label: string; dashed?: boolean }) {
  return <button className={`${base} rounded-md`} style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 400, background: "transparent", color: "#9999aa", border: dashed ? "1.5px dashed #c4c4cc" : "1.5px solid #e2e2e6", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.02em" }}>{label}</button>;
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
      <div className="rounded-xl p-8 mb-6" style={{ background: "linear-gradient(135deg, #f8f8f9 0%, #ebebef 100%)", border: "1px solid #e2e2e6" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.08em" }} className="uppercase text-muted-foreground mb-5">On light surface</p>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonCell label="Filled"><FilledBtn /></ButtonCell>
          <ButtonCell label="Outline"><OutlineBtn /></ButtonCell>
          <ButtonCell label="Soft"><SoftBtn /></ButtonCell>
          <ButtonCell label="Ghost"><GhostBtn /></ButtonCell>
          <ButtonCell label="Minimal"><MinimalBtn /></ButtonCell>
          <ButtonCell label="Glassmorphism"><GlassBtn /></ButtonCell>
        </div>
      </div>
      <div className="rounded-xl p-8" style={{ background: "#0f0f11", border: "1px solid #1e1e24" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.08em", color: "#6b6b78" }} className="uppercase mb-5">On dark surface</p>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonCell label={<span className="text-zinc-500">White Fill</span>}><button className={`${base} rounded-md hover:opacity-90`} style={{ ...sizeMap.md, fontWeight: 500, background: "#fff", color: "#0f0f11" }}>Continue</button></ButtonCell>
          <ButtonCell label={<span className="text-zinc-500">Outline</span>}><button className={`${base} rounded-md hover:bg-white/10`} style={{ ...sizeMap.md, fontWeight: 500, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}>Cancel</button></ButtonCell>
          <ButtonCell label={<span className="text-zinc-500">Ghost</span>}><button className={`${base} rounded-md hover:bg-white/10`} style={{ ...sizeMap.md, fontWeight: 500, background: "transparent", color: "#9999aa" }}>Dismiss</button></ButtonCell>
          <ButtonCell label={<span className="text-zinc-500">Soft White</span>}><button className={`${base} rounded-md hover:bg-white/15`} style={{ ...sizeMap.md, fontWeight: 500, background: "rgba(255,255,255,0.1)", color: "#fff" }}>View Chart</button></ButtonCell>
          <ButtonCell label={<span className="text-zinc-500">Glass Dark</span>}><button className={`${base} rounded-md`} style={{ ...sizeMap.md, fontWeight: 500, background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}>Place Order</button></ButtonCell>
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
  const [active, setActive] = useState("primary");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) { setActive(entry.target.id); break; }
        }
      },
      { root: mainRef.current, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el || !mainRef.current) return;
    mainRef.current.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <div className="flex size-full" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#f8f8f9" }}>
      {/* Sidebar */}
      <aside className="flex-none flex flex-col" style={{ width: "240px", minHeight: "100vh", background: "#ffffff", borderRight: "1px solid rgba(0,0,0,0.07)", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div className="flex items-center gap-2 px-6" style={{ height: "60px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <ImageWithFallback src={logoImage} alt="Eukk Trade logo" style={{ width: "22px", height: "22px", borderRadius: "4px", flexShrink: 0, objectFit: "contain" }} />
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#0f0f11", letterSpacing: "-0.01em", lineHeight: 1.3 }}>FinDSys</p>
            <p style={{ fontSize: "10px", color: "#9999aa", letterSpacing: "0.02em", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.3 }}>Button Explorer</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-5">
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.08em", color: "#aaaabc", paddingLeft: "12px", marginBottom: "8px" }} className="uppercase">Components</p>
          <ul className="space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button onClick={() => scrollTo(item.id)} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors" style={{ fontSize: "13px", fontWeight: active === item.id ? 500 : 400, color: active === item.id ? "#0f0f11" : "#6b6b78", background: active === item.id ? "#f1f1f3" : "transparent", cursor: "pointer", border: "none" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: active === item.id ? "#0f0f11" : "#c4c4cc", minWidth: "20px" }}>{item.index}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: "11px", color: "#c4c4cc", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.03em" }}>v1.0 · Design System</p>
          <p style={{ fontSize: "11px", color: "#c4c4cc", fontFamily: "'JetBrains Mono', monospace", marginTop: "2px" }}>Prototype Playground</p>
          <Link to="/" style={{ display: "block", marginTop: "12px", fontSize: "11px", color: "#9999aa", fontFamily: "'JetBrains Mono', monospace", textDecoration: "none" }}>← 홈으로</Link>
        </div>
      </aside>

      {/* Main */}
      <main ref={mainRef} className="flex-1 overflow-y-auto" style={{ height: "100vh" }}>
        <div className="flex items-center justify-between px-12" style={{ height: "60px", background: "#ffffff", borderBottom: "1px solid rgba(0,0,0,0.07)", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontSize: "14px", fontWeight: 600, color: "#0f0f11", letterSpacing: "-0.01em" }}>EUKK TRADE 개발자 디자인 가이드</h1>
            <p style={{ fontSize: "11px", color: "#9999aa", fontFamily: "'JetBrains Mono', monospace", marginTop: "1px" }}>Eukk Trade — Component Prototype</p>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: "#6b6b78", background: "#f1f1f3", border: "1px solid #e2e2e6", borderRadius: "4px", padding: "3px 8px" }}>1440px canvas</span>
            <span style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "4px", padding: "3px 8px" }}>Prototype</span>
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 64px 120px" }}>
          <div className="mb-16">
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#9999aa" }} className="uppercase mb-3">UX/UI Component Prototype · Button Library</p>
            <h1 style={{ fontSize: "36px", fontWeight: 700, color: "#0f0f11", letterSpacing: "-0.03em", lineHeight: 1.1, whiteSpace: "nowrap" }}>자동매매기 버튼 디자인 & 레이아웃 프로토타입 가이드</h1>
            <p style={{ fontSize: "14px", color: "#6b6b78", marginTop: "16px", maxWidth: "780px", lineHeight: 1.65 }}>
              EukkTrade의 인터페이스 품질을 유지하기 위한 공식 UI 가이드라인입니다.<br />
              본 문서는 디자인 시스템의 핵심 원칙과 컴포넌트 사양을 정의하며, 각 UI 요소의 크기, 간격, 상태 변화 및 상호작용 규칙을 포함합니다.<br />
              개발 과정에서 모든 화면은 본 가이드라인을 기준으로 설계 및 구현되어야 하며, 신규 기능 추가 시에도 동일한 디자인 원칙을 준수해야 합니다.
            </p>
            <div className="flex items-center gap-5 mt-6">
              {[["10", "Sections"], ["50+", "Button variants"], ["7", "States per variant"], ["3", "Size scales"]].map(([val, lbl]) => (
                <div key={lbl} className="flex flex-col">
                  <span style={{ fontSize: "18px", fontWeight: 700, color: "#0f0f11", letterSpacing: "-0.02em", fontFamily: "'JetBrains Mono', monospace" }}>{val}</span>
                  <span style={{ fontSize: "11px", color: "#9999aa", letterSpacing: "0.02em" }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "64px" }} />
          {NAV_ITEMS.map((item) => (
            <section key={item.id} id={item.id} ref={(el) => { sectionRefs.current[item.id] = el; }}>
              <ButtonShowcaseSection section={item.id} />
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
