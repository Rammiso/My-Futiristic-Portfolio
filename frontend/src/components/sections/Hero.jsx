import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef, Suspense, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Box, Sphere, Torus } from "@react-three/drei";
import { IoDownload, IoMail, IoArrowForward } from "react-icons/io5";
import { Link } from "react-scroll";
import Button from "@components/ui/Button.jsx";
import { RESUME_URL } from "@utils/constants.js";
import * as THREE from "three";

// ==================== PERFORMANCE UTILITIES ====================

// Global singleton to store canvas instance
let canvasInstanceGlobal = null;

// Device performance detection
const detectDevicePerformance = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const memory = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 2;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  // GPU detection via canvas
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  const debugInfo = gl?.getExtension("WEBGL_debug_renderer_info");
  const renderer = debugInfo
    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    : "";

  // Categorize device
  if (isMobile || memory < 4 || cores < 4) {
    return { tier: "low", scale: 0.4, nodes: 10, fps: 30 };
  } else if (renderer.includes("Apple") || renderer.includes("Mali")) {
    return { tier: "medium", scale: 0.7, nodes: 20, fps: 45 };
  } else {
    return { tier: "high", scale: 1, nodes: 30, fps: 60 };
  }
};

const devicePerf = detectDevicePerformance();

// ==================== OPTIMIZED 3D COMPONENTS ====================

