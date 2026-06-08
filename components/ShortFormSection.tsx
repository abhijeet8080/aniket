const VIDEOS = [
  {
    title: "Brand Reel 2024",
    platform: "Instagram",
    duration: "0:28",
    gradient: "from-violet-950 via-blue-950 to-slate-950",
    accent: "#818cf8",
  },
  {
    title: "Product Launch",
    platform: "TikTok",
    duration: "0:45",
    gradient: "from-rose-950 via-pink-950 to-slate-950",
    accent: "#fb7185",
  },
  {
    title: "Event Highlights",
    platform: "YouTube Shorts",
    duration: "0:58",
    gradient: "from-amber-950 via-orange-950 to-slate-950",
    accent: "#fb923c",
  },
  {
    title: "Artist Promo",
    platform: "Instagram",
    duration: "0:33",
    gradient: "from-emerald-950 via-teal-950 to-slate-950",
    accent: "#34d399",
  },
];

const PLATFORM_COLORS: Record<string, string> = {
  Instagram: "#e1306c",
  TikTok: "#69c9d0",
  "YouTube Shorts": "#ff0000",
};

export default function ShortFormSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-4">
          <span className="h-px w-12 bg-blue-500/50" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400">
            Short Form
          </span>
        </div>
        <div className="mb-14 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-4xl font-black text-white md:text-5xl">
            Reels &amp; Stories
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/35">
            Scroll-stopping vertical content crafted for social platforms.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {VIDEOS.map((v) => (
            <div
              key={v.title}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-white/3"
              style={{ aspectRatio: "9/16" }}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-b ${v.gradient}`} />

              {/* Noise texture */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
                }}
              />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 translate-x-0.5 text-white"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                    style={{ background: PLATFORM_COLORS[v.platform] + "33", color: PLATFORM_COLORS[v.platform] }}
                  >
                    {v.platform}
                  </span>
                  <span className="text-[10px] text-white/40">{v.duration}</span>
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{v.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
