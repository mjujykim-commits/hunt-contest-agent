export function RadarHero() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 70% 40%, rgba(93,255,176,0.12), transparent 55%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(232,168,73,0.14), transparent 50%), linear-gradient(180deg, #050a08 0%, #07140f 45%, #050a08 100%)",
        }}
      />
      <div
        className="absolute -right-[12%] top-[-10%] h-[120vmin] w-[120vmin] opacity-80"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at center, transparent 0, transparent 38px, rgba(237,246,240,0.06) 39px, transparent 40px)",
        }}
      >
        <div className="radar-sweep absolute inset-[8%]">
          <div
            className="h-full w-full"
            style={{
              background:
                "conic-gradient(from 200deg, transparent 0deg, rgba(93,255,176,0.0) 250deg, rgba(93,255,176,0.35) 300deg, transparent 340deg)",
              maskImage:
                "radial-gradient(circle, black 0%, black 62%, transparent 63%)",
            }}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--mint)] shadow-[0_0_24px_#5dffb0]">
          <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--mint)]" />
        </div>
      </div>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
