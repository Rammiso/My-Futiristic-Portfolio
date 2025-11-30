import { motion } from "framer-motion";
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Torus, Octahedron } from "@react-three/drei";
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
import * as THREE from "three";

// 3D Energy Core Orb Component
const EnergyCore = ({ color, hovered, variant = "sphere" }) => {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }

    if (glowRef.current) {
      const levitation = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      glowRef.current.position.y = levitation;

      const glowPulse = hovered ? 1.3 : 1;
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }
  });

  const GeometryComponent =
    variant === "sphere" ? Sphere : variant === "torus" ? Torus : Octahedron;
  const args = variant === "torus" ? [0.5, 0.2, 16, 32] : [0.6, 32, 32];

  return (
    <group>
      <GeometryComponent ref={meshRef} args={args}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.5}
          roughness={0.3}
          metalness={0.7}
          wireframe
        />
      </GeometryComponent>

      <Sphere ref={glowRef} args={[0.8, 16, 16]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.3 : 0.15}
        />
      </Sphere>

      {/* Particle Ring */}
      <Torus args={[1.2, 0.02, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </Torus>
    </group>
  );
};

// Service Card Component
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={FADE_IN_UP}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <Card
        variant="glass"
        className={`p-6 h-full relative overflow-hidden transition-all duration-500 ${
          isHovered
            ? "border-neon-green/60 shadow-2xl shadow-neon-green/20"
            : "border-white/10"
        }`}
      >
        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neon-green/30 z-10" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neon-cyan/30 z-10" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-neon-pink/30 z-10" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-neon-green/30 z-10" />

        {/* Neon Glow Effect */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-radial from-neon-green/20 via-transparent to-transparent blur-xl"
        />

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.15) 2px, rgba(57, 255, 20, 0.15) 4px)",
            }}
          />
        </div>

        {/* 3D Energy Core */}
        <div className="relative h-40 mb-6 z-10">
          <motion.div
            animate={{
              boxShadow: isHovered
                ? `0 0 40px ${service.color}80`
                : `0 0 20px ${service.color}40`,
            }}
            className="absolute inset-0 rounded-lg"
          >
            <Canvas camera={{ position: [0, 0, 3] }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight
                  position={[5, 5, 5]}
                  intensity={1.5}
                  color={service.color}
                />
                <pointLight
                  position={[-5, -5, -5]}
                  intensity={0.8}
                  color={service.color}
                />
                <EnergyCore
                  color={service.color}
                  hovered={isHovered}
                  variant={service.variant}
                />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Holographic Grid Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(${service.color}40 1px, transparent 1px),
                  linear-gradient(90deg, ${service.color}40 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        </div>

        {/* Icon Header */}
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <motion.div
            animate={{
              boxShadow: isHovered
                ? `0 0 20px ${service.color}`
                : `0 0 0px ${service.color}`,
            }}
            className="w-12 h-12 rounded-lg glass flex items-center justify-center text-2xl transition-all duration-300"
            style={{ color: service.color }}
          >
            {service.icon}
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: service.color }}
              />
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: service.color }}
              >
                {service.category}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 relative z-10 group-hover:text-neon-green transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-4 relative z-10">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 relative z-10">
          {service.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-sm text-white/50"
            >
              <div
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: service.color }}
              />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Hover Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent"
          style={{ originX: 0.5 }}
        />
      </Card>
    </motion.div>
  );
};

