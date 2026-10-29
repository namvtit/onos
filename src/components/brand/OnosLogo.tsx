export function OnosLogoSymbol({ size = 38, className = "", isDark = false }: { size?: number; className?: string; isDark?: boolean }) {
  return (
    <svg
      className={`onos-ref-logo ${className}`}
      viewBox="-46 -46 92 92"
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}
    >
      <g style={{ isolation: "isolate" }} transform="rotate(-20)">
        <path
          d="M-10.5 -11.81Q0 -30 10.5 -11.81L15.48 -3.19Q25.98 15 4.98 15L-4.98 15Q-25.98 15 -15.48 -3.19Z"
          fill="#F5D200"
          style={{ mixBlendMode: isDark ? "screen" : "multiply" }}
          transform="translate(0 -13) scale(1.25 1)"
        />
        <path
          d="M-10.5 -11.81Q0 -30 10.5 -11.81L15.48 -3.19Q25.98 15 4.98 15L-4.98 15Q-25.98 15 -15.48 -3.19Z"
          fill="#E5006D"
          style={{ mixBlendMode: isDark ? "screen" : "multiply" }}
          transform="translate(11.26 6.5) rotate(120) scale(1.25 1)"
        />
        <path
          d="M-10.5 -11.81Q0 -30 10.5 -11.81L15.48 -3.19Q25.98 15 4.98 15L-4.98 15Q-25.98 15 -15.48 -3.19Z"
          fill="#00A3DE"
          style={{ mixBlendMode: isDark ? "screen" : "multiply" }}
          transform="translate(-11.26 6.5) rotate(240) scale(1.25 1)"
        />
      </g>
    </svg>
  );
}

export function OnosWordmark({
  subtext = "GLOBAL",
  size = 38,
  isDark = false,
  className = "",
}: {
  subtext?: string;
  size?: number;
  isDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`wordmark ${isDark ? "wordmark-light" : ""} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        flexShrink: 0,
        textDecoration: "none",
      }}
    >
      <OnosLogoSymbol size={size} isDark={isDark} />
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        <b
          style={{
            fontFamily: 'var(--_typography---font-family--heading, "Mona Sans", sans-serif)',
            fontSize: "1.32rem",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: isDark ? "#ffffff" : "var(--color--dark, #151515)",
            display: "block",
          }}
        >
          ONOS
        </b>
        <small
          style={{
            fontFamily: 'var(--_typography---font-family--heading, "Mona Sans", sans-serif)',
            display: "block",
            fontSize: "0.55rem",
            fontWeight: 700,
            letterSpacing: "0.28em",
            lineHeight: 1.4,
            color: isDark ? "rgba(255, 255, 255, 0.7)" : "var(--color--gray-2, #5c5c5c)",
            textTransform: "uppercase",
            marginTop: "1px",
          }}
        >
          {subtext}
        </small>
      </span>
    </span>
  );
}
