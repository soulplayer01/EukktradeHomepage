import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import logoImage from "../../imports/image.png";

const GUIDES = [
  { label: "Installation Guide", href: "#guides" },
  { label: "Development Guide", href: "#guides" },
  { label: "Design Guide", href: "/design-system", external: false, highlight: true },
];

export function HomeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGuidesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 48px",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,9,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <img src={logoImage} alt="EUKK TRADE" style={{ width: "22px", height: "22px", borderRadius: "4px", objectFit: "contain", flexShrink: 0 }} />
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#f8f8f9", letterSpacing: "-0.01em" }}>
          EUKK TRADE
        </span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <NavAnchor href="#overview">System Overview</NavAnchor>
        <NavAnchor href="#status">Development Status</NavAnchor>

        {/* Guides dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setGuidesOpen((v) => !v)}
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "6px 12px", borderRadius: "6px",
              fontSize: "13px", fontWeight: 500,
              color: guidesOpen ? "#f8f8f9" : "#9999aa",
              background: guidesOpen ? "rgba(255,255,255,0.07)" : "transparent",
              border: "none", cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!guidesOpen) {
                e.currentTarget.style.color = "#f8f8f9";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }
            }}
            onMouseLeave={(e) => {
              if (!guidesOpen) {
                e.currentTarget.style.color = "#9999aa";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            Guides
            <ChevronDown
              size={13}
              style={{ transform: guidesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
            />
          </button>

          {guidesOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                background: "#111113",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "6px",
                minWidth: "200px",
                boxShadow: "0 20px 48px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)",
                zIndex: 100,
              }}
            >
              {GUIDES.map((item) =>
                item.highlight ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setGuidesOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "8px 12px", borderRadius: "6px",
                      fontSize: "13px", color: "#c4c4cc", textDecoration: "none",
                      fontFamily: "'Inter', sans-serif", transition: "all 0.1s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f8f8f9"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#c4c4cc"; e.currentTarget.style.background = "transparent"; }}
                  >
                    {item.label}
                    <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "#16a34a", background: "rgba(22,163,74,0.12)", padding: "2px 6px", borderRadius: "3px" }}>
                      UI Guide
                    </span>
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setGuidesOpen(false)}
                    style={{
                      display: "block", padding: "8px 12px", borderRadius: "6px",
                      fontSize: "13px", color: "#9999aa", textDecoration: "none",
                      fontFamily: "'Inter', sans-serif", transition: "all 0.1s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f8f8f9"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#9999aa"; e.currentTarget.style.background = "transparent"; }}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      {/* CTA */}
      <Link
        to="/design-system"
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "7px 16px", borderRadius: "6px",
          fontSize: "13px", fontWeight: 500,
          color: "#f8f8f9",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          textDecoration: "none",
          fontFamily: "'Inter', sans-serif",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
      >
        Design Guide →
      </Link>
    </header>
  );
}

function NavAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: "6px 12px", borderRadius: "6px",
        fontSize: "13px", fontWeight: 500,
        color: "#9999aa", textDecoration: "none",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#f8f8f9"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "#9999aa"; e.currentTarget.style.background = "transparent"; }}
    >
      {children}
    </a>
  );
}
