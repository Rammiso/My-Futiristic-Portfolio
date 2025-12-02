import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { IoMenu, IoClose, IoSunny, IoMoon } from "react-icons/io5";
import { NAV_LINKS } from "@utils/constants.js";

// Throttle utility for scroll performance
const throttle = (func, delay) => {
  let timeoutId;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (Date.now() - lastRan >= delay) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
};

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolling, setIsScrolling] = useState(false);

  // Optimized scroll handler with throttling
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, 100); // Throttle to 100ms

    // Detect scroll start/end for performance
    let scrollTimeout;
    const handleScrollStart = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScrollStart, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollStart);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Main Navbar - Optimized */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-dark backdrop-blur-xl border-b border-neon-green/30 shadow-lg shadow-neon-green/10 h-16"
            : "bg-transparent backdrop-blur-sm h-20"
        }`}
        style={{ willChange: isScrolling ? "transform, opacity" : "auto" }}
      >
        {/* Neon Top Edge */}
        {isScrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"
          />
        )}

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.1) 2px, rgba(57, 255, 20, 0.1) 4px)",
            }}
          />
        </div>

        <div className="container-custom h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              to="hero"
              smooth={true}
              duration={300}
              className="cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
                style={{ willChange: "transform" }}
              >
                {/* Logo Glow */}
                <motion.div
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-2 bg-neon-green/20 blur-xl rounded-full"
                />

                {/* Logo Text */}
                <div className="relative flex items-center gap-2">
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-2xl md:text-3xl font-bold"
                  >
                    <span className="text-gradient">Musab</span>
                    <span className="text-neon-green">.</span>
                  </motion.div>

                  {/* Status Indicator */}
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-neon-green rounded-full hidden md:block"
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.id}
                  to={link.id}
                  smooth={true}
                  duration={300}
                  spy={true}
                  offset={-80}
                  hashSpy={false}
                  onSetActive={() => setActiveSection(link.id)}
                  className="relative group cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="relative"
                  >
                    {/* Link Text */}
                    <span
                      className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                        activeSection === link.id
                          ? "text-neon-green"
                          : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {link.label}
                    </span>

                    {/* Hover Glow Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute -inset-2 bg-neon-green/10 blur-md rounded -z-10"
                    />

                    {/* Active/Hover Underline */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: activeSection === link.id ? 1 : 0,
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute -bottom-1 left-0 right-0 h-px ${
                        activeSection === link.id
                          ? "bg-neon-green shadow-sm shadow-neon-green"
                          : "bg-white/50"
                      }`}
                      style={{ originX: 0.5 }}
                    />

                    {/* Active Indicator */}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-neon-green rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}

              {/* Desktop Theme Toggle */}
              {/* <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} /> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              {/* <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} /> */}

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-3 glass border border-neon-green/30 rounded-lg hover:border-neon-green/60 transition-colors group"
                aria-label="Toggle mobile menu"
              >
                {/* Button Glow */}
                <div className="absolute inset-0 bg-neon-green/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur" />

                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoClose className="w-5 h-5 text-neon-green relative z-10" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoMenu className="w-5 h-5 text-neon-green relative z-10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Corner Brackets */}
        {isScrolled && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="absolute top-2 left-4 w-8 h-8 border-l border-t border-neon-green/50"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="absolute top-2 right-4 w-8 h-8 border-r border-t border-neon-cyan/50"
            />
          </>
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed top-[80px] right-0 bottom-0 w-80 glass-dark border-l border-neon-green/30 shadow-2xl z-50 lg:hidden overflow-hidden"
            >
              {/* Neon Edge */}
              <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-neon-green via-neon-cyan to-neon-pink" />

              {/* Scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-5">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.1) 2px, rgba(57, 255, 20, 0.1) 4px)",
                  }}
                />
              </div>

              {/* Menu Content */}
              <div className="relative p-8 space-y-6">
                {/* Menu Header */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-neon-green uppercase tracking-wider">
                    Navigation
                  </span>
                </div>

                {/* Menu Links */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {NAV_LINKS.map((link) => (
                    <motion.div
                      key={link.id}
                      variants={{
                        hidden: { opacity: 0, x: 50 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        to={link.id}
                        smooth={true}
                        duration={300}
                        spy={true}
                        offset={-80}
                        hashSpy={false}
                        onClick={closeMobileMenu}
                        className="block group cursor-pointer"
                      >
                        <motion.div
                          whileHover={{ x: 10 }}
                          className="relative py-3 px-4 rounded-lg glass border border-transparent hover:border-neon-green/30 transition-all"
                        >
                          {/* Active Indicator */}
                          {activeSection === link.id && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="absolute left-0 top-0 bottom-0 w-1 bg-neon-green rounded-r"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}

                          <span
                            className={`text-base font-medium uppercase tracking-wider transition-colors ${
                              activeSection === link.id
                                ? "text-neon-green"
                                : "text-white/70 group-hover:text-white"
                            }`}
                          >
                            {link.label}
                          </span>

                          {/* Hover Glow */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-neon-green/5 rounded-lg blur -z-10"
                          />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* HUD Info */}
                <div className="pt-8 mt-8 border-t border-white/10">
                  <div className="text-xs font-mono text-white/40 space-y-1">
                    <div>STATUS: ONLINE</div>
                    <div>MODE: {theme.toUpperCase()}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Theme Toggle Button Component
// const ThemeToggleButton = ({ theme, toggleTheme }) => {
//   return (
//     <motion.button
//       onClick={toggleTheme}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className="relative p-3 glass border border-neon-cyan/30 rounded-lg hover:border-neon-cyan/60 transition-colors group overflow-hidden"
//       aria-label="Toggle theme"
//     >
//       {/* Background Glow */}
//       <motion.div
//         animate={{
//           opacity: [0.3, 0.6, 0.3],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-green/20 blur"
//       />

//       {/* Icon Container */}
//       <div className="relative w-5 h-5">
//         <AnimatePresence mode="wait">
//           {theme === "dark" ? (
//             <motion.div
//               key="moon"
//               initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
//               animate={{ rotate: 0, opacity: 1, scale: 1 }}
//               exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
//               transition={{ duration: 0.3 }}
//               className="absolute inset-0"
//             >
//               <IoMoon className="w-5 h-5 text-neon-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="sun"
//               initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
//               animate={{ rotate: 0, opacity: 1, scale: 1 }}
//               exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
//               transition={{ duration: 0.3 }}
//               className="absolute inset-0"
//             >
//               <IoSunny className="w-5 h-5 text-neon-yellow drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Rotating Ring */}
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//         className="absolute inset-0 border border-neon-cyan/20 rounded-lg"
//       />
//     </motion.button>
//   );
// };

export default Navbar;
