import { HomeNav } from "./HomeNav";
import { Link } from "react-router";
import { ArrowRight, CheckCircle2, Clock, AlertCircle, BookOpen, Layers, LifeBuoy, GitCommit, ChevronRight } from "lucide-react";

const STATUS_CARDS = [
  {
    area: "Button System",
    status: "complete",
    label: "Complete",
    description: "Primary, secondary, ghost, icon, trading, and state variants are fully documented.",
    progress: 100,
  },
  {
    area: "Typography",
    status: "in-progress",
    label: "In Progress",
    description: "Type scale and hierarchy definitions are being finalized for desktop and responsive viewports.",
    progress: 55,
  },
  {
    area: "Color System",
    status: "in-progress",
    label: "In Progress",
    description: "Semantic color tokens and dark-mode palette are under active development.",
    progress: 40,
  },
  {
    area: "Form Components",
    status: "planned",
    label: "Planned",
    description: "Input fields, selects, checkboxes, and validation states will be added in the next sprint.",
    progress: 5,
  },
  {
    area: "Data Grid",
    status: "planned",
    label: "Planned",
    description: "Order book, position table, and market-data grid patterns are scoped for Q3.",
    progress: 0,
  },
  {
    area: "Chart Primitives",
    status: "planned",
    label: "Planned",
    description: "Candlestick, depth chart, and P&L sparkline components are being designed.",
    progress: 0,
  },
];

const GUIDES = [
  {
    icon: <BookOpen size={16} />,
    title: "Installation Guide",
    description: "Set up the EUKK TRADE design system in your local development environment from scratch.",
    tag: "Setup",
    tagColor: "#3b82f6",
    href: "#guides",
  },
  {
    icon: <Layers size={16} />,
    title: "Development Guide",
    description: "Component API reference, theming tokens, and contribution conventions for engineers.",
    tag: "Dev",
    tagColor: "#8b5cf6",
    href: "#guides",
  },
  {
    icon: <BookOpen size={16} />,
    title: "Design Guide",
    description: "Visual language principles, spacing system, and usage guidelines for the full component library.",
    tag: "UI",
    tagColor: "#16a34a",
    href: "/design-system",
    highlight: true,
  },
];

const CHANGELOG = [
  { date: "2026-06-07", version: "v0.3.0", message: "Added Trading buttons, States documentation, and Variations section." },
  { date: "2026-05-20", version: "v0.2.1", message: "Introduced Shape tokens and border-radius rules." },
  { date: "2026-05-10", version: "v0.2.0", message: "Secondary, Ghost, and Icon button specs merged." },
  { date: "2026-04-28", version: "v0.1.0", message: "Initial release — Primary button documentation and design system scaffolding." },
];

const OVERVIEW_ITEMS = [
  { label: "Design Language", value: "Neutral Fintech", sub: "Dark-first, density-aware" },
  { label: "Component Coverage", value: "6 / 18", sub: "Sections documented" },
  { label: "Token Count", value: "42", sub: "CSS custom properties" },
  { label: "Target Platform", value: "Desktop", sub: "1440px primary breakpoint" },
];

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    complete: "#16a34a",
    "in-progress": "#f59e0b",
    planned: "#6b7280",
  };
  return (
    <span
      style={{
        display: "inline-block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: colors[status] ?? "#6b7280",
        flexShrink: 0,
      }}
    />
  );
}

