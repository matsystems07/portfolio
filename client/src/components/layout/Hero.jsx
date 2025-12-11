export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-black to-black opacity-70 animate-pulse" />

      {/* Glow Orbs */}
      <div className="absolute w-72 h-72 bg-teal-500/30 blur-[120px] rounded-full -top-20 -left-20" />
      <div className="absolute w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full bottom-0 right-0" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
          Hi,
        </h1>

        <p className="mt-4 text-xl md:text-2xl text-gray-300">
          We are Full-Stack Developers & AI Engineers 
        </p>

        <p className="mt-2 text-gray-400 text-sm md:text-base">
          Building high-performance SaaS platforms and custom AI systems.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="/projects"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-lg transition shadow-md"
          >
            View Projects
          </a>

          <a
            href="/contact"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
