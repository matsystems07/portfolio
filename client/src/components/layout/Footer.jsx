export default function Footer() {
  return (
    <footer className="mt-20 py-10 bg-black/40 border-t border-white/10 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto text-center text-gray-400">

        {/* Social Links */}
        <div className="flex justify-center gap-8 mb-6 text-lg">
          <a href="https://github.com/matsystems07" target="_blank" className="hover:text-teal-400 transition">GitHub</a>
          <a href="https://linkedin.com/" target="_blank" className="hover:text-teal-400 transition">LinkedIn</a>
          <a href="mailto:matsystems07@gmail.com" className="hover:text-teal-400 transition">Email</a>
        </div>

        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} MAT Systems. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