function StatusBadge({ status, label }: { status: string; label: string }) {
  const styles: Record<string, { color: string; bg: string }> = {
    complete: { color: "#16a34a", bg: "rgba(22,163,74,0.1)" },
    "in-progress": { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    planned: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  };
  const s = styles[status] ?? styles.planned;
  return (
    <span
      style={{
        fontSize: "11px",
        fontFamily: "'JetBrains Mono', monospace",
        color: s.color,
        background: s.bg,
        padding: "2px 8px",
        borderRadius: "3px",
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        letterSpacing: "0.1em",
        color: "#555566",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0" }} />;
}

export function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08080a",
        color: "#f8f8f9",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <HomeNav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          paddingTop: "160px",
          paddingBottom: "120px",
          paddingLeft: "48px",
          paddingRight: "48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              marginBottom: "32px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", color: "#9999aa", fontFamily: "'JetBrains Mono', monospace" }}>
              v0.3.0 — Active Development
            </span>
          </div>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#f8f8f9",
              margin: "0 0 24px",
            }}
          >
            EUKK TRADE
            <br />
            <span style={{ color: "#444455" }}>Design System</span>
          </h1>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#6b6b7a",
              margin: "0 0 40px",
              maxWidth: "520px",
            }}
          >
            EukkTrade의 인터페이스 품질을 유지하기 위한 공식 UI 가이드라인입니다.
            컴포넌트 명세, 디자인 토큰, 인터랙션 원칙을 포함합니다.
          </p>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link
              to="/design-system"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#08080a",
                background: "#f8f8f9",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Design Guide 열기
              <ArrowRight size={14} />
            </Link>
            <a
              href="#overview"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#9999aa",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#f8f8f9";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#9999aa";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
            >
              시스템 둘러보기
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SYSTEM OVERVIEW ───────────────────────────────────── */}
      <section
        id="overview"
        style={{
          padding: "80px 48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "48px" }}>
          <SectionLabel>System Overview</SectionLabel>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#f8f8f9",
              margin: "8px 0 6px",
            }}
          >
            시스템 현황
          </h2>
          <p style={{ fontSize: "13px", color: "#555566" }}>
            현재 문서화된 컴포넌트와 디자인 토큰의 전체 현황입니다.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {OVERVIEW_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                background: "#0d0d10",
                padding: "32px 28px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#555566", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em", marginBottom: "12px" }}>
                {item.label.toUpperCase()}
              </div>
              <div style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.02em", color: "#f8f8f9", lineHeight: 1 }}>
                {item.value}
              </div>
              <div style={{ fontSize: "12px", color: "#555566", marginTop: "6px" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── DEVELOPMENT STATUS ────────────────────────────────── */}
      <section
        id="status"
        style={{
          padding: "80px 48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "48px" }}>
          <SectionLabel>Development Status</SectionLabel>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#f8f8f9",
              margin: "8px 0 6px",
            }}
          >
            개발 현황
          </h2>
          <p style={{ fontSize: "13px", color: "#555566" }}>
            컴포넌트별 문서화 진행 상황을 확인하세요.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {STATUS_CARDS.map((card) => (
            <div
              key={card.area}
              style={{
                background: "#0d0d10",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <StatusDot status={card.status} />
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#dddde8" }}>{card.area}</span>
                </div>
                <StatusBadge status={card.status} label={card.label} />
              </div>
              <p style={{ fontSize: "12px", lineHeight: 1.6, color: "#555566", margin: 0 }}>{card.description}</p>
              <div style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "10px", color: "#444455", fontFamily: "'JetBrains Mono', monospace" }}>PROGRESS</span>
                  <span style={{ fontSize: "10px", color: "#444455", fontFamily: "'JetBrains Mono', monospace" }}>{card.progress}%</span>
                </div>
                <div style={{ height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${card.progress}%`,
                      background: card.status === "complete" ? "#16a34a" : card.status === "in-progress" ? "#f59e0b" : "#333344",
                      borderRadius: "2px",
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── GUIDES ────────────────────────────────────────────── */}
      <section
        id="guides"
        style={{
          padding: "80px 48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "48px" }}>
          <SectionLabel>Guides</SectionLabel>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#f8f8f9",
              margin: "8px 0 6px",
            }}
          >
            문서 가이드
          </h2>
          <p style={{ fontSize: "13px", color: "#555566" }}>
            설치부터 컴포넌트 사용까지 단계별 가이드를 제공합니다.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {GUIDES.map((guide) => (
            guide.highlight ? (
              <Link
                key={guide.title}
                to={guide.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  padding: "28px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#0d0d10",
                  textDecoration: "none",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
                  (e.currentTarget as HTMLElement).style.background = "#111114";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.background = "#0d0d10";
                }}
              >
                <GuideCardInner guide={guide} />
              </Link>
            ) : (
              <a
                key={guide.title}
                href={guide.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  padding: "28px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "#0d0d10",
                  textDecoration: "none",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.background = "#111114";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.background = "#0d0d10";
                }}
              >
                <GuideCardInner guide={guide} />
              </a>
            )
          ))}
        </div>
      </section>

      <Divider />

      {/* ── DESIGN SYSTEM PREVIEW ─────────────────────────────── */}
      <section
        id="design-preview"
        style={{
          padding: "80px 48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "48px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <SectionLabel>Design System Preview</SectionLabel>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#f8f8f9",
                margin: "8px 0 6px",
              }}
            >
              컴포넌트 미리보기
            </h2>
            <p style={{ fontSize: "13px", color: "#555566" }}>
              버튼 컴포넌트 시스템의 핵심 구성 요소입니다.
            </p>
          </div>
          <Link
            to="/design-system"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#6b6b7a",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f8f8f9")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b7a")}
          >
            전체 가이드 보기 <ChevronRight size={12} />
          </Link>
        </div>

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Preview header */}
          <div
            style={{
              padding: "14px 20px",
              background: "#0a0a0d",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            <span style={{ marginLeft: "12px", fontSize: "11px", color: "#444455", fontFamily: "'JetBrains Mono', monospace" }}>
              Button System — Preview
            </span>
          </div>

          {/* Button showcase */}
          <div
            style={{
              padding: "40px",
              background: "#0d0d10",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            {/* Row 1: Primary variants */}
            <PreviewRow label="Primary">
              <PreviewBtn style={{ background: "#f8f8f9", color: "#08080a", border: "none" }}>확인</PreviewBtn>
              <PreviewBtn style={{ background: "#f8f8f9", color: "#08080a", border: "none" }} disabled>비활성</PreviewBtn>
              <PreviewBtn style={{ background: "rgba(248,248,249,0.12)", color: "#f8f8f9", border: "1px solid rgba(255,255,255,0.15)" }}>보조</PreviewBtn>
            </PreviewRow>

            {/* Row 2: Trading */}
            <PreviewRow label="Trading">
              <PreviewBtn style={{ background: "#16a34a", color: "#fff", border: "none", letterSpacing: "0.02em" }}>BUY</PreviewBtn>
              <PreviewBtn style={{ background: "#c8102e", color: "#fff", border: "none", letterSpacing: "0.02em" }}>SELL</PreviewBtn>
              <PreviewBtn style={{ background: "rgba(255,255,255,0.06)", color: "#9999aa", border: "1px solid rgba(255,255,255,0.08)" }}>취소</PreviewBtn>
            </PreviewRow>

            {/* Row 3: States */}
            <PreviewRow label="States">
              <PreviewBtn style={{ background: "transparent", color: "#9999aa", border: "1px solid rgba(255,255,255,0.1)" }}>기본</PreviewBtn>
              <PreviewBtn style={{ background: "rgba(255,255,255,0.07)", color: "#f8f8f9", border: "1px solid rgba(255,255,255,0.14)" }}>호버</PreviewBtn>
              <PreviewBtn style={{ background: "rgba(255,255,255,0.04)", color: "#555566", border: "1px solid rgba(255,255,255,0.06)", cursor: "not-allowed" }}>비활성</PreviewBtn>
            </PreviewRow>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SUPPORT ───────────────────────────────────────────── */}
      <section
        id="support"
        style={{
          padding: "80px 48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <SectionLabel>Support</SectionLabel>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#f8f8f9",
              margin: "8px 0 6px",
            }}
          >
            도움이 필요하신가요?
          </h2>
          <p style={{ fontSize: "13px", color: "#555566" }}>
            디자인 시스템에 대한 문의사항이나 기여 방법을 안내해 드립니다.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            {
              icon: <LifeBuoy size={18} />,
              title: "디자인팀 문의",
              desc: "컴포넌트 사용 방법이나 디자인 의사결정에 대한 질문은 디자인팀 채널로 연락해 주세요.",
            },
            {
              icon: <GitCommit size={18} />,
              title: "기여하기",
              desc: "새로운 컴포넌트 제안이나 문서 수정은 내부 리포지토리의 이슈 트래커를 통해 등록해 주세요.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "28px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "#0d0d10",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ color: "#6b6b7a" }}>{item.icon}</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#dddde8" }}>{item.title}</div>
              <p style={{ fontSize: "12px", lineHeight: 1.65, color: "#555566", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── CHANGELOG ─────────────────────────────────────────── */}
      <section
        id="changelog"
        style={{
          padding: "80px 48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <SectionLabel>Changelog</SectionLabel>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#f8f8f9",
              margin: "8px 0 6px",
            }}
          >
            변경 이력
          </h2>
          <p style={{ fontSize: "13px", color: "#555566" }}>
            디자인 시스템의 주요 업데이트 내역입니다.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {CHANGELOG.map((entry, i) => (
            <div
              key={entry.version}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 80px 1fr",
                gap: "24px",
                alignItems: "baseline",
                padding: "20px 0",
                borderBottom: i < CHANGELOG.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              <span style={{ fontSize: "11px", color: "#444455", fontFamily: "'JetBrains Mono', monospace" }}>
                {entry.date}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#6b6b7a",
                  fontFamily: "'JetBrains Mono', monospace",
                  background: "rgba(255,255,255,0.04)",
                  padding: "2px 8px",
                  borderRadius: "3px",
                  display: "inline-block",
                }}
              >
                {entry.version}
              </span>
              <span style={{ fontSize: "13px", color: "#9999aa", lineHeight: 1.5 }}>{entry.message}</span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "48px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#3a3a4a", letterSpacing: "-0.01em" }}>
            EUKK TRADE
          </span>
          <span style={{ fontSize: "11px", color: "#333344", fontFamily: "'JetBrains Mono', monospace" }}>
            Design System v0.3.0
          </span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link to="/design-system" style={{ fontSize: "12px", color: "#3a3a4a", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9999aa")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#3a3a4a")}
          >
            Design Guide
          </Link>
          <span style={{ fontSize: "12px", color: "#222233" }}>내부 문서 — 배포 금지</span>
        </div>
      </footer>
    </div>
  );
}

function GuideCardInner({ guide }: { guide: typeof GUIDES[number] }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: "#555566" }}>{guide.icon}</div>
        <span
          style={{
            fontSize: "10px",
            fontFamily: "'JetBrains Mono', monospace",
            color: guide.tagColor,
            background: `${guide.tagColor}1a`,
            padding: "2px 8px",
            borderRadius: "3px",
          }}
        >
          {guide.tag}
        </span>
      </div>
      <div>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "#dddde8", marginBottom: "8px" }}>{guide.title}</div>
        <p style={{ fontSize: "12px", lineHeight: 1.65, color: "#555566", margin: 0 }}>{guide.description}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#444455", marginTop: "auto" }}>
        <span>자세히 보기</span>
        <ChevronRight size={11} />
      </div>
    </>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
      <span
        style={{
          width: "80px",
          flexShrink: 0,
          fontSize: "11px",
          color: "#444455",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.04em",
        }}
      >
        {label.toUpperCase()}
      </span>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>{children}</div>
    </div>
  );
}

function PreviewBtn({
  children,
  style,
  disabled,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      style={{
        padding: "7px 16px",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Inter', sans-serif",
        transition: "opacity 0.15s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
