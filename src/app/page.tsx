import Silk from "@/components/Silk";
import ScrollCue from "@/components/ScrollCue";

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
      {/* HERO SECTION */}
      <section id="hero-section" className="relative h-screen min-h-screen overflow-hidden" >
        {/* Silk Background */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <Silk
            speed={10}
            scale={1}
            color="#343434"
            noiseIntensity={1.5}
            rotation={1.81}
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-[1] bg-black/20" />

        {/* Page Content */}
        <div className="relative z-10 h-full">
          {/* Navbar */}
          <header className="relative flex items-center px-6 py-7 md:px-12">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold tracking-wide">N33.</span>
              <span className="hidden text-xs tracking-[0.35em] text-white/35 md:inline">
                DIGITAL STUDIO
              </span>
            </div>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-white/80 md:flex">
              <a href="#" className="transition hover:text-white">
                Think.
              </a>
              <a href="#" className="transition hover:text-white">
                Design.
              </a>
              <a href="#" className="transition hover:text-white">
                Develop.
              </a>
              <a href="#" className="transition hover:text-white">
                Studio
              </a>
            </nav>

            <div className="ml-auto text-xs text-white/60">11:04 AM</div>
          </header>

          {/* Left Services */}
          <div className="absolute bottom-24 left-6 hidden space-y-6 md:left-12 md:block">
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
          <div className="flex h-[calc(100vh-92px)] flex-col items-center justify-center px-6 pb-24 text-center">
            <div className="mb-4 rounded-full bg-white/10 px-5 py-2 text-[10px] font-bold tracking-[0.35em] text-white/80 backdrop-blur-md">
              YOUR DIGITAL EXPERTS
            </div>

            <h1 className="max-w-6xl text-5xl font-normal leading-[1.05] tracking-[-0.04em] md:text-7xl lg:text-8xl">
              We Build Digital Presence.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 md:text-base">
              N33. creates websites, systems, e-commerce experiences and digital
              tools for brands that want to look sharper and work smarter.
            </p>
          </div>

          {/* Circular Scroll Indicator */}
          <ScrollCue />
        </div>
      </section>

      {/* FOOTER / EMPTY SECTION */}
      <section
        id="footer-section"
        className="relative min-h-screen overflow-hidden border-t border-white/10 bg-black px-6 py-20 md:px-12"
      >
        {/* Top glow, to make the section reveal nicer */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

        <div className="relative z-10 flex min-h-[80vh] items-center justify-center text-center">
          <div>
            <p className="mb-5 text-xs font-bold tracking-[0.45em] text-white/35">
              NEXT SECTION
            </p>

            <h2 className="text-5xl font-normal leading-[1.05] tracking-[-0.04em] md:text-7xl lg:text-8xl">
              This can be your footer.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45 md:text-base">
              Use this area for contact details, company information, selected
              works, or a final call-to-action.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}