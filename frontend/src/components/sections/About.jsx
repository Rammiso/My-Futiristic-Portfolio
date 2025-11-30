import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import Card from "@components/ui/Card.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";
import * as THREE from "three";

// Sound Effects Hook
const useHoverSound = () => {
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Audio(
      "data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="
    );
    soundRef.current.volume = 0.2;
  }, []);

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(() => {});
    }
  };

  return playSound;
};

// Orbiting Particles Component
const OrbitingParticles = () => {
  const particlesRef = useRef([]);
  const particleCount = 20;

  const particlePositions = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 3.5 + Math.random() * 0.5;
    return {
      angle,
      radius,
      offset: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.3,
    };
  });

  useFrame((state) => {
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        const data = particlePositions[i];
        const time = state.clock.elapsedTime * data.speed;

        particle.position.x = Math.cos(time + data.offset) * data.radius;
        particle.position.y = Math.sin(time * 0.7 + data.offset) * 1.2;
        particle.position.z = Math.sin(time + data.offset) * data.radius;

        // Pulsing effect
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.3;
        particle.scale.set(pulse, pulse, pulse);
      }
    });
  });

  return (
    <group>
      {particlePositions.map((_, i) => (
        <mesh
          key={`particle-${i}`}
          ref={(el) => (particlesRef.current[i] = el)}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={
              i % 3 === 0 ? "#39FF14" : i % 3 === 1 ? "#00FFFF" : "#FF10F0"
            }
            emissive={
              i % 3 === 0 ? "#39FF14" : i % 3 === 1 ? "#00FFFF" : "#FF10F0"
            }
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// Holographic Portrait Plane Component
const HolographicPortrait = ({ mouseX, mouseY }) => {
  const meshRef = useRef();
  const [flicker, setFlicker] = useState(1);

  // Load actual portrait texture
  const texture = useLoader(THREE.TextureLoader, "/src/assets/MUSAB.png");

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth parallax rotation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouseX * 0.3,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -mouseY * 0.2,
        0.05
      );

      // Floating motion
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

      // Random flicker effect
      if (Math.random() > 0.97) {
        setFlicker(Math.random() * 0.3 + 0.7);
      } else {
        setFlicker(1);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Portrait plane - sized to fit container */}
      <boxGeometry args={[3, 4, 0.1]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.98 * flicker}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Camera Controller
const CameraController = ({ mouseX, mouseY }) => {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouseX * 0.5,
      0.03
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouseY * 0.5,
      0.03
    );

    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main Animated Portrait Scene
const AnimatedPortrait = ({ mouseX, mouseY }) => {
  return (
    <>
      {/* Lighting Setup - neutral white light */}
      <ambientLight intensity={0.8} color="#ffffff" />

      {/* Main Lights - white for natural colors */}
      <pointLight
        position={[3, 3, 3]}
        intensity={1}
        color="#ffffff"
        distance={10}
      />
      <pointLight
        position={[-3, -3, 3]}
        intensity={0.8}
        color="#ffffff"
        distance={10}
      />

      {/* Holographic Portrait */}
      <HolographicPortrait mouseX={mouseX} mouseY={mouseY} />

      {/* Orbiting Particles */}
      <OrbitingParticles />

      {/* Camera Controller */}
      <CameraController mouseX={mouseX} mouseY={mouseY} />

      {/* Soft Ambient Glow Sphere */}
      <Sphere args={[4.5, 32, 32]}>
        <meshBasicMaterial
          color="#00FFFF"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  );
};

// Highlight Card Component
const HighlightCard = ({ highlight, index, playSound }) => {
  return (
    <motion.div
      variants={FADE_IN_UP}
      whileHover={{ y: -5, scale: 1.02 }}
      onHoverStart={playSound}
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

        {/* Glow Effect on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-radial from-neon-green/10 via-transparent to-transparent blur-xl"
        />

        {/* Icon */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
          className="text-6xl mb-4 relative z-10"
        >
          {highlight.icon}
        </motion.div>

        {/* Title */}
        <h4 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-neon-green transition-colors">
          {highlight.title}
        </h4>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed relative z-10">
          {highlight.description}
        </p>

        {/* Status Indicator */}
        <div className="mt-4 flex items-center gap-2 relative z-10">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-neon-green rounded-full"
          />
          <span className="text-xs font-mono text-neon-green uppercase">
            Active
          </span>
        </div>

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
      </Card>
    </motion.div>
  );
};

// Main About Component
const About = () => {
  const playSound = useHoverSound();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (clientX / width - 0.5) * 2,
      y: -(clientY / height - 0.5) * 2,
    });
  };

  return (
    <section
      id="about"
      className="section-padding bg-cyber-dark relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
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

      {/* Floating Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />

      {/* HUD Corner Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neon-green/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/30" />

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
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-green" />
              <span className="text-sm font-mono text-neon-green uppercase tracking-wider">
                Profile Overview
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green" />
            </motion.div>

            <motion.h2 variants={FADE_IN_UP} className="section-title">
              About Me
            </motion.h2>

            <motion.p
              variants={FADE_IN_UP}
              className="text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
              Passionate developer crafting digital experiences that make a
              difference
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Bio Card */}
            <motion.div variants={FADE_IN_UP}>
              <Card variant="glass" className="p-8 relative overflow-hidden">
                {/* Neon Top Edge */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent" />

                {/* HUD Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-neon-green" />
                  <div>
                    <h3 className="text-2xl font-bold text-neon-green">
                      Hello! I'm Musab 👋
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-neon-green rounded-full"
                      />
                      <span className="text-xs font-mono text-white/50">
                        ONLINE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio Content */}
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    I'm a{" "}
                    <span className="text-neon-green font-semibold">
                      Full Stack Developer
                    </span>{" "}
                    with a passion for creating innovative web applications that
                    solve real-world problems. My journey in software
                    development started with a curiosity about how things work,
                    and it has evolved into a career focused on building
                    scalable, user-friendly solutions.
                  </p>
                  <p>
                    I specialize in the{" "}
                    <span className="text-neon-cyan font-semibold">
                      MERN stack
                    </span>{" "}
                    and love working on challenging projects that push the
                    boundaries of web development. Whether it's implementing AI
                    features, designing intuitive interfaces, or optimizing
                    performance, I'm always eager to learn and grow.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new
                    technologies, contributing to open-source projects, or
                    sharing knowledge with the developer community.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                  {[
                    { label: "Projects", value: "50+" },
                    { label: "Experience", value: "3+ Yrs" },
                    { label: "Technologies", value: "20+" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-neon-green mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/50 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* 3D Holographic Portrait */}
            <motion.div
              variants={FADE_IN_UP}
              className="relative h-[400px] lg:h-[500px]"
            >
              <Card
                variant="glass"
                className="h-full p-4 relative overflow-hidden"
              >
                {/* HUD Label */}
                {/* <div className="absolute top-4 left-4 z-10 px-3 py-1 glass-dark border border-neon-cyan/30 rounded backdrop-blur-sm">
                  <span className="text-xs font-mono text-neon-cyan">
                    HOLOGRAM_V2 • PORTRAIT_ACTIVE
                  </span>
                </div> */}

                {/* 3D Canvas */}
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-radial from-neon-green/10 via-neon-cyan/5 to-transparent blur-2xl" />

                  <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                    <Suspense fallback={null}>
                      <AnimatedPortrait
                        mouseX={mousePosition.x}
                        mouseY={mousePosition.y}
                      />
                    </Suspense>
                  </Canvas>

                  {/* Scanlines Overlay */}
                  {/* <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.1) 2px, rgba(57, 255, 20, 0.1) 4px)",
                      }}
                    />
                  </div> */}

                  {/* Vignette Effect */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-cyber-dark/50" />
                </div>

                {/* Corner Brackets */}
                <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-neon-green/50" />
                <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/50" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-neon-pink/50" />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-neon-green/50" />
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

            <motion.div
              variants={STAGGER_CONTAINER}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {highlights.map((highlight, index) => (
                <HighlightCard
                  key={index}
                  highlight={highlight}
                  index={index}
                  playSound={playSound}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-30" />
    </section>
  );
};

export default About;
