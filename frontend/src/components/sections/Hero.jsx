import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Box, Sphere, Torus } from "@react-three/drei";
import { IoDownload, IoMail, IoArrowForward } from "react-icons/io5";
import { Link } from "react-scroll";
import Button from "@components/ui/Button.jsx";
import { RESUME_URL } from "@utils/constants.js";
import * as THREE from "three";

// Sound Effects
const useSound = () => {
  const hoverSound = useRef(null);
  const clickSound = useRef(null);

  useEffect(() => {
    hoverSound.current = new Audio(
      "data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="
    );
    hoverSound.current.volume = 0.3;

    clickSound.current = new Audio(
      "data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="
    );
    clickSound.current.volume = 0.4;
  }, []);

  const playHover = () => {
    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play().catch(() => {});
    }
  };

  const playClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(() => {});
    }
  };

  return { playHover, playClick };
};

// Orbiting Tech Logo Component
const OrbitingLogo = ({
  position,
  orbitSpeed,
  logoText,
  color,
  orbitRadius,
}) => {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * orbitSpeed;
      meshRef.current.position.x = Math.cos(time) * orbitRadius + position[0];
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.5 + position[1];
      meshRef.current.position.z = Math.sin(time) * orbitRadius + position[2];

      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;

      // Pulsing glow
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }

    if (textRef.current && meshRef.current) {
      textRef.current.position.copy(meshRef.current.position);
      textRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>
      <Text
        ref={textRef}
        fontSize={0.15}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {logoText}
      </Text>
    </group>
  );
};

// Network Graph Component
const NetworkGraph = ({ mouseX, mouseY }) => {
  const groupRef = useRef();
  const nodesRef = useRef([]);
  const linesRef = useRef([]);

  const nodeCount = 30;
  const [nodePositions] = useState(() => {
    const positions = [];
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3 + Math.random() * 2;

      positions.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    return positions;
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;

      // Apply mouse parallax
      groupRef.current.position.x = mouseX * 0.2;
      groupRef.current.position.y = mouseY * 0.2;
    }

    // Animate nodes
    nodesRef.current.forEach((node, i) => {
      if (node) {
        const pulse =
          1 +
          Math.sin(state.clock.elapsedTime * 2 + nodePositions[i].pulseOffset) *
            0.3;
        node.scale.set(pulse, pulse, pulse);
      }
    });

    // Animate connection lines opacity
    linesRef.current.forEach((line, i) => {
      if (line) {
        const fade = 0.3 + Math.sin(state.clock.elapsedTime + i * 0.5) * 0.3;
        line.material.opacity = fade;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <mesh
          key={`node-${i}`}
          position={[pos.x, pos.y, pos.z]}
          ref={(el) => (nodesRef.current[i] = el)}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color="#00FFFF"
            emissive="#00FFFF"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Connection Lines */}
      {nodePositions.map((pos1, i) =>
        nodePositions.slice(i + 1).map((pos2, j) => {
          const distance = Math.sqrt(
            Math.pow(pos1.x - pos2.x, 2) +
              Math.pow(pos1.y - pos2.y, 2) +
              Math.pow(pos1.z - pos2.z, 2)
          );

          if (distance < 2.5) {
            const points = [
              new THREE.Vector3(pos1.x, pos1.y, pos1.z),
              new THREE.Vector3(pos2.x, pos2.y, pos2.z),
            ];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(
              points
            );

            return (
              <line
                key={`line-${i}-${j}`}
                geometry={lineGeometry}
                ref={(el) => linesRef.current.push(el)}
              >
                <lineBasicMaterial
                  color="#39FF14"
                  transparent
                  opacity={0.4}
                  linewidth={1}
                />
              </line>
            );
          }
          return null;
        })
      )}
    </group>
  );
};

// Holographic Device Component
const DeviceHologram = ({ position, deviceType, label }) => {
  const meshRef = useRef();
  const textRef = useRef();
  const [flicker, setFlicker] = useState(1);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.rotation.y += 0.005;

      // Random flicker effect
      if (Math.random() > 0.98) {
        setFlicker(Math.random() * 0.5 + 0.5);
      } else {
        setFlicker(1);
      }
    }

    if (textRef.current && meshRef.current) {
      textRef.current.position.set(
        meshRef.current.position.x,
        meshRef.current.position.y + 0.8,
        meshRef.current.position.z
      );
      textRef.current.lookAt(state.camera.position);
    }
  });

  const getDeviceGeometry = () => {
    switch (deviceType) {
      case "laptop":
        return <boxGeometry args={[0.8, 0.5, 0.05]} />;
      case "phone":
        return <boxGeometry args={[0.3, 0.6, 0.05]} />;
      case "server":
        return <boxGeometry args={[0.6, 0.8, 0.6]} />;
      case "tablet":
        return <boxGeometry args={[0.6, 0.8, 0.05]} />;
      default:
        return <boxGeometry args={[0.5, 0.5, 0.5]} />;
    }
  };

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        {getDeviceGeometry()}
        <meshStandardMaterial
          color="#FF10F0"
          emissive="#FF10F0"
          emissiveIntensity={0.6 * flicker}
          transparent
          opacity={0.5 * flicker}
          wireframe
        />
      </mesh>
      <Text
        ref={textRef}
        fontSize={0.12}
        color="#00FFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
};

