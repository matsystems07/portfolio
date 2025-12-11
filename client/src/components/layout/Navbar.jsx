import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition"
        >
          MAT SYSTEMS
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive ? "text-teal-400" : "text-gray-300 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* ✅ FIXED DESKTOP CHATBOT BUTTON */}
          <button
            className="px-4 py-2 text-sm rounded-md bg-teal-500 hover:bg-teal-400 transition font-medium"
            onClick={() => {
              const btn = document.querySelector('.chatbot-toggle');
              btn?.click();
            }}
          >
            Chatbot
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/90 px-4 pb-4 flex flex-col gap-4 border-t border-white/10">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white text-sm"
            >
              {item.label}
            </NavLink>
          ))}

          {/* ✅ FIXED MOBILE CHATBOT BUTTON */}
          <button
            onClick={() => {
              const btn = document.querySelector('.chatbot-toggle');
              btn?.click();
              setOpen(false);
            }}
            className="px-4 py-2 text-sm rounded-md bg-teal-500 hover:bg-teal-400 transition font-medium w-fit"
          >
            Chatbot
          </button>
        </div>
      )}
    </nav>
  );
}
