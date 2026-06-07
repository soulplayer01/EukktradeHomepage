import { useState } from "react";
import {
  ArrowRight,
  Plus,
  TrendingUp,
  TrendingDown,
  X,
  Target,
  ShieldAlert,
  BarChart2,
  ChevronDown,
  Bell,
  Settings,
  Search,
  Loader2,
  Check,
  AlertCircle,
  Zap,
  Star,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ButtonCell, ButtonRow, GridSection } from "./ButtonLabel";

/* ─── shared base ─────────────────────────────── */
const base =
  "inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/* ─── size tokens ─────────────────────────────── */
const sizeMap = {
  lg: { padding: "12px 24px", fontSize: "14px", height: "44px" },
  md: { padding: "8px 16px", fontSize: "13px", height: "36px" },
  sm: { padding: "5px 12px", fontSize: "12px", height: "28px" },
};

/* ─── Primary ─────────────────────────────────── */
function PrimaryBtn({ size = "md", label = "Continue", icon }: { size?: keyof typeof sizeMap; label?: string; icon?: React.ReactNode }) {
  const s = sizeMap[size];
  return (
    <button
      className={`${base} bg-primary text-primary-foreground rounded-md hover:opacity-90 active:scale-[0.98]`}
      style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em" }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ─── Secondary ──────────────────────────────── */
function SecondaryBtn({ size = "md", label = "Cancel" }: { size?: keyof typeof sizeMap; label?: string }) {
  const s = sizeMap[size];
  return (
    <button
      className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent active:scale-[0.98]`}
      style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em" }}
    >
      {label}
    </button>
  );
}

/* ─── Ghost ──────────────────────────────────── */
function GhostBtn({ size = "md", label = "View details" }: { size?: keyof typeof sizeMap; label?: string }) {
  const s = sizeMap[size];
  return (
    <button
      className={`${base} bg-transparent text-foreground rounded-md hover:bg-accent active:scale-[0.98]`}
      style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em" }}
    >
      {label}
    </button>
  );
}

/* ─── Outline ─────────────────────────────────── */
function OutlineBtn({ size = "md", label = "View details" }: { size?: keyof typeof sizeMap; label?: string }) {
  const s = sizeMap[size];
  return (
    <button
      className={`${base} bg-transparent text-foreground border border-foreground/20 rounded-md hover:border-foreground/40 hover:bg-accent active:scale-[0.98]`}
      style={{ ...s, fontWeight: 500, letterSpacing: "-0.01em" }}
    >
      {label}
    </button>
  );
}

/* ─── Icon Button ─────────────────────────────── */
function IconBtn({ icon, variant = "secondary", size = "md" }: { icon: React.ReactNode; variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "44px" : size === "md" ? "36px" : "28px";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-foreground border border-border hover:bg-accent",
    ghost: "bg-transparent text-foreground hover:bg-accent",
  };
  return (
    <button
      className={`${base} rounded-md ${variants[variant]}`}
      style={{ width: dim, height: dim, padding: 0 }}
    >
      {icon}
    </button>
  );
}

/* ─── Rounded Icon Button ─────────────────────── */
function RoundIconBtn({ icon, variant = "secondary" }: { icon: React.ReactNode; variant?: "primary" | "secondary" | "ghost" }) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-foreground border border-border hover:bg-accent",
    ghost: "bg-transparent text-foreground hover:bg-accent",
  };
  return (
    <button
      className={`${base} rounded-full ${variants[variant]}`}
      style={{ width: "36px", height: "36px", padding: 0 }}
    >
      {icon}
    </button>
  );
}

/* ─── Trading action buttons ─────────────────── */
function TradingBtn({
  label,
  sub,
  color,
  hoverColor,
  icon,
  size = "md",
}: {
  label: string;
  sub?: string;
  color: string;
  hoverColor: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const s = sizeMap[size];
  return (
    <button
      className={`${base} rounded-md text-white active:scale-[0.98]`}
      style={{
        ...s,
        background: color,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        minWidth: "120px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = hoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.background = color)}
    >
      {icon}
      <span className="flex flex-col items-start">
        <span>{label}</span>
        {sub && <span style={{ fontSize: "10px", opacity: 0.75, fontWeight: 400 }}>{sub}</span>}
      </span>
    </button>
  );
}

/* ─── State buttons ──────────────────────────── */
function StateBtn({
  state,
}: {
  state: "default" | "hover" | "pressed" | "disabled" | "loading" | "success" | "error";
}) {
  const stateConfig = {
    default: {
      className: `${base} bg-primary text-primary-foreground rounded-md`,
      label: "Place Order",
      icon: null,
    },
    hover: {
      className: `${base} bg-primary/85 text-primary-foreground rounded-md`,
      label: "Place Order",
      icon: null,
    },
    pressed: {
      className: `${base} bg-primary/70 text-primary-foreground rounded-md scale-[0.98]`,
      label: "Place Order",
      icon: null,
    },
    disabled: {
      className: `${base} bg-muted text-muted-foreground rounded-md cursor-not-allowed`,
      label: "Place Order",
      icon: null,
    },
    loading: {
      className: `${base} bg-primary text-primary-foreground rounded-md cursor-wait`,
      label: "Processing…",
      icon: <Loader2 size={14} className="animate-spin" />,
    },
    success: {
      className: `${base} rounded-md text-white`,
      label: "Order Filled",
      icon: <Check size={14} />,
      bg: "#1a7a4a",
    },
    error: {
      className: `${base} rounded-md text-white`,
      label: "Order Failed",
      icon: <AlertCircle size={14} />,
      bg: "#c8102e",
    },
  };
  const cfg = stateConfig[state];
  return (
    <button
      className={cfg.className}
      disabled={state === "disabled"}
      style={{
        padding: "8px 16px",
        fontSize: "13px",
        height: "36px",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        ...(("bg" in cfg && cfg.bg) ? { background: cfg.bg } : {}),
      }}
    >
      {cfg.icon}
      {cfg.label}
    </button>
  );
}

/* ─── Variation buttons ──────────────────────── */
function FilledBtn() {
  return (
    <button
      className={`${base} rounded-md`}
      style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500, background: "#0f0f11", color: "#fff" }}
    >
      Filled
    </button>
  );
}
function SoftBtn() {
  return (
    <button
      className={`${base} rounded-md`}
      style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500, background: "rgba(15,15,17,0.08)", color: "#0f0f11" }}
    >
      Soft
    </button>
  );
}
function MinimalBtn() {
  return (
    <button
      className={`${base} rounded-md`}
      style={{ padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500, background: "transparent", color: "#0f0f11", textDecoration: "underline", textUnderlineOffset: "2px" }}
    >
      Minimal
    </button>
  );
}
function GlassBtn() {
  return (
    <button
      className={`${base} rounded-md`}
      style={{
        padding: "8px 16px", fontSize: "13px", height: "36px", fontWeight: 500,
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.8)",
        color: "#0f0f11",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)"
      }}
    >
      Glassmorphism
    </button>
  );
}

/* ─── Premium fintech buttons ────────────────── */
function PremiumBtn({ label, sub, variant }: { label: string; sub?: string; variant: "dark" | "subtle" | "mono" | "ruled" }) {
  const styles: Record<string, React.CSSProperties> = {
    dark: {
      background: "#0f0f11",
      color: "#fff",
      border: "none",
      boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
    },
    subtle: {
      background: "#fff",
      color: "#0f0f11",
      border: "1px solid #e2e2e6",
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    },
    mono: {
      background: "transparent",
      color: "#0f0f11",
      border: "1.5px solid #0f0f11",
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      fontSize: "11px",
    },
    ruled: {
      background: "#fff",
      color: "#0f0f11",
      border: "1px solid #e2e2e6",
      borderBottom: "2px solid #0f0f11",
    },
  };
  return (
    <button
      className={`${base} rounded-md active:scale-[0.98]`}
      style={{
        padding: "10px 20px",
        fontSize: "13px",
        height: "40px",
        fontWeight: 500,
        transition: "all 0.15s",
        ...styles[variant],
      }}
    >
      <span className="flex flex-col items-start">
        <span>{label}</span>
        {sub && <span style={{ fontSize: "10px", opacity: 0.6, fontWeight: 400 }}>{sub}</span>}
      </span>
    </button>
  );
}

/* ─── Wireframe / placeholder buttons ────────── */
function WireframeBtn({ label, dashed }: { label: string; dashed?: boolean }) {
  return (
    <button
      className={`${base} rounded-md`}
      style={{
        padding: "8px 16px",
        fontSize: "13px",
        height: "36px",
        fontWeight: 400,
        background: "transparent",
        color: "#9999aa",
        border: dashed ? "1.5px dashed #c4c4cc" : "1.5px solid #e2e2e6",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </button>
  );
}
function EmptyBox({ w = 120, h = 36, label }: { w?: number; h?: number; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        style={{
          width: w,
          height: h,
          border: "1.5px dashed #c4c4cc",
          borderRadius: "6px",
          background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(180,180,200,0.06) 4px, rgba(180,180,200,0.06) 8px)",
        }}
      />
      {label && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#aaaabc", letterSpacing: "0.05em" }}>
          {label}
        </span>
      )}
    </div>
  );
}

/* ─── Pill / Rounded / Square ────────────────── */
function PillBtn({ label = "Confirm", size = "md" }: { label?: string; size?: "sm" | "md" | "lg" }) {
  const s = sizeMap[size];
  return (
    <button
      className={`${base} bg-primary text-primary-foreground rounded-full hover:opacity-90 active:scale-[0.98]`}
      style={{ ...s, fontWeight: 500 }}
    >
      {label}
    </button>
  );
}
function SquareBtn({ label = "Confirm", size = "md" }: { label?: string; size?: "sm" | "md" | "lg" }) {
  const s = sizeMap[size];
  return (
    <button
      className={`${base} bg-primary text-primary-foreground rounded-none hover:opacity-90 active:scale-[0.98]`}
      style={{ ...s, fontWeight: 500 }}
    >
      {label}
    </button>
  );
}

/* ─── Split button ───────────────────────────── */
function SplitBtn() {
  return (
    <div className="inline-flex rounded-md overflow-hidden border border-border">
      <button
        className="px-4 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        style={{ height: "36px", fontSize: "13px", fontWeight: 500 }}
      >
        Buy BTC
      </button>
      <div className="w-px bg-primary/30" />
      <button
        className="px-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        style={{ height: "36px" }}
      >
        <ChevronDown size={14} />
      </button>
    </div>
  );
}

/* ─── Button group ───────────────────────────── */
function ButtonGroupExample() {
  const [active, setActive] = useState(0);
  const items = ["1D", "1W", "1M", "3M", "1Y", "ALL"];
  return (
    <div className="inline-flex rounded-md border border-border overflow-hidden">
      {items.map((item, i) => (
        <button
          key={item}
          onClick={() => setActive(i)}
          className="transition-colors"
          style={{
            height: "32px",
            padding: "0 12px",
            fontSize: "12px",
            fontWeight: 500,
            fontFamily: "var(--font-mono)",
            background: active === i ? "#0f0f11" : "#fff",
            color: active === i ? "#fff" : "#6b6b78",
            borderRight: i < items.length - 1 ? "1px solid #e8e8ec" : "none",
            cursor: "pointer",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

/* ─── Badge-style inline buttons ─────────────── */
function TagBtn({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`${base} rounded-full transition-colors`}
      style={{
        padding: "4px 12px",
        fontSize: "12px",
        fontWeight: 500,
        height: "26px",
        background: active ? "#0f0f11" : "#f1f1f3",
        color: active ? "#fff" : "#6b6b78",
        border: active ? "none" : "1px solid #e8e8ec",
      }}
    >
      {label}
    </button>
  );
}

/* ─── MAIN EXPORT ─────────────────────────────── */
export function ButtonShowcase() {
  return (
    <div style={{ fontFamily: "var(--font-family)" }}>
      {/* ── 1. Primary ─────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="01 — Core" title="Primary Buttons" description="Main call-to-action. Used for the highest priority action on a page." />
        <ButtonRow title="Large — 44px">
          <ButtonCell label="Default">
            <PrimaryBtn size="lg" label="Place Order" icon={<ArrowRight size={16} />} />
          </ButtonCell>
          <ButtonCell label="Icon Left">
            <PrimaryBtn size="lg" label="New Position" icon={<Plus size={16} />} />
          </ButtonCell>
          <ButtonCell label="Icon Right">
            <button
              className={`${base} bg-primary text-primary-foreground rounded-md hover:opacity-90 active:scale-[0.98]`}
              style={{ ...sizeMap.lg, fontWeight: 500 }}
            >
              View Portfolio <ArrowRight size={16} />
            </button>
          </ButtonCell>
          <ButtonCell label="No Icon">
            <PrimaryBtn size="lg" label="Confirm Trade" />
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="Medium — 36px">
          <ButtonCell label="Default">
            <PrimaryBtn size="md" label="Place Order" />
          </ButtonCell>
          <ButtonCell label="With Icon">
            <PrimaryBtn size="md" label="Add Funds" icon={<Plus size={14} />} />
          </ButtonCell>
          <ButtonCell label="Trailing Icon">
            <button
              className={`${base} bg-primary text-primary-foreground rounded-md hover:opacity-90`}
              style={{ ...sizeMap.md, fontWeight: 500 }}
            >
              Continue <ArrowRight size={14} />
            </button>
          </ButtonCell>
          <ButtonCell label="Short Label">
            <PrimaryBtn size="md" label="Buy" />
          </ButtonCell>
          <ButtonCell label="Long Label">
            <PrimaryBtn size="md" label="Confirm & Execute" />
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="Small — 28px">
          <ButtonCell label="Default">
            <PrimaryBtn size="sm" label="Confirm" />
          </ButtonCell>
          <ButtonCell label="With Icon">
            <PrimaryBtn size="sm" label="Add" icon={<Plus size={12} />} />
          </ButtonCell>
          <ButtonCell label="Label Only">
            <PrimaryBtn size="sm" label="Apply" />
          </ButtonCell>
        </ButtonRow>
      </section>

      {/* ── 2. Secondary ───────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="02 — Core" title="Secondary Buttons" description="Support the primary action. Used for secondary CTAs and paired with primary buttons." />
        <ButtonRow title="Large — 44px">
          <ButtonCell label="Default">
            <SecondaryBtn size="lg" label="Cancel Order" />
          </ButtonCell>
          <ButtonCell label="With Icon">
            <button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.lg, fontWeight: 500 }}>
              <Settings size={16} /> Settings
            </button>
          </ButtonCell>
          <ButtonCell label="With Icon Right">
            <button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.lg, fontWeight: 500 }}>
              Export Data <ArrowRight size={16} />
            </button>
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="Medium — 36px">
          <ButtonCell label="Default">
            <SecondaryBtn size="md" label="Cancel" />
          </ButtonCell>
          <ButtonCell label="With Icon">
            <button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}>
              <RefreshCw size={14} /> Refresh
            </button>
          </ButtonCell>
          <ButtonCell label="Search">
            <button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}>
              <Search size={14} /> Search
            </button>
          </ButtonCell>
          <ButtonCell label="Alert">
            <button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}>
              <Bell size={14} /> Alerts
            </button>
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="Small — 28px">
          <ButtonCell label="Default">
            <SecondaryBtn size="sm" label="Dismiss" />
          </ButtonCell>
          <ButtonCell label="With Icon">
            <button className={`${base} bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent`} style={{ ...sizeMap.sm, fontWeight: 500 }}>
              <X size={12} /> Remove
            </button>
          </ButtonCell>
          <ButtonCell label="Compact">
            <SecondaryBtn size="sm" label="Edit" />
          </ButtonCell>
        </ButtonRow>
      </section>

      {/* ── 3. Ghost ───────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="03 — Core" title="Ghost Buttons" description="Low emphasis. Used for tertiary actions, inline text actions, and table row controls." />
        <ButtonRow title="Sizes">
          <ButtonCell label="Large">
            <GhostBtn size="lg" label="View Details" />
          </ButtonCell>
          <ButtonCell label="Medium">
            <GhostBtn size="md" label="View Details" />
          </ButtonCell>
          <ButtonCell label="Small">
            <GhostBtn size="sm" label="View" />
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="With Icons">
          <ButtonCell label="Arrow Right">
            <button className={`${base} bg-transparent text-foreground rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}>
              Positions <ArrowRight size={14} />
            </button>
          </ButtonCell>
          <ButtonCell label="External Link">
            <button className={`${base} bg-transparent text-foreground rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}>
              Open Chart <ArrowUpRight size={14} />
            </button>
          </ButtonCell>
          <ButtonCell label="Icon Prefix">
            <button className={`${base} bg-transparent text-foreground rounded-md hover:bg-accent`} style={{ ...sizeMap.md, fontWeight: 500 }}>
              <BarChart2 size={14} /> Analytics
            </button>
          </ButtonCell>
        </ButtonRow>
      </section>

      {/* ── 4. Icon Buttons ────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="04 — Core" title="Icon Buttons" description="Square and circular icon-only buttons for toolbar actions and compact interfaces." />
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

      {/* ── 5. Shape: Rounded vs Square ───────────── */}
      <section className="mb-20">
        <SectionHeader label="05 — Shape" title="Border Radius Variants" description="Comparing button shapes — pill, rounded (default), slight, and square — for different brand feels." />
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
          <ButtonCell label="Large">
            <button className={`${base} bg-primary text-primary-foreground hover:opacity-90`} style={{ ...sizeMap.lg, fontWeight: 500, borderRadius: "3px" }}>Place Order</button>
          </ButtonCell>
          <ButtonCell label="Medium">
            <button className={`${base} bg-primary text-primary-foreground hover:opacity-90`} style={{ ...sizeMap.md, fontWeight: 500, borderRadius: "3px" }}>Place Order</button>
          </ButtonCell>
          <ButtonCell label="Small">
            <button className={`${base} bg-primary text-primary-foreground hover:opacity-90`} style={{ ...sizeMap.sm, fontWeight: 500, borderRadius: "3px" }}>Place Order</button>
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="Square (border-radius: 0)">
          <ButtonCell label="Large"><SquareBtn size="lg" label="Place Order" /></ButtonCell>
          <ButtonCell label="Medium"><SquareBtn size="md" label="Place Order" /></ButtonCell>
          <ButtonCell label="Small"><SquareBtn size="sm" label="Place Order" /></ButtonCell>
        </ButtonRow>
      </section>

      {/* ── 6. Trading Actions ─────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="06 — Domain" title="Trading Action Buttons" description="High-intent action buttons specific to trading workflows. Colors are semantic and intentional." />
        <ButtonRow title="Primary Trading Actions — Large">
          <ButtonCell label="Buy">
            <TradingBtn label="Buy" sub="Market Order" color="#16a34a" hoverColor="#15803d" icon={<TrendingUp size={16} />} size="lg" />
          </ButtonCell>
          <ButtonCell label="Sell">
            <TradingBtn label="Sell" sub="Market Order" color="#c8102e" hoverColor="#b00d28" icon={<TrendingDown size={16} />} size="lg" />
          </ButtonCell>
          <ButtonCell label="Close Position">
            <TradingBtn label="Close Position" sub="All Lots" color="#374151" hoverColor="#1f2937" icon={<X size={16} />} size="lg" />
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="Risk Management Actions — Medium">
          <ButtonCell label="Take Profit">
            <TradingBtn label="Take Profit" color="#0369a1" hoverColor="#0284c7" icon={<Target size={15} />} size="md" />
          </ButtonCell>
          <ButtonCell label="Stop Loss">
            <TradingBtn label="Stop Loss" color="#c8102e" hoverColor="#b00d28" icon={<ShieldAlert size={15} />} size="md" />
          </ButtonCell>
          <ButtonCell label="Buy Limit">
            <TradingBtn label="Buy Limit" color="#166534" hoverColor="#14532d" size="md" />
          </ButtonCell>
          <ButtonCell label="Sell Limit">
            <TradingBtn label="Sell Limit" color="#9f1239" hoverColor="#881337" size="md" />
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="Outlined Trading Actions — Medium">
          <ButtonCell label="Buy — Outline">
            <button
              className={`${base} rounded-md active:scale-[0.98]`}
              style={{ ...sizeMap.md, fontWeight: 600, background: "#f0fdf4", color: "#16a34a", border: "1.5px solid #16a34a" }}
            >
              <TrendingUp size={14} /> Buy
            </button>
          </ButtonCell>
          <ButtonCell label="Sell — Outline">
            <button
              className={`${base} rounded-md active:scale-[0.98]`}
              style={{ ...sizeMap.md, fontWeight: 600, background: "#fff1f2", color: "#c8102e", border: "1.5px solid #c8102e" }}
            >
              <TrendingDown size={14} /> Sell
            </button>
          </ButtonCell>
          <ButtonCell label="Close — Outline">
            <button
              className={`${base} rounded-md active:scale-[0.98]`}
              style={{ ...sizeMap.md, fontWeight: 600, background: "#f9fafb", color: "#374151", border: "1.5px solid #374151" }}
            >
              <X size={14} /> Close
            </button>
          </ButtonCell>
          <ButtonCell label="Take Profit — Soft">
            <button
              className={`${base} rounded-md active:scale-[0.98]`}
              style={{ ...sizeMap.md, fontWeight: 600, background: "#eff6ff", color: "#0369a1", border: "none" }}
            >
              <Target size={14} /> Take Profit
            </button>
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="Split / Compound Buttons">
          <ButtonCell label="Split Button"><SplitBtn /></ButtonCell>
          <ButtonCell label="Period Selector"><ButtonGroupExample /></ButtonCell>
        </ButtonRow>
      </section>

      {/* ── 7. States ──────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="07 — States" title="Button States" description="All interactive states a button can be in. Covers keyboard, pointer, and async feedback." />
        <GridSection title="All States" cols={7}>
          <ButtonCell label="Default"><StateBtn state="default" /></ButtonCell>
          <ButtonCell label="Hover"><StateBtn state="hover" /></ButtonCell>
          <ButtonCell label="Pressed"><StateBtn state="pressed" /></ButtonCell>
          <ButtonCell label="Disabled"><StateBtn state="disabled" /></ButtonCell>
          <ButtonCell label="Loading"><StateBtn state="loading" /></ButtonCell>
          <ButtonCell label="Success"><StateBtn state="success" /></ButtonCell>
          <ButtonCell label="Error"><StateBtn state="error" /></ButtonCell>
        </GridSection>
        <ButtonRow title="Disabled across variants">
          <ButtonCell label="Primary disabled">
            <button className={`${base} bg-muted text-muted-foreground rounded-md cursor-not-allowed`} disabled style={{ ...sizeMap.md, fontWeight: 500 }}>Place Order</button>
          </ButtonCell>
          <ButtonCell label="Secondary disabled">
            <button className={`${base} bg-muted/60 text-muted-foreground border border-border rounded-md cursor-not-allowed`} disabled style={{ ...sizeMap.md, fontWeight: 500 }}>Cancel</button>
          </ButtonCell>
          <ButtonCell label="Ghost disabled">
            <button className={`${base} bg-transparent text-muted-foreground rounded-md cursor-not-allowed opacity-40`} disabled style={{ ...sizeMap.md, fontWeight: 500 }}>View Details</button>
          </ButtonCell>
          <ButtonCell label="Trading Buy disabled">
            <button className={`${base} rounded-md cursor-not-allowed`} disabled style={{ ...sizeMap.md, fontWeight: 600, background: "#bbf7d0", color: "#86efac" }}>Buy</button>
          </ButtonCell>
          <ButtonCell label="Trading Sell disabled">
            <button className={`${base} rounded-md cursor-not-allowed`} disabled style={{ ...sizeMap.md, fontWeight: 600, background: "#fecdd3", color: "#fda4af" }}>Sell</button>
          </ButtonCell>
        </ButtonRow>
      </section>

      {/* ── 8. Variations ─────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="08 — Style" title="Button Variations" description="Style variations for different surface contexts — filled, outline, soft, glass, and minimal." />
        <div
          className="rounded-xl p-8 mb-8 grid gap-8"
          style={{ background: "linear-gradient(135deg, #f8f8f9 0%, #ebebef 100%)", border: "1px solid #e2e2e6" }}
        >
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.08em" }} className="uppercase text-muted-foreground mb-5">On light surface</p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonCell label="Filled"><FilledBtn /></ButtonCell>
              <ButtonCell label="Outline"><OutlineBtn /></ButtonCell>
              <ButtonCell label="Soft"><SoftBtn /></ButtonCell>
              <ButtonCell label="Ghost"><GhostBtn /></ButtonCell>
              <ButtonCell label="Minimal"><MinimalBtn /></ButtonCell>
              <ButtonCell label="Glassmorphism"><GlassBtn /></ButtonCell>
            </div>
          </div>
        </div>
        <div
          className="rounded-xl p-8 grid gap-8"
          style={{ background: "#0f0f11", border: "1px solid #1e1e24" }}
        >
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.08em", color: "#6b6b78" }} className="uppercase mb-5">On dark surface</p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonCell label={<span className="text-zinc-500">White Fill</span>}>
                <button className={`${base} rounded-md hover:opacity-90`} style={{ ...sizeMap.md, fontWeight: 500, background: "#fff", color: "#0f0f11" }}>Continue</button>
              </ButtonCell>
              <ButtonCell label={<span className="text-zinc-500">Outline</span>}>
                <button className={`${base} rounded-md hover:bg-white/10`} style={{ ...sizeMap.md, fontWeight: 500, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}>Cancel</button>
              </ButtonCell>
              <ButtonCell label={<span className="text-zinc-500">Ghost</span>}>
                <button className={`${base} rounded-md hover:bg-white/10`} style={{ ...sizeMap.md, fontWeight: 500, background: "transparent", color: "#9999aa" }}>Dismiss</button>
              </ButtonCell>
              <ButtonCell label={<span className="text-zinc-500">Soft White</span>}>
                <button className={`${base} rounded-md hover:bg-white/15`} style={{ ...sizeMap.md, fontWeight: 500, background: "rgba(255,255,255,0.1)", color: "#fff" }}>View Chart</button>
              </ButtonCell>
              <ButtonCell label={<span className="text-zinc-500">Glass Dark</span>}>
                <button className={`${base} rounded-md`} style={{
                  ...sizeMap.md, fontWeight: 500,
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff",
                }}>Place Order</button>
              </ButtonCell>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Premium Fintech ─────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="09 — Premium" title="Fintech Style Patterns" description="High-craft button patterns inspired by Bloomberg Terminal, Vercel, Stripe, and Linear." />
        <ButtonRow title="Premium Styles">
          <ButtonCell label="Dark Elevated"><PremiumBtn label="Execute Trade" variant="dark" /></ButtonCell>
          <ButtonCell label="Subtle Raised"><PremiumBtn label="View Report" variant="subtle" /></ButtonCell>
          <ButtonCell label="Mono Uppercase"><PremiumBtn label="Confirm" variant="mono" /></ButtonCell>
          <ButtonCell label="Bottom-ruled"><PremiumBtn label="Continue" variant="ruled" /></ButtonCell>
        </ButtonRow>
        <ButtonRow title="Contextual Tags">
          <ButtonCell label="All (active)"><TagBtn label="All Assets" active /></ButtonCell>
          <ButtonCell label="Crypto"><TagBtn label="Crypto" /></ButtonCell>
          <ButtonCell label="Stocks"><TagBtn label="Stocks" /></ButtonCell>
          <ButtonCell label="Forex"><TagBtn label="Forex" /></ButtonCell>
          <ButtonCell label="ETFs"><TagBtn label="ETFs" /></ButtonCell>
          <ButtonCell label="Options"><TagBtn label="Options" /></ButtonCell>
        </ButtonRow>
        <ButtonRow title="Full-width CTA">
          <div className="w-full max-w-sm">
            <button
              className={`${base} w-full bg-primary text-primary-foreground rounded-md hover:opacity-90 active:scale-[0.99]`}
              style={{ height: "48px", fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              <TrendingUp size={16} /> Buy BTC — $43,218.50
            </button>
          </div>
        </ButtonRow>
      </section>

      {/* ── 10. Customization Playground ──────────── */}
      <section className="mb-20">
        <SectionHeader label="10 — Playground" title="Customization Area" description="Empty containers and wireframe placeholders for designer experimentation. Replace colors, radius, typography, and shadows freely." />
        <ButtonRow title="Empty Placeholder Buttons">
          <ButtonCell label="[color]"><WireframeBtn label="Button Text" dashed /></ButtonCell>
          <ButtonCell label="[outline]"><WireframeBtn label="Button Text" /></ButtonCell>
          <ButtonCell label="[lg]">
            <WireframeBtn label="Button Text — Large" />
          </ButtonCell>
          <ButtonCell label="[sm]">
            <button style={{ height: "28px", padding: "0 12px", fontSize: "12px", fontFamily: "var(--font-mono)", background: "transparent", border: "1.5px dashed #c4c4cc", borderRadius: "4px", color: "#9999aa", cursor: "pointer" }}>
              Small
            </button>
          </ButtonCell>
        </ButtonRow>
        <ButtonRow title="Empty Button Containers">
          <ButtonCell label="44px tall"><EmptyBox w={160} h={44} label="44px height" /></ButtonCell>
          <ButtonCell label="36px tall"><EmptyBox w={140} h={36} label="36px height" /></ButtonCell>
          <ButtonCell label="28px tall"><EmptyBox w={120} h={28} label="28px height" /></ButtonCell>
          <ButtonCell label="Icon 36"><EmptyBox w={36} h={36} label="icon sq" /></ButtonCell>
          <ButtonCell label="Icon 44"><EmptyBox w={44} h={44} label="icon sq" /></ButtonCell>
          <ButtonCell label="Pill"><EmptyBox w={160} h={36} label="pill shape" /></ButtonCell>
          <ButtonCell label="Full Width"><EmptyBox w={320} h={48} label="full width CTA" /></ButtonCell>
        </ButtonRow>
        <ButtonRow title="Wireframe Annotation Layer">
          <div className="w-full">
            <div
              className="rounded-lg p-6 grid gap-4"
              style={{ background: "#fff", border: "1px solid #e2e2e6" }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaaabc", letterSpacing: "0.06em" }} className="uppercase">Annotation layer — replace with final design</p>
              <div className="flex flex-wrap items-end gap-6">
                {["Primary CTA", "Secondary", "Destructive", "Success", "Loading", "Disabled"].map((lbl) => (
                  <div key={lbl} className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: 120, height: 36,
                        border: "1.5px dashed #c4c4cc",
                        borderRadius: "6px",
                        background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(180,180,200,0.06) 4px, rgba(180,180,200,0.06) 8px)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#c4c4cc", letterSpacing: "0.04em" }}>{lbl.toUpperCase()}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#c4c4cc", letterSpacing: "0.04em" }}>{lbl}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {["radius: 0", "radius: 4px", "radius: 6px", "radius: 8px", "radius: 12px", "radius: 9999px"].map((r) => {
                  const v = r.split(": ")[1];
                  return (
                    <div key={r} className="flex flex-col items-center gap-1">
                      <div style={{ width: 80, height: 30, border: "1.5px dashed #c4c4cc", borderRadius: v === "9999px" ? "9999px" : v, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#c4c4cc" }}>{v}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ButtonRow>
      </section>
    </div>
  );
}
