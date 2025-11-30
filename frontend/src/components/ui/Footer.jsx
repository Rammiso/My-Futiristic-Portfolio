import { motion } from "framer-motion";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Link } from "react-scroll";
import {
  IoMail,
  IoCall,
  IoHome,
  IoBriefcase,
  IoServer,
  IoChatbubbles,
} from "react-icons/io5";
import { FaTelegram, FaLinkedin, FaFacebook } from "react-icons/fa";
import * as THREE from "three";

// 3D Pulsing Light Orb
const PulsingOrb = () => {
  const orbRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (orbRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      orbRef.current.scale.set(pulse, pulse, pulse);

      // Subtle float
      orbRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }

    if (glowRef.current) {
      const glowPulse = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }
  });

  return (
    <group>
      <Sphere ref={orbRef} args={[0.5, 32, 32]}>
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.8} />
      </Sphere>
      <Sphere ref={glowRef} args={[0.7, 16, 16]}>
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.2} />
      </Sphere>
    </group>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", to: "hero", icon: IoHome },
    { name: "Projects", to: "projects", icon: IoBriefcase },
    { name: "Services", to: "services", icon: IoServer },
    { name: "Contact", to: "contact", icon: IoChatbubbles },
  ];

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:mushas1248@gmail.com",
      icon: IoMail,
      label: "mushas1248@gmail.com",
    },
    {
      name: "Phone",
      href: "tel:0948126868",
      icon: IoCall,
      label: "0948126868",
    },
    {
      name: "Telegram",
      href: "https://t.me/ramiso0",
      icon: FaTelegram,
      label: "@ramiso0",
      external: true,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/musab-hassen-b86247316",
      icon: FaLinkedin,
      label: "LinkedIn",
      external: true,
    },
    {
      name: "Facebook",
      href: "https://web.facebook.com/musab.ha.2025",
      icon: FaFacebook,
      label: "Facebook",
      external: true,
    },
  ];

  return (
    <footer className="relative bg-cyber-darker border-t border-white/10 overflow-hidden">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)",
          }}
        />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Top Neon Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />

      <div className="container-custom relative z-10 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Identity Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-start gap-4">
              {/* 3D Orb */}
              <div className="w-20 h-20 flex-shrink-0">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight
                      position={[5, 5, 5]}
                      intensity={1}
                      color="#00FFFF"
                    />
                    <PulsingOrb />
                  </Suspense>
                </Canvas>
              </div>

              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent mb-2">
                  Musab
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Engineering futuristic digital experiences.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-mono text-neon-green uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full" />
              Navigate
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="group flex items-center gap-2 text-white/70 hover:text-neon-cyan transition-colors cursor-pointer"
                  >
                    <link.icon className="text-sm group-hover:text-neon-green transition-colors" />
                    <span className="font-medium">{link.name}</span>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "1rem" }}
                      className="h-px bg-neon-cyan"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h4 className="text-sm font-mono text-neon-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-cyan rounded-full" />
              Connect
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group flex items-center gap-3 p-3 glass-dark border border-white/10 rounded-lg hover:border-neon-cyan/50 transition-all"
                >
                  <div className="w-8 h-8 rounded glass flex items-center justify-center text-white/70 group-hover:text-neon-cyan transition-colors">
                    <social.icon className="text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/50 uppercase font-mono">
                      {social.name}
                    </p>
                    <p className="text-sm text-white/80 truncate">
                      {social.label}
                    </p>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-neon-green flex-shrink-0"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-neon-cyan"
              />
              <p className="text-sm text-white/60">
                © {currentYear}{" "}
                <span className="text-neon-cyan font-semibold">Musab</span> —
                All Rights Reserved.
              </p>
            </div>

            {/* Built With */}
            <div className="flex items-center gap-2">
              <p className="text-sm text-white/60">
                Built with <span className="text-neon-pink">Passion</span> and{" "}
                <span className="text-neon-green">Love</span>
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-neon-pink"
              >
                ♥
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Corner Reticles */}
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-green/20" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-cyan/20" />
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-pink origin-left"
      />
    </footer>
  );
};

export default Footer;