// Main Services Component
const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Full-Stack MERN Development",
      category: "Development",
      description:
        "End-to-end web application engineering with MongoDB, Express, React, and Node.js. Crafting scalable architectures, neon-inspired holographic UIs, and seamless database integration for next-generation digital experiences.",
      icon: <IoCode />,
      color: "#39FF14",
      variant: "sphere",
      features: [
        "Holographic UI/UX design",
        "RESTful API architecture",
        "Real-time data systems",
        "Cloud deployment & scaling",
      ],
    },
    {
      id: 2,
      title: "AI-Powered Solutions",
      category: "Artificial Intelligence",
      description:
        "Advanced AI integration leveraging large language models, vector embeddings, and intelligent automation. Building context-aware chat systems, semantic search engines, and futuristic AI-driven experiences.",
      icon: <IoHardwareChip />,
      color: "#00FFFF",
      variant: "octahedron",
      features: [
        "LLM integration (OpenAI, Claude)",
        "RAG & vector databases",
        "Intelligent automation",
        "Conversational AI systems",
      ],
    },
    {
      id: 3,
      title: "UI/UX Design & Prototyping",
      category: "Design",
      description:
        "User-centered design philosophy with glassmorphic aesthetics, micro-interactions, and intuitive navigation. Creating wireframes, prototypes, and production-ready interfaces that prioritize accessibility and user experience.",
      icon: <IoColorPalette />,
      color: "#FF10F0",
      variant: "torus",
      features: [
        "Glassmorphic layouts",
        "Interactive prototyping",
        "Design system creation",
        "Accessibility-first approach",
      ],
    },
    {
      id: 4,
      title: "Mobile App Development",
      category: "Mobile",
      description:
        "Cross-platform mobile applications with React Native. Delivering smooth animations, responsive layouts, native device features, and offline-first architecture for iOS and Android platforms.",
      icon: <IoPhonePortrait />,
      color: "#FFA500",
      variant: "sphere",
      features: [
        "React Native development",
        "Native performance optimization",
        "Offline-first architecture",
        "Push notifications & deep linking",
      ],
    },
    {
      id: 5,
      title: "Backend & API Engineering",
      category: "Infrastructure",
      description:
        "High-performance backend systems with secure authentication, optimized databases, and cloud-ready infrastructure. Building RESTful and GraphQL APIs with industry-standard security protocols.",
      icon: <IoServer />,
      color: "#39FF14",
      variant: "octahedron",
      features: [
        "Scalable API architecture",
        "JWT & OAuth authentication",
        "Database optimization",
        "Microservices design",
      ],
    },
    {
      id: 6,
      title: "Consulting & System Architecture",
      category: "Strategy",
      description:
        "Technical advisory for startups and enterprises. Designing stable, scalable, and maintainable system architectures. Providing code reviews, performance audits, and technology stack recommendations.",
      icon: <IoBulb />,
      color: "#00FFFF",
      variant: "torus",
      features: [
        "Architecture planning",
        "Code quality audits",
        "Performance optimization",
        "Tech stack consulting",
      ],
    },
    {
      id: 7,
      title: "Neural Data Automation",
      category: "AI Automation",
      description:
        "Autonomous data processing pipelines powered by machine learning. Intelligent workflow automation, predictive analytics, and adaptive decision-making systems that evolve with your data patterns.",
      icon: <IoGitNetwork />,
      color: "#FF10F0",
      variant: "sphere",
      features: [
        "Automated data workflows",
        "Predictive ML models",
        "Intelligent task scheduling",
        "Adaptive algorithms",
      ],
    },
    {
      id: 8,
      title: "Holographic Interface Engineering",
      category: "Emerging Tech",
      description:
        "Next-generation 3D interfaces using WebGL, Three.js, and React Three Fiber. Crafting immersive experiences with spatial computing, AR/VR integration, and holographic projection systems.",
      icon: <IoCube />,
      color: "#FFA500",
      variant: "octahedron",
      features: [
        "3D WebGL experiences",
        "AR/VR prototyping",
        "Spatial UI design",
        "Real-time 3D rendering",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="section-padding bg-cyber-darker relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
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

      {/* Floating Gradient Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />

      {/* HUD Corner Elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-neon-green/20" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-neon-cyan/20" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              variants={FADE_IN_UP}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan" />
              <span className="text-sm font-mono text-neon-cyan uppercase tracking-wider">
                Service Console
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan" />
            </motion.div>

            <motion.h2 variants={FADE_IN_UP} className="section-title">
              What I Offer
            </motion.h2>

            <motion.p
              variants={FADE_IN_UP}
              className="text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
              Comprehensive solutions from concept to deployment
            </motion.p>
          </div>

          {/* Services Grid */}
          <motion.div
            variants={STAGGER_CONTAINER}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={FADE_IN_UP} className="mt-20 text-center">
            <Card variant="glass" className="p-8 inline-block">
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to start your project?
              </h3>
              <p className="text-white/60 mb-6 max-w-md">
                Let's collaborate to build something extraordinary
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 glass border-2 border-neon-green rounded-lg text-neon-green font-semibold uppercase tracking-wider hover:bg-neon-green/10 transition-all duration-300"
              >
                Get In Touch
              </motion.a>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-30" />
    </section>
  );
};

export default Services;