// Enhanced Camera Controller
const CameraController = ({ mouseX, mouseY }) => {
  useFrame((state) => {
    // Smooth parallax based on mouse position
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouseX * 1.2,
      0.03
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouseY * 1.2,
      0.03
    );

    // Subtle idle orbit
    const time = state.clock.elapsedTime * 0.1;
    state.camera.position.x += Math.sin(time) * 0.01;
    state.camera.position.z = 6 + Math.cos(time) * 0.2;

    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main Tech Hologram Scene
const TechHologramScene = ({ mouseX, mouseY }) => {
  const techLogos = [
    { text: "REACT", color: "#00FFFF", radius: 2.5, speed: 0.3 },
    { text: "NODE", color: "#39FF14", radius: 3, speed: 0.25 },
    { text: "MONGO", color: "#FF10F0", radius: 2.8, speed: 0.35 },
    { text: "JS", color: "#FFD700", radius: 3.2, speed: 0.2 },
  ];

  const devices = [
    { pos: [2, 1, -2], type: "laptop", label: "DEVICE_LINKED" },
    { pos: [-2, -1, -1], type: "phone", label: "ONLINE" },
    { pos: [1.5, -2, 1], type: "server", label: "SERVER_ACTIVE" },
    { pos: [-1.8, 1.5, 0.5], type: "tablet", label: "CONNECTED" },
  ];

  return (
    <>
      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} color="#0088FF" />

      {/* Dynamic Point Lights */}
      <pointLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#00FFFF"
        distance={15}
      />
      <pointLight
        position={[-5, -5, -5]}
        intensity={1}
        color="#39FF14"
        distance={15}
      />

      {/* Orbiting Tech Logos */}
      {techLogos.map((logo, i) => (
        <OrbitingLogo
          key={`logo-${i}`}
          position={[0, 0, 0]}
          orbitSpeed={logo.speed}
          logoText={logo.text}
          color={logo.color}
          orbitRadius={logo.radius}
        />
      ))}

      {/* Network Graph */}
      <NetworkGraph mouseX={mouseX} mouseY={mouseY} />

      {/* Holographic Devices */}
      {devices.map((device, i) => (
        <DeviceHologram
          key={`device-${i}`}
          position={device.pos}
          deviceType={device.type}
          label={device.label}
        />
      ))}

      {/* Central Glow Sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#00FFFF"
          emissive="#00FFFF"
          emissiveIntensity={2}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Camera Controller */}
      <CameraController mouseX={mouseX} mouseY={mouseY} />
    </>
  );
};

// Main Hero Component
const Hero = () => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Full Stack Developer | AI Engineer | UI/UX Designer";
  const { playHover, playClick } = useSound();

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  // Typing animation
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Mouse move handler
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX / width - 0.5) * 2);
    mouseY.set(-(clientY / height - 0.5) * 2);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 flex items-center justify-center overflow-hidden bg-cyber-darker"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
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

      {/* Holographic Corner Brackets */}
      <div className="absolute top-20 left-10 w-20 h-20 border-l-2 border-t-2 border-neon-green opacity-60 animate-pulse" />
      <div className="absolute top-20 right-10 w-20 h-20 border-r-2 border-t-2 border-neon-cyan opacity-60 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-neon-pink opacity-60 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-neon-green opacity-60 animate-pulse" />

      {/* Floating HUD Rings */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-neon-cyan/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full border border-neon-green/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Content Container */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Status Indicator */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-neon-green text-sm font-mono uppercase tracking-wider">
                System Online
              </span>
            </motion.div>

            {/* Name with Glitch Effect */}
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl md:text-8xl font-bold mb-4 relative">
                <span className="text-gradient relative z-10">Musab</span>
                <motion.span
                  className="absolute top-0 left-0 text-neon-cyan opacity-20 blur-sm"
                  animate={{ x: [0, 2, 0, -2, 0] }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  Musab
                </motion.span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-neon-green via-neon-cyan to-transparent" />
            </motion.div>

            {/* Typing Subtitle */}
            <motion.div
              variants={itemVariants}
              className="font-mono text-lg md:text-xl h-16 flex items-center"
            >
              <span className="text-white/90">{text}</span>
              <span
                className={`ml-1 text-neon-green text-2xl ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              >
                ▊
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-white/70 text-lg max-w-xl leading-relaxed"
            >
              Crafting next-generation digital experiences with cutting-edge
              technology. Specializing in{" "}
              <span className="text-neon-green">MERN Stack</span>,{" "}
              <span className="text-neon-cyan">AI Integration</span>, and{" "}
              <span className="text-neon-pink">Immersive UI/UX</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link to="projects" smooth={true} duration={500}>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={playHover}
                  onClick={playClick}
                  style={{ rotateX, rotateY }}
                >
                  <Button variant="primary" size="lg" className="group">
                    <span>View Projects</span>
                    <IoArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>

              <Link to="contact" smooth={true} duration={500}>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={playHover}
                  onClick={playClick}
                  style={{ rotateX, rotateY }}
                >
                  <Button variant="secondary" size="lg">
                    <IoMail className="mr-2" />
                    Contact Me
                  </Button>
                </motion.div>
              </Link>

              <a href={RESUME_URL} download>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={playHover}
                  onClick={playClick}
                  style={{ rotateX, rotateY }}
                >
                  <Button variant="outline" size="lg">
                    <IoDownload className="mr-2" />
                    Download CV
                  </Button>
                </motion.div>
              </a>
            </motion.div>

            {/* Tech Stack Indicators */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              {["React", "Node.js", "AI", "Three.js"].map((tech, i) => (
                <div
                  key={tech}
                  className="px-4 py-2 glass-dark border border-neon-green/30 rounded text-xs font-mono"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {tech}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[400px] lg:h-[500px] hidden md:block"
          >
            {/* Canvas Container with Glow */}
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-radial from-neon-green/20 via-neon-cyan/10 to-transparent blur-3xl" />

              {/* 3D Canvas */}
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <Suspense fallback={null}>
                  <TechHologramScene
                    mouseX={mouseX.get()}
                    mouseY={mouseY.get()}
                  />
                </Suspense>
              </Canvas>

              {/* HUD Overlay */}
              <div className="absolute top-4 right-4 p-3 glass-dark border border-neon-cyan/30 rounded backdrop-blur-sm">
                <div className="text-xs font-mono text-neon-cyan space-y-1">
                  <div>STATUS: ACTIVE</div>
                  <div>RENDER: WEBGL</div>
                  <div>SYS: HOLOGRAM_V2</div>
                </div>
              </div>

              {/* Bottom HUD */}
              {/* <div className="absolute bottom-4 left-4 p-2 glass-dark border border-neon-green/30 rounded backdrop-blur-sm">
                <div className="text-xs font-mono text-neon-green">
                  TECH_STACK_ORBIT
                </div>
              </div> */}

              {/* Scan Lines Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.1) 2px, rgba(57, 255, 20, 0.1) 4px)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-neon-green to-transparent" />
        <p className="text-white/40 text-xs uppercase tracking-wider font-mono">
          Scroll
        </p>
      </motion.div>

      {/* Custom Styles */}
      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
