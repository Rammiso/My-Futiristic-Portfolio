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
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-4 items-center">
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
              <span className="text-neon-pink">Flutter with NestJS</span>.
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
              {["Next.Js", "Node.js", "AI", "Express.js", "NestJs", "Flutter"].map((tech) => (
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
            className="relative hidden md:flex items-center justify-end pr-0 lg:pr-4"
          >
            {/* Ambient glow layers behind portrait */}
            <div className="absolute right-0 w-[520px] h-[520px] rounded-full bg-neon-green/8 blur-[80px] pointer-events-none -z-10"
              style={{ animation: "ambientPulse 5s ease-in-out infinite" }} />
            <div className="absolute right-8 w-[380px] h-[380px] rounded-full bg-neon-cyan/6 blur-[60px] pointer-events-none -z-10"
              style={{ animation: "ambientPulse 7s ease-in-out infinite reverse" }} />

            {/* Portrait frame — no hard border, just glow + brackets */}
            <div className="relative w-[30rem] h-[36rem] lg:w-[36rem] lg:h-[42rem]">

              {/* Soft glow halo — replaces the hard neon border */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-green/20 via-neon-cyan/10 to-neon-pink/15 blur-2xl pointer-events-none" />

              {/* Image container — no border, clean clip */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={musabImg}
                  alt="Musab"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(1.0) contrast(1.08) saturate(1.15)" }}
                />

                {/* Bottom fade into background */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker/70 via-transparent to-transparent pointer-events-none" />

                {/* Subtle cyan tint at top */}
                <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />

                {/* Animated scan sweep */}
                <div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent pointer-events-none"
                  style={{ animation: "scanSweep 5s ease-in-out infinite" }}
                />
              </div>

              {/* HUD corner brackets — larger, more prominent */}
              {/* <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-neon-green pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-neon-cyan pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-neon-pink pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-neon-green pointer-events-none" /> */}

              {/* HUD data labels */}
              {/* <div className="absolute -top-6 left-0 font-mono text-[10px] text-neon-green/70 leading-tight pointer-events-none">
                SYS: ONLINE &nbsp;|&nbsp; ID: MBK-001
              </div>
              <div className="absolute -bottom-6 right-0 font-mono text-[10px] text-neon-cyan/70 leading-tight text-right pointer-events-none">
                STACK: MERN &nbsp;|&nbsp; AI: ACTIVE
              </div> */}
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
