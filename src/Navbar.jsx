// --- Navbar (replace your current <header> ... </header> block) ---
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Track scroll position to highlight active link
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const onScroll = () => {
      let current = "home";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Home", "home"],
    ["About", "about"],
    ["Skills", "skills"],
    ["Projects", "projects"],
    ["Education", "education"],
    ["Certifications", "certs"],
    ["Contact", "contact"],
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-extrabold tracking-tight text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          HP.dev
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {links.map(([label, id]) => (
            <motion.a
              key={id}
              href={`#${id}`}
              whileHover={{ scale: 1.1 }}
              className={`relative transition ${
                active === id ? "text-indigo-400" : "text-white/70"
              }`}
            >
              {label}
              {active === id && (
                <motion.span
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full"
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-black/80 backdrop-blur border-t border-white/10 px-6 py-4 space-y-4"
        >
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className={`block text-base ${
                active === id ? "text-indigo-400" : "text-white/70"
              }`}
            >
              {label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;
