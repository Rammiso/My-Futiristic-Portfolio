import { motion } from "framer-motion";
import { IoSunny, IoMoon } from "react-icons/io5";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-lg glass border border-white/10 hover:border-neon-green/50 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <IoMoon className="w-5 h-5 text-neon-cyan" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -180,
          scale: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <IoSunny className="w-5 h-5 text-neon-yellow" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
