import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import musabImg from "@assets/MUSAB.png";
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
    const fullText = "Full Stack Developer | AI | Flutter Developer";
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
      <div className="container-custom relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Status */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-4 h-4 bg-neon-green rounded-full animate-pulse" />
<span className="text-neon-green text-xl font-mono uppercase tracking-wider">
                Hey, I'm...
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

          {/* Right Visual — Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex items-center justify-center hidden md:flex"
          >
            {/* Outer rotating ring */}
            <div
              className="absolute w-[420px] h-[420px] rounded-full border border-neon-green/20 pointer-events-none"
              style={{ animation: "spin 30s linear infinite" }}
            />
            {/* Mid rotating ring */}
            <div
              className="absolute w-[370px] h-[370px] rounded-full border border-neon-cyan/15 pointer-events-none"
              style={{ animation: "spin 20s linear infinite reverse" }}
            />

            {/* HUD tick marks on outer ring */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-[420px] h-[420px] pointer-events-none"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-neon-green/50" />
              </div>
            ))}

            {/* Corner HUD data labels */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-neon-green/60 leading-tight pointer-events-none">
              <div>SYS: ONLINE</div>
              <div>ID: MBK-001</div>
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-neon-cyan/60 leading-tight text-right pointer-events-none">
              <div>STACK: MERN</div>
              <div>AI: ACTIVE</div>
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-neon-pink/60 leading-tight pointer-events-none">
              <div>MODE: DEV</div>
              <div>STATUS: ●</div>
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-neon-green/60 leading-tight text-right pointer-events-none">
              <div>VER: 2.0</div>
              <div>BUILD: OK</div>
            </div>

            {/* Portrait frame */}
        <div className="relative w-[28rem] h-[32rem] lg:w-[32rem] lg:h-[36rem]">
              {/* Neon border glow layers */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-neon-green via-neon-cyan to-neon-pink opacity-60 blur-md pointer-events-none" />
              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-neon-green via-neon-cyan to-neon-pink opacity-80 pointer-events-none" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-cyber-darker">
                <img
                  src={musabImg}
                  alt="Musab"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.95) contrast(1.05) saturate(1.1)" }}
                />

                {/* Subtle color overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker/60 via-transparent to-neon-cyan/5 pointer-events-none" />

                {/* Scan lines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(57,255,20,0.8) 3px, rgba(57,255,20,0.8) 4px)",
                  }}
                />

                {/* Animated scan sweep */}
                <div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent pointer-events-none"
                  style={{ animation: "scanSweep 4s ease-in-out infinite" }}
                />
              </div>

              {/* Corner brackets on frame */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-l-2 border-t-2 border-neon-green rounded-tl pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-5 h-5 border-r-2 border-t-2 border-neon-cyan rounded-tr pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-l-2 border-b-2 border-neon-pink rounded-bl pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-r-2 border-b-2 border-neon-green rounded-br pointer-events-none" />
            </div>

            {/* Ambient glow behind portrait */}
            <div
              className="absolute w-64 h-64 rounded-full bg-neon-green/10 blur-3xl pointer-events-none -z-10"
              style={{ animation: "ambientPulse 4s ease-in-out infinite" }}
            />
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
        @keyframes scanSweep {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
