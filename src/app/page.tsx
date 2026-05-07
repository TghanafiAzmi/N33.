export default function Home() {
  const services = [
    "WEB DESIGN",
    "BRANDING",
    "E-COMMERCE",
    "SYSTEM DEVELOPMENT",
    "AI AUTOMATION",
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(70,70,120,0.35),transparent_35%),radial-gradient(circle_at_75%_65%,rgba(120,120,160,0.18),transparent_30%),linear-gradient(135deg,#020204_0%,#050509_45%,#0b0b13_100%)]" />

        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[42%_58%_65%_35%/45%_35%_65%_55%] bg-white/5 blur-2xl" />
        <div className="absolute right-[-120px] top-[-120px] h-[520px] w-[520px] rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute bottom-[-160px] left-[-160px] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[120px]" />

        {/* Navbar */}
        <header className="relative z-10 flex items-center px-6 py-7 md:px-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div/>
            <div>
              <span className="text-lg font-bold tracking-wide">N33.</span>
              <span className="ml-3 hidden text-xs tracking-[0.25em] text-white/50 md:inline">
                DIGITAL STUDIO
              </span>
            </div>
          </div>

          {/* Center Nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-white/80 md:flex">
            <a href="#" className="transition hover:text-white">Think.</a>
            <a href="#" className="transition hover:text-white">Design.</a>
            <a href="#" className="transition hover:text-white">Develop.</a>
            <a href="#" className="transition hover:text-white">Studio</a>
          </nav>

          {/* Right Time */}
          <div className="ml-auto text-xs text-white/60">11:04 AM</div>
        </header>

        {/* Left Services */}
        <div className="absolute bottom-24 left-6 z-10 hidden space-y-6 md:left-12 md:block">
          {services.map((item) => (
            <div
              key={item}
              className="text-xs font-bold tracking-[0.28em] text-white/90"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Center Content */}
{/* Center Content */}
<div className="relative z-10 flex min-h-[72vh] flex-col items-center justify-center px-6 text-center">
  <div className="mb-4 rounded-full bg-white/10 px-5 py-2 text-[10px] font-bold tracking-[0.35em] text-white/80 backdrop-blur-md">
    I · V CORE SERVICES
  </div>

  <h1 className="max-w-6xl text-5xl font-light md:text-7xl lg:text-8xl">
    We build digital presence.
  </h1>

  <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 md:text-base">
    N33. creates websites, systems, e-commerce experiences and digital
    tools for brands that want to look sharper and work smarter.
  </p>
</div>

        {/* CTA */}
        <a
          href="#"
          className="absolute bottom-10 right-6 z-10 rounded-full border border-white/70 px-6 py-3 text-sm text-white transition hover:bg-white hover:text-black md:right-12"
        >
          Are you ready?
        </a>
      </section>
    </main>
  );
}