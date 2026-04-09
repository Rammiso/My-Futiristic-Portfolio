import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { IoDownload, IoMail, IoArrowForward } from "react-icons/io5";
import { Link } from "react-scroll";
import Button from "@components/ui/Button.jsx";
import { downloadResume } from "@utils/downloadHelper.js";

const Hero = () => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  // Typing animation — continuous loop
  useEffect(() => {
    const fullText = "Full Stack Developer | AI Engineer | UI/UX Designer";
    let index = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      if (!isDeleting) {
        if (index < fullText.length) {
          setText(fullText.substring(0, index + 1));
          index++;
          timer = setTimeout(type, 50);
        } else {
          timer = setTimeout(() => { isDeleting = true; type(); }, 3000);
        }
      } else {
        if (index > 0) {
          setText(fullText.substring(0, index - 1));
          index--;
          timer = setTimeout(type, 30);
        } else {
          isDeleting = false;
          timer = setTimeout(type, 1000);
        }
      }
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  // Cursor blink via CSS is cheaper, but keep state for simplicity
  useEffect(() => {
    const id = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX / width - 0.5) * 2);
    mouseY.set(-(clientY / height - 0.5) * 2);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 flex items-center justify-center overflow-hidden bg-cyber-darker"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Grid Background — pure CSS, zero JS cost */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridPulse 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* HUD Corner Brackets — CSS only */}
      <div className="absolute top-20 left-10 w-20 h-20 border-l-2 border-t-2 border-neon-green opacity-60 animate-pulse pointer-events-none" />
      <div className="absolute top-20 right-10 w-20 h-20 border-r-2 border-t-2 border-neon-cyan opacity-60 animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-neon-pink opacity-60 animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-neon-green opacity-60 animate-pulse pointer-events-none" />

      {/* Floating HUD Rings — CSS animation instead of framer-motion infinite */}
      <div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-neon-cyan/30 pointer-events-none"
        style={{ animation: "spin 20s linear infinite" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full border border-neon-green/20 pointer-events-none"
        style={{ animation: "spin 25s linear infinite reverse" }}
      />

      {/* Main Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Status */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-neon-green text-sm font-mono uppercase tracking-wider">
                System Online
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 relative font-display">
                <span className="text-gradient relative z-10">Musab</span>
                {/* Glitch — CSS animation, no JS */}
                <span
                  className="absolute top-0 left-0 opacity-10 blur-sm pointer-events-none font-display"
                  style={{
                    animation: "glitch 4s step-end infinite",
                    background: "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  aria-hidden="true"
                >
                  Musab
                </span>
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-white/40 via-slate-400/60 to-transparent" />
            </motion.div>

            {/* Typing Subtitle */}
            <motion.div
              variants={itemVariants}
              className="font-mono text-sm sm:text-lg md:text-xl h-14 sm:h-16 flex items-center"
            >
              <span className="text-white/90">{text}</span>
              <span className={`ml-1 text-neon-green text-2xl transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}>
                ▊
              </span>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-white/70 text-lg max-w-xl leading-relaxed">
              Crafting next-generation digital experiences with cutting-edge technology.
              Specializing in{" "}
              <span className="text-neon-green">MERN Stack</span>,{" "}
              <span className="text-neon-cyan">AI Integration</span>, and{" "}
              <span className="text-neon-pink">Immersive UI/UX</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="projects" smooth={true} duration={500}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ rotateX, rotateY }}>
                  <Button variant="primary" size="lg" className="group">
                    <span>View Projects</span>
                    <IoArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>

              <Link to="contact" smooth={true} duration={500}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ rotateX, rotateY }}>
                  <Button variant="secondary" size="lg">
                    <IoMail className="mr-2" />
                    Contact Me
                  </Button>
                </motion.div>
              </Link>

              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const success = await downloadResume();
                  if (!success) alert("Download failed. Please try again or contact support.");
                }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ rotateX, rotateY }}>
                  <Button variant="outline" size="lg">
                    <IoDownload className="mr-2" />
                    Download CV
                  </Button>
                </motion.div>
              </button>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-4 pt-4">
              {["React", "Node.js", "AI", "Express.js"].map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 glass-dark border border-neon-green/30 rounded text-xs font-mono"
                >
                  {tech}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[400px] lg:h-[500px] hidden md:block"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              {/* Portrait */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                  backgroundImage: 'url("/hero-placeholder.png")',
                  filter: "brightness(0.8) saturate(1.3)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-darker via-neon-green/10 to-neon-cyan/20" />
              </div>

              {/* Ambient glow — CSS animation */}
              <div
                className="absolute inset-0 bg-gradient-radial from-neon-green/20 via-neon-cyan/10 to-transparent blur-3xl z-10 pointer-events-none"
                style={{ animation: "ambientPulse 4s ease-in-out infinite" }}
              />

              {/* Floating Tech Icons — staggered CSS float */}
              {[
                { icon: "⚛️", color: "#00FFFF", top: "20%", left: "15%", delay: "0s" },
                { icon: "🚀", color: "#39FF14", top: "70%", left: "20%", delay: "0.5s" },
                { icon: "🎨", color: "#FF10F0", top: "30%", right: "15%", delay: "1s" },
                { icon: "⚡", color: "#FFD700", top: "60%", right: "25%", delay: "1.5s" },
              ].map((tech, i) => (
                <div
                  key={i}
                  className="absolute text-4xl z-20 pointer-events-none"
                  style={{
                    top: tech.top,
                    left: tech.left,
                    right: tech.right,
                    color: tech.color,
                    filter: `drop-shadow(0 0 10px ${tech.color})`,
                    animation: `iconFloat 3s ease-in-out infinite`,
                    animationDelay: tech.delay,
                  }}
                >
                  {tech.icon}
                </div>
              ))}

              {/* Central Orb — CSS spin + pulse */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-30 pointer-events-none"
                style={{ animation: "spin 20s linear infinite" }}
              >
                <div className="w-full h-full rounded-full border-2 border-neon-green opacity-60" />
                <div className="absolute inset-2 rounded-full border border-neon-cyan opacity-40" />
                <div className="absolute inset-4 rounded-full border border-neon-pink opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-neon-green animate-pulse" style={{ animation: "none" }}>M</span>
                </div>
              </div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full z-25 pointer-events-none">
                <line x1="20%" y1="25%" x2="50%" y2="50%" stroke="#39FF14" strokeWidth="1"
                  style={{ animation: "linePulse 3s ease-in-out infinite", opacity: 0.3 }} />
                <line x1="80%" y1="35%" x2="50%" y2="50%" stroke="#FF10F0" strokeWidth="1"
                  style={{ animation: "linePulse 3s ease-in-out infinite 1s", opacity: 0.3 }} />
              </svg>

              {/* Scan Lines */}
              <div className="absolute inset-0 pointer-events-none opacity-10 z-40"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.1) 2px, rgba(57, 255, 20, 0.1) 4px)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-neon-green to-transparent" />
        <p className="text-white/40 text-xs uppercase tracking-wider font-mono">Scroll</p>
      </motion.div>

      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(2px, 0); }
          94% { transform: translate(-2px, 0); }
          96% { transform: translate(2px, 0); }
        }
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-10px) rotate(5deg) scale(1.1); }
        }
        @keyframes linePulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
