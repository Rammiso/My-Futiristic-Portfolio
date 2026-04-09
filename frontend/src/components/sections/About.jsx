import { motion } from "framer-motion";
import { useRef } from "react";
import Card from "@components/ui/Card.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";

// HighlightCard — no sound, no per-particle framer-motion infinite loops
const HighlightCard = ({ highlight, index }) => (
  <motion.div
    variants={FADE_IN_UP}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group cursor-pointer"
  >
    <Card
      variant="glass"
      className="p-6 h-full relative overflow-hidden border-neon-green/20 hover:border-neon-green/50 transition-all duration-300"
    >
      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-neon-green/40" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-neon-cyan/40" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-neon-pink/40" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-neon-green/40" />

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-radial from-neon-green/10 via-transparent to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon — CSS float, no framer-motion infinite */}
      <div
        className="text-6xl mb-4 relative z-10"
        style={{
          animation: "iconFloat 3s ease-in-out infinite",
          animationDelay: `${index * 0.2}s`,
        }}
      >
        {highlight.icon}
      </div>

      <h4 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-neon-green transition-colors">
        {highlight.title}
      </h4>

      <p className="text-white/60 text-sm leading-relaxed relative z-10">
        {highlight.description}
      </p>

      <div className="mt-4 flex items-center gap-2 relative z-10">
        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
        <span className="text-xs font-mono text-neon-green uppercase">Active</span>
      </div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.1) 2px, rgba(57, 255, 20, 0.1) 4px)",
        }}
      />
    </Card>
  </motion.div>
);

const About = () => {
  const sectionRef = useRef(null);

  const highlights = [
    {
      icon: "⚛️",
      title: "MERN Stack",
      description:
        "Expert in MongoDB, Express, React, and Node.js. Building scalable full-stack applications with modern architecture.",
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description:
        "Implementing cutting-edge AI solutions and integrations. Experience with OpenAI, machine learning models, and intelligent systems.",
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description:
        "Creating beautiful, intuitive interfaces with focus on user experience. Expertise in modern design systems and accessibility.",
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description:
        "Building cross-platform mobile applications with React Native. Native performance with unified codebase.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-cyber-dark relative overflow-hidden"
    >
      {/* Background Grid — static, no JS */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Ambient Orbs — CSS only, no JS */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />

      {/* HUD Corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neon-green/30 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/30 pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div variants={FADE_IN_UP} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-green" />
              <span className="text-sm font-mono text-neon-green uppercase tracking-wider">
                Profile Overview
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green" />
            </motion.div>

            <motion.h2 variants={FADE_IN_UP} className="section-title">
              About Me
            </motion.h2>

            <motion.p variants={FADE_IN_UP} className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              Passionate developer crafting digital experiences that make a difference
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
            {/* Bio Card */}
            <motion.div variants={FADE_IN_UP}>
              <Card variant="glass" className="p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-neon-green" />
                  <div>
                    <h3 className="text-2xl font-bold font-display text-gradient">Hello! I'm Musab 👋</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                      <span className="text-xs font-mono text-white/50">ONLINE</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    I'm a{" "}
                    <span className="text-neon-green font-semibold">Full Stack Developer</span>{" "}
                    with a passion for creating innovative web applications that solve real-world
                    problems. My journey in software development started with a curiosity about
                    how things work, and it has evolved into a career focused on building
                    scalable, user-friendly solutions.
                  </p>
                  <p>
                    I specialize in the{" "}
                    <span className="text-neon-cyan font-semibold">MERN stack</span>{" "}
                    and love working on challenging projects that push the boundaries of web
                    development. Whether it's implementing AI features, designing intuitive
                    interfaces, or optimizing performance, I'm always eager to learn and grow.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing
                    to open-source projects, or sharing knowledge with the developer community.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
                  {[
                    { label: "Projects", value: "10+" },
                    { label: "Experience", value: "3+ Yrs" },
                    { label: "Technologies", value: "20+" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-neon-green mb-1">{stat.value}</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Portrait Display */}
            <motion.div variants={FADE_IN_UP} className="relative h-72 sm:h-[400px] lg:h-[500px]">
              <Card variant="glass" className="h-full p-4 relative overflow-hidden">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  {/* Portrait */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                      backgroundImage: 'url("/MUSAB.png")',
                      filter: "brightness(0.9) contrast(1.1)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-cyber-dark to-neon-cyan/10" />
                  </div>

                  {/* Ambient glow — CSS */}
                  <div
                    className="absolute inset-0 bg-gradient-radial from-neon-cyan/15 via-neon-green/5 to-transparent blur-2xl z-10 pointer-events-none"
                    style={{ animation: "ambientPulse 5s ease-in-out infinite" }}
                  />

                  {/* Floating Particles — CSS only, no framer-motion */}
                  {[
                    { size: 4, color: "#39FF14", top: "15%", left: "10%", delay: "0s" },
                    { size: 6, color: "#00FFFF", top: "25%", right: "15%", delay: "0.5s" },
                    { size: 3, color: "#FF10F0", top: "60%", left: "20%", delay: "1s" },
                    { size: 5, color: "#FFD700", top: "70%", right: "25%", delay: "1.5s" },
                    { size: 4, color: "#39FF14", top: "40%", left: "80%", delay: "2s" },
                    { size: 3, color: "#00FFFF", top: "80%", right: "10%", delay: "2.5s" },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full z-20 pointer-events-none"
                      style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        top: p.top,
                        left: p.left,
                        right: p.right,
                        backgroundColor: p.color,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                        animation: "particleFloat 4s ease-in-out infinite",
                        animationDelay: p.delay,
                      }}
                    />
                  ))}

                  {/* Frame */}
                  <div
                    className="absolute inset-4 border-2 border-neon-green/30 rounded-lg z-30 pointer-events-none"
                    style={{ animation: "framePulse 3s ease-in-out infinite" }}
                  >
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-neon-green" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-neon-cyan" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-neon-pink" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-neon-green" />
                  </div>

                  {/* Scan sweep — CSS */}
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/5 to-transparent z-25 pointer-events-none"
                    style={{
                      animation: "scanSweep 8s linear infinite",
                      filter: "blur(1px)",
                    }}
                  />

                  {/* Vignette */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-cyber-dark/40 z-40" />
                </div>

                {/* Outer Corner Brackets */}
                <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-neon-green/50 pointer-events-none" />
                <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/50 pointer-events-none" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-neon-pink/50 pointer-events-none" />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-neon-green/50 pointer-events-none" />
              </Card>
            </motion.div>
          </div>

          {/* Expertise Highlights */}
          <motion.div variants={FADE_IN_UP}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-dark border border-neon-cyan/30 rounded-full mb-4">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                <span className="text-sm font-mono text-neon-cyan uppercase tracking-wider">
                  Core Expertise
                </span>
              </div>
            </div>

            <motion.div variants={STAGGER_CONTAINER} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, index) => (
                <HighlightCard key={index} highlight={highlight} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-30 pointer-events-none" />

      <style>{`
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-15px) translateX(5px); opacity: 0.8; }
        }
        @keyframes framePulse {
          0%, 100% { border-color: rgba(57, 255, 20, 0.3); }
          50% { border-color: rgba(0, 255, 255, 0.5); }
        }
        @keyframes scanSweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

export default About;
