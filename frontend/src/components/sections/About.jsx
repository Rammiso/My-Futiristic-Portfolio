import { motion } from "framer-motion";
import Card from "@components/ui/Card.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";

// ── Expertise highlight card ──────────────────────────────────────────────────
const HighlightCard = ({ highlight, index }) => (
  <motion.div
    variants={FADE_IN_UP}
    whileHover={{ y: -6, scale: 1.02 }}
    className="group cursor-pointer"
  >
    <Card
      variant="glass"
      className="p-6 h-full relative overflow-hidden border-neon-green/20 hover:border-neon-green/50 transition-all duration-300"
    >
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-neon-green/40" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-neon-cyan/40" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-neon-pink/40" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-neon-green/40" />

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-radial from-neon-green/10 via-transparent to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div
        className="text-5xl mb-4 relative z-10"
        style={{ animation: "iconFloat 3s ease-in-out infinite", animationDelay: `${index * 0.2}s` }}
      >
        {highlight.icon}
      </div>

      <h4 className="text-lg font-bold text-white mb-2 relative z-10 group-hover:text-neon-green transition-colors">
        {highlight.title}
      </h4>
      <p className="text-white/60 text-sm leading-relaxed relative z-10">{highlight.description}</p>

      <div className="mt-4 flex items-center gap-2 relative z-10">
        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
        <span className="text-xs font-mono text-neon-green uppercase">Active</span>
      </div>
    </Card>
  </motion.div>
);