// Memoized Orbiting Logo (reduced calculations)
const OrbitingLogo = memo(
  ({ position, orbitSpeed, logoText, color, orbitRadius, qualityTier }) => {
    const meshRef = useRef();
    const textRef = useRef();
    let frameCount = 0;

    useFrame((state) => {
      // Skip frames on low-end devices
      if (qualityTier === "low" && frameCount++ % 2 !== 0) return;

      if (meshRef.current) {
        const time = state.clock.elapsedTime * orbitSpeed;
        meshRef.current.position.x = Math.cos(time) * orbitRadius + position[0];
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.5 + position[1];
        meshRef.current.position.z = Math.sin(time) * orbitRadius + position[2];
        meshRef.current.rotation.y = time * 0.5;
        meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;

        // Reduced pulse calculation
        if (qualityTier !== "low") {
          const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
          meshRef.current.scale.setScalar(pulse);
        }
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
            emissiveIntensity={qualityTier === "low" ? 0.4 : 0.8}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
        {qualityTier !== "low" && (
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
        )}
      </group>
    );
  }
);

OrbitingLogo.displayName = "OrbitingLogo";

// Optimized Network Graph
const NetworkGraph = memo(({ mouseX, mouseY, qualityTier }) => {
  const groupRef = useRef();
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  let frameCount = 0;

  const nodeCount = devicePerf.nodes;
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
    // Adaptive FPS
    if (qualityTier === "low" && frameCount++ % 2 !== 0) return;
    if (qualityTier === "medium" && frameCount++ % 3 === 0) return;

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.position.x = mouseX * 0.2;
      groupRef.current.position.y = mouseY * 0.2;
    }

    // Simplified animation for low-end
    if (qualityTier === "high") {
      nodesRef.current.forEach((node, i) => {
        if (node) {
          const pulse =
            1 +
            Math.sin(
              state.clock.elapsedTime * 2 + nodePositions[i].pulseOffset
            ) *
              0.3;
          node.scale.setScalar(pulse);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh
          key={`node-${i}`}
          position={[pos.x, pos.y, pos.z]}
          ref={(el) => (nodesRef.current[i] = el)}
        >
          <sphereGeometry
            args={[
              0.08,
              qualityTier === "low" ? 4 : 8,
              qualityTier === "low" ? 4 : 8,
            ]}
          />
          <meshStandardMaterial
            color="#00FFFF"
            emissive="#00FFFF"
            emissiveIntensity={qualityTier === "low" ? 0.8 : 1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Only show lines on medium/high devices */}
      {qualityTier !== "low" &&
        nodePositions.map((pos1, i) =>
          nodePositions.slice(i + 1).map((pos2, j) => {
            const distance = Math.sqrt(
              Math.pow(pos1.x - pos2.x, 2) +
                Math.pow(pos1.y - pos2.y, 2) +
                Math.pow(pos1.z - pos2.z, 2)
            );

            if (distance < 2.5 && Math.random() > 0.7) {
              // Reduce connections
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
});

NetworkGraph.displayName = "NetworkGraph";

// Simplified Device Hologram (only for high-end)
const DeviceHologram = memo(({ position, deviceType, label, qualityTier }) => {
  if (qualityTier === "low") return null; // Skip on low-end devices

  const meshRef = useRef();
  const textRef = useRef();
  const [flicker, setFlicker] = useState(1);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.rotation.y += 0.005;

      if (qualityTier === "high" && Math.random() > 0.98) {
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
      {qualityTier === "high" && (
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
      )}
    </group>
  );
});

DeviceHologram.displayName = "DeviceHologram";

// Optimized Camera Controller
const CameraController = memo(({ mouseX, mouseY }) => {
  useFrame((state) => {
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

    const time = state.clock.elapsedTime * 0.1;
    state.camera.position.x += Math.sin(time) * 0.01;
    state.camera.position.z = 6 + Math.cos(time) * 0.2;

    state.camera.lookAt(0, 0, 0);
  });

  return null;
});

CameraController.displayName = "CameraController";

// Progressive Loading Scene
const TechHologramScene = memo(({ mouseX, mouseY, isFullQuality }) => {
  const qualityTier = devicePerf.tier;

  const techLogos = [
    { text: "REACT", color: "#00FFFF", radius: 2.5, speed: 0.3 },
    { text: "NODE", color: "#39FF14", radius: 3, speed: 0.25 },
    ...(isFullQuality
      ? [
          { text: "MONGO", color: "#FF10F0", radius: 2.8, speed: 0.35 },
          { text: "JS", color: "#FFD700", radius: 3.2, speed: 0.2 },
        ]
      : []),
  ];

  const devices =
    qualityTier !== "low"
      ? [
          { pos: [2, 1, -2], type: "laptop", label: "DEVICE_LINKED" },
          { pos: [-2, -1, -1], type: "phone", label: "ONLINE" },
          ...(isFullQuality
            ? [
                { pos: [1.5, -2, 1], type: "server", label: "SERVER_ACTIVE" },
                { pos: [-1.8, 1.5, 0.5], type: "tablet", label: "CONNECTED" },
              ]
            : []),
        ]
      : [];

  return (
    <>
      <ambientLight
        intensity={qualityTier === "low" ? 0.6 : 0.4}
        color="#0088FF"
      />

      {qualityTier !== "low" && (
        <>
          <pointLight
            position={[5, 5, 5]}
            intensity={isFullQuality ? 1.5 : 1}
            color="#00FFFF"
            distance={15}
          />
          <pointLight
            position={[-5, -5, -5]}
            intensity={isFullQuality ? 1 : 0.7}
            color="#39FF14"
            distance={15}
          />
        </>
      )}

      {techLogos.map((logo, i) => (
        <OrbitingLogo
          key={`logo-${i}`}
          position={[0, 0, 0]}
          orbitSpeed={logo.speed}
          logoText={logo.text}
          color={logo.color}
          orbitRadius={logo.radius}
          qualityTier={qualityTier}
        />
      ))}

      <NetworkGraph mouseX={mouseX} mouseY={mouseY} qualityTier={qualityTier} />

      {devices.map((device, i) => (
        <DeviceHologram
          key={`device-${i}`}
          position={device.pos}
          deviceType={device.type}
          label={device.label}
          qualityTier={qualityTier}
        />
      ))}

      {isFullQuality && (
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
      )}

      <CameraController mouseX={mouseX} mouseY={mouseY} />
    </>
  );
});

TechHologramScene.displayName = "TechHologramScene";

// Sound Effects (unchanged)
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

// ==================== MAIN HERO COMPONENT ====================

const Hero = () => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isFullQuality, setIsFullQuality] = useState(false);
  const fullText = "Full Stack Developer | AI Engineer | UI/UX Designer";
  const { playHover, playClick } = useSound();

  // In-memory canvas persistence
  const canvasRef = useRef(null);
  const sceneLoadedRef = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  // Progressive loading: lite -> full quality after 1.5s
  useEffect(() => {
    const qualityTimer = setTimeout(() => {
      setIsFullQuality(true);
    }, 1500);

    return () => clearTimeout(qualityTimer);
  }, []);

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

          {/* Right 3D Scene - OPTIMIZED WITH IN-MEMORY PERSISTENCE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[400px] lg:h-[500px] hidden md:block"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-neon-green/20 via-neon-cyan/10 to-transparent blur-3xl" />

              {/* Loading Placeholder - Shows until canvas is ready */}
              {!isFullQuality && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isFullQuality ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center bg-cyber-card/30 backdrop-blur-sm"
                >
                  {/* Animated Loading Indicator */}
                  <div className="relative">
                    {/* Pulsing Circle */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full border-2 border-neon-green/50 blur-sm"
                    />

                    {/* Spinning Ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-32 h-32 rounded-full border-t-2 border-r-2 border-neon-cyan/70"
                    />

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">⚡</div>
                        <div className="text-xs font-mono text-neon-green animate-pulse">
                          Loading 3D Scene...
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3D Canvas - LOADS ONCE, PERSISTS IN MEMORY */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isFullQuality ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Canvas
                  ref={canvasRef}
                  camera={{ position: [0, 0, 6], fov: 50 }}
                  dpr={devicePerf.scale} // Adaptive resolution
                  frameloop="demand" // Only render when needed
                  performance={{ min: 0.5 }} // Throttle on slow devices
                >
                  <Suspense fallback={null}>
                    <TechHologramScene
                      mouseX={mouseX.get()}
                      mouseY={mouseY.get()}
                      isFullQuality={isFullQuality}
                    />
                  </Suspense>
                </Canvas>
              </motion.div>

              {/* HUD Overlay */}
              <div className="absolute top-4 right-4 p-3 glass-dark border border-neon-cyan/30 rounded backdrop-blur-sm">
                <div className="text-xs font-mono text-neon-cyan space-y-1">
                  <div>STATUS: ACTIVE</div>
                  <div>RENDER: WEBGL</div>
                  <div>SYS: HOLOGRAM_V2</div>
                </div>
              </div>

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
