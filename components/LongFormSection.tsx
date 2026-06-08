const VIDEOS = [
  {
    title: "The Creative Process",
    category: "Documentary",
    duration: "12:34",
    gradient: "from-blue-950 via-indigo-950 to-slate-950",
    views: "24K views",
  },
  {
    title: "Summer Brand Campaign",
    category: "Commercial",
    duration: "3:20",
    gradient: "from-amber-950 via-yellow-950 to-slate-950",
    views: "18K views",
  },
  {
    title: "Wedding Cinematic Film",
    category: "Cinematic",
    duration: "8:15",
    gradient: "from-rose-950 via-red-950 to-slate-950",
    views: "41K views",
  },
  {
    title: "Corporate Event Recap",
    category: "Corporate",
    duration: "5:47",
    gradient: "from-emerald-950 via-cyan-950 to-slate-950",
    views: "9K views",
  },
  {
    title: "Music Video — Echoes",
    category: "Music Video",
    duration: "4:02",
    gradient: "from-violet-950 via-purple-950 to-slate-950",
    views: "62K views",
  },
  {
    title: "Travel Reel — Rajasthan",
    category: "Travel",
    duration: "6:30",
    gradient: "from-orange-950 via-amber-950 to-slate-950",
    views: "33K views",
  },
];

export default function LongFormSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-4">
          <span className="h-px w-12 bg-blue-500/50" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400">
            Long Form
          </span>
        </div>
        <div className="mb-14 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-4xl font-black text-white md:text-5xl">
            Films &amp; Commercials
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/35">
            Full-length cinematic productions that tell the full story.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v) => (
            <div
              key={v.title}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-white/3"
              style={{ aspectRatio: "16/9" }}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient}`} />

              {/* Noise texture */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />

              {/* Play button — appears on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 translate-x-0.5 text-white"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Top-right duration badge */}
              <div className="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white/70 backdrop-blur-sm">
                {v.duration}
              </div>

              {/* Bottom info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-8">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white/60">
                    {v.category}
                  </span>
                  <span className="text-[10px] text-white/35">{v.views}</span>
                </div>
                <p className="text-sm font-semibold text-white">{v.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