// ── Timeline entry ────────────────────────────────────────────────────────────
const TimelineItem = ({ year, title, desc, color, last }) => (
  <motion.div variants={FADE_IN_UP} className="relative flex gap-5">
    {/* Vertical line */}
    <div className="flex flex-col items-center">
      <div
        className="w-3 h-3 rounded-full mt-1 flex-shrink-0 ring-2 ring-offset-2 ring-offset-transparent"
        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}`, ringColor: color }}
      />
      {!last && <div className="w-px flex-1 mt-1" style={{ background: `linear-gradient(to bottom, ${color}60, transparent)` }} />}
    </div>
    {/* Content */}
    <div className="pb-8">
      <span className="text-xs font-mono uppercase tracking-wider" style={{ color }}>{year}</span>
      <h4 className="text-white font-semibold mt-0.5 mb-1">{title}</h4>
      <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

// ── Stat counter card ─────────────────────────────────────────────────────────
const StatCard = ({ value, label, color }) => (
  <motion.div
    variants={FADE_IN_UP}
    whileHover={{ scale: 1.05 }}
    className="glass border border-white/10 rounded-xl p-5 text-center relative overflow-hidden group"
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: `radial-gradient(ellipse at center, ${color}15, transparent 70%)` }}
    />
    <div className="text-3xl font-bold relative z-10" style={{ color, textShadow: `0 0 16px ${color}60` }}>
      {value}
    </div>
    <div className="text-xs text-white/50 uppercase tracking-wider mt-1 font-mono relative z-10">{label}</div>
  </motion.div>
);

// ── Main component ────────────────────────────────────────────────────────────
const About = () => {
  const highlights = [
    {
      icon: "⚛️",
      title: "MERN Stack",
      description: "Expert in MongoDB, Express, React, and Node.js. Building scalable full-stack applications with modern architecture.",
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Implementing cutting-edge AI solutions. Experience with OpenAI, LLMs, and intelligent automation systems.",
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Creating beautiful, intuitive interfaces with focus on user experience, design systems, and accessibility.",
    },
    {
      icon: "📱",
      title: "Mobile Dev",
      description: "Cross-platform mobile apps with Flutter & React Native. Native performance with a unified codebase.",
    },
  ];

  const timeline = [
    {
      year: "2021 — Start",
      title: "Began Software Engineering Journey",
      desc: "Discovered a passion for building things on the web. Started with HTML, CSS, and JavaScript fundamentals.",
      color: "#39FF14",
    },
    {
      year: "2022 — Growth",
      title: "Full-Stack Development",
      desc: "Mastered the MERN stack. Built first production applications and dove deep into REST API design and database architecture.",
      color: "#00FFFF",
    },
    {
      year: "2023 — Expansion",
      title: "AI & Mobile Integration",
      desc: "Integrated OpenAI APIs into real products. Expanded into Flutter mobile development and NestJS backend systems.",
      color: "#FF10F0",
    },
    {
      year: "2024 — Now",
      title: "Building Next-Gen Experiences",
      desc: "Crafting immersive, AI-powered web experiences. Focused on performance, scalability, and cutting-edge UI/UX.",
      color: "#39FF14",
    },
  ];

  const stats = [
    { value: "10+", label: "Projects", color: "#39FF14" },
    { value: "3+", label: "Years Exp", color: "#00FFFF" },
    { value: "20+", label: "Technologies", color: "#FF10F0" },
    { value: "∞", label: "Learning", color: "#FFA500" },
  ];

  return (
    <section id="about" className="section-padding bg-cyber-dark relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />

      {/* HUD corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neon-green/30 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/30 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-neon-pink/20 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-neon-green/20 pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* ── Section header ── */}
          <div className="text-center mb-16">
            <motion.div variants={FADE_IN_UP} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-green" />
              <span className="text-sm font-mono text-neon-green uppercase tracking-wider">Profile Overview</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green" />
            </motion.div>
            <motion.h2 variants={FADE_IN_UP} className="section-title">About Me</motion.h2>
            <motion.p variants={FADE_IN_UP} className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              Passionate developer crafting digital experiences that make a difference
            </motion.p>
          </div>

          {/* ── Main two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">

            {/* Left — Bio + terminal block (3 cols) */}
            <motion.div variants={FADE_IN_UP} className="lg:col-span-3 space-y-6">

              {/* Bio card */}
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
                    I'm a <span className="text-neon-green font-semibold">Software Engineer</span> with a passion
                    for creating innovative web applications that solve real-world problems. My journey started
                    with a curiosity about how things work, and evolved into a career focused on building
                    scalable, user-friendly solutions.
                  </p>
                  <p>
                    I specialize in the <span className="text-neon-cyan font-semibold">MERN stack</span> and love
                    working on challenging projects that push the boundaries of web development — whether it's
                    implementing AI features, designing intuitive interfaces, or optimizing performance.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source
                    projects, or sharing knowledge with the developer community.
                  </p>
                </div>

                {/* Traits row */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {["Problem Solver", "Clean Code", "Fast Learner", "Team Player", "Open Source"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-mono rounded-full border border-neon-cyan/30 text-neon-cyan/80 glass-dark"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Terminal block */}
              <Card variant="glass" className="p-0 relative overflow-hidden">
                {/* Terminal title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/20">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-neon-green/70" />
                  <span className="ml-3 text-xs font-mono text-white/40">musab@portfolio ~ profile.sh</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  <div><span className="text-neon-green">$</span> <span className="text-white/80">whoami</span></div>
                  <div className="text-neon-cyan pl-4">Musab Hassen — Full Stack Engineer</div>
                  <div className="mt-2"><span className="text-neon-green">$</span> <span className="text-white/80">cat skills.txt</span></div>
                  <div className="text-white/60 pl-4">MERN · NestJS · Flutter · AI/LLM · REST · Docker</div>
                  <div className="mt-2"><span className="text-neon-green">$</span> <span className="text-white/80">echo $LOCATION</span></div>
                  <div className="text-neon-pink pl-4">Harar, Ethiopia 🌍</div>
                  <div className="mt-2"><span className="text-neon-green">$</span> <span className="text-white/80">echo $STATUS</span></div>
                  <div className="pl-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                    <span className="text-neon-green">Available for opportunities</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-neon-green">$</span>
                    <span
                      className="ml-2 inline-block w-2 h-4 bg-neon-green/80"
                      style={{ animation: "cursorBlink 1s step-end infinite" }}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right — Stats + Timeline (2 cols) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Stats grid */}
              <motion.div variants={STAGGER_CONTAINER} className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => <StatCard key={i} {...s} />)}
              </motion.div>

              {/* Timeline */}
              <motion.div variants={FADE_IN_UP}>
                <Card variant="glass" className="p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />

                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-neon-cyan uppercase tracking-wider">Journey</span>
                  </div>

                  <div>
                    {timeline.map((item, i) => (
                      <TimelineItem key={i} {...item} last={i === timeline.length - 1} />
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* ── Core Expertise cards ── */}
          <motion.div variants={FADE_IN_UP}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-dark border border-neon-cyan/30 rounded-full">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                <span className="text-sm font-mono text-neon-cyan uppercase tracking-wider">Core Expertise</span>
              </div>
            </div>

            <motion.div variants={STAGGER_CONTAINER} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((h, i) => <HighlightCard key={i} highlight={h} index={i} />)}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-30 pointer-events-none" />

      <style>{`
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default About;
