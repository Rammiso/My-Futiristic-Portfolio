import { motion } from "framer-motion";
import { useState } from "react";
import Card from "@components/ui/Card.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";
import {
  IoCode,
  IoHardwareChip,
  IoColorPalette,
  IoPhonePortrait,
  IoServer,
  IoBulb,
  IoGitNetwork,
  IoCube,
} from "react-icons/io5";

// CSS 3D icon replaces Three.js Canvas per card (~500KB saved per instance)
const EnergyIcon = ({ color, icon, hovered }) => (
  <div
    className="relative h-36 mb-6 rounded-lg flex items-center justify-center overflow-hidden"
    style={{
      background: `radial-gradient(ellipse at center, ${color}15 0%, transparent 70%)`,
      border: `1px solid ${color}30`,
    }}
  >
    {/* Holographic grid */}
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(${color}40 1px, transparent 1px),
          linear-gradient(90deg, ${color}40 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
    />

    {/* Rotating ring */}
    <div
      className="absolute w-24 h-24 rounded-full border pointer-events-none"
      style={{
        borderColor: `${color}40`,
        animation: "spin 8s linear infinite",
      }}
    />
    <div
      className="absolute w-16 h-16 rounded-full border pointer-events-none"
      style={{
        borderColor: `${color}30`,
        animation: "spin 5s linear infinite reverse",
      }}
    />

    {/* Icon */}
    <div
      className="relative z-10 text-5xl transition-transform duration-300"
      style={{
        color,
        filter: `drop-shadow(0 0 12px ${color})`,
        transform: hovered ? "scale(1.2)" : "scale(1)",
        animation: "iconFloat 3s ease-in-out infinite",
      }}
    >
      {icon}
    </div>

    {/* Scan line */}
    <div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
        animation: "scanSweepH 3s linear infinite",
      }}
    />
  </div>
);

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={FADE_IN_UP}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <Card
        variant="glass"
        className={`p-5 sm:p-6 h-full relative overflow-hidden transition-all duration-500 ${
          isHovered ? "border-neon-green/60 shadow-2xl shadow-neon-green/20" : "border-white/10"
        }`}
      >
        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 w-5 h-5 border-l-2 border-t-2 border-neon-green/30 z-10" />
        <div className="absolute top-2 right-2 w-5 h-5 border-r-2 border-t-2 border-neon-cyan/30 z-10" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-l-2 border-b-2 border-neon-pink/30 z-10" />
        <div className="absolute bottom-2 right-2 w-5 h-5 border-r-2 border-b-2 border-neon-green/30 z-10" />

        {/* Hover glow */}
        <div
          className="absolute inset-0 bg-gradient-radial from-neon-green/20 via-transparent to-transparent blur-xl transition-opacity duration-300 pointer-events-none"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.15) 2px, rgba(57, 255, 20, 0.15) 4px)",
          }}
        />

        {/* CSS Energy Icon */}
        <EnergyIcon color={service.color} icon={service.icon} hovered={isHovered} />

        {/* Category badge */}
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: service.color }}
          />
          <span
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: service.color }}
          >
            {service.category}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 relative z-10 group-hover:text-neon-green transition-colors">
          {service.title}
        </h3>

        <p className="text-white/60 text-sm leading-relaxed mb-4 relative z-10">
          {service.description}
        </p>

        <ul className="space-y-2 relative z-10">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-white/50">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: service.color }} />
              {feature}
            </li>
          ))}
        </ul>

        {/* Bottom hover bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent transition-transform duration-300 origin-center"
          style={{ transform: isHovered ? "scaleX(1)" : "scaleX(0)" }}
        />
      </Card>
    </motion.div>
  );
};

const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Full-Stack MERN Development",
      category: "Development",
      description:
        "End-to-end web application engineering with MongoDB, Express, React, and Node.js. Scalable architectures and seamless database integration.",
      icon: <IoCode />,
      color: "#39FF14",
      features: ["Holographic UI/UX design", "RESTful API architecture", "Real-time data systems", "Cloud deployment & scaling"],
    },
    {
      id: 2,
      title: "AI-Powered Solutions",
      category: "Artificial Intelligence",
      description:
        "Advanced AI integration leveraging large language models, vector embeddings, and intelligent automation for context-aware systems.",
      icon: <IoHardwareChip />,
      color: "#00FFFF",
      features: ["LLM integration (OpenAI, Claude)", "RAG & vector databases", "Intelligent automation", "Conversational AI systems"],
    },
    {
      id: 3,
      title: "UI/UX Design & Prototyping",
      category: "Design",
      description:
        "User-centered design with glassmorphic aesthetics, micro-interactions, and intuitive navigation. Accessibility-first approach.",
      icon: <IoColorPalette />,
      color: "#FF10F0",
      features: ["Glassmorphic layouts", "Interactive prototyping", "Design system creation", "Accessibility-first approach"],
    },
    {
      id: 4,
      title: "Mobile App Development",
      category: "Mobile",
      description:
        "Cross-platform mobile applications with React Native. Smooth animations, native device features, and offline-first architecture.",
      icon: <IoPhonePortrait />,
      color: "#FFA500",
      features: ["React Native development", "Native performance optimization", "Offline-first architecture", "Push notifications & deep linking"],
    },
    {
      id: 5,
      title: "Backend & API Engineering",
      category: "Infrastructure",
      description:
        "High-performance backend systems with secure authentication, optimized databases, and cloud-ready infrastructure.",
      icon: <IoServer />,
      color: "#39FF14",
      features: ["Scalable API architecture", "JWT & OAuth authentication", "Database optimization", "Microservices design"],
    },
    {
      id: 6,
      title: "Consulting & Architecture",
      category: "Strategy",
      description:
        "Technical advisory for startups and enterprises. Designing stable, scalable architectures with code reviews and performance audits.",
      icon: <IoBulb />,
      color: "#00FFFF",
      features: ["Architecture planning", "Code quality audits", "Performance optimization", "Tech stack consulting"],
    },
    {
      id: 7,
      title: "Neural Data Automation",
      category: "AI Automation",
      description:
        "Autonomous data processing pipelines powered by machine learning. Intelligent workflow automation and predictive analytics.",
      icon: <IoGitNetwork />,
      color: "#FF10F0",
      features: ["Automated data workflows", "Predictive ML models", "Intelligent task scheduling", "Adaptive algorithms"],
    },
    {
      id: 8,
      title: "Holographic Interface Engineering",
      category: "Emerging Tech",
      description:
        "Next-generation 3D interfaces using WebGL and immersive web technologies. Crafting spatial computing and AR/VR experiences.",
      icon: <IoCube />,
      color: "#FFA500",
      features: ["3D WebGL experiences", "AR/VR prototyping", "Spatial UI design", "Real-time 3D rendering"],
    },
  ];

  return (
    <section id="services" className="section-padding bg-cyber-darker relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Ambient Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />

      {/* HUD Corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neon-green/20 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/20 pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div variants={FADE_IN_UP} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan" />
              <span className="text-sm font-mono text-neon-cyan uppercase tracking-wider">Service Console</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan" />
            </motion.div>

            <motion.h2 variants={FADE_IN_UP} className="section-title">What I Offer</motion.h2>

            <motion.p variants={FADE_IN_UP} className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              Comprehensive solutions from concept to deployment
            </motion.p>
          </div>

          {/* Services Grid — responsive: 1 col mobile, 2 tablet, 3 desktop, 4 xl */}
          <motion.div
            variants={STAGGER_CONTAINER}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
          >
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={FADE_IN_UP} className="mt-16 sm:mt-20 text-center">
            <Card variant="glass" className="p-6 sm:p-8 inline-block max-w-md w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Ready to start your project?</h3>
              <p className="text-white/60 mb-6 text-sm sm:text-base">Let's collaborate to build something extraordinary</p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 sm:px-8 py-3 glass border-2 border-neon-green rounded-lg text-neon-green font-semibold uppercase tracking-wider hover:bg-neon-green/10 transition-all duration-300 text-sm sm:text-base"
              >
                Get In Touch
              </motion.a>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-30 pointer-events-none" />

      <style>{`
        @keyframes scanSweepH {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Services;
