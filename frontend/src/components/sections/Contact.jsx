import { motion } from "framer-motion";
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import {
  IoMail,
  IoCall,
  IoLocation,
  IoCopy,
  IoCheckmark,
  IoSend,
  IoPaperPlane,
} from "react-icons/io5";
import { FaTelegram, FaLinkedin } from "react-icons/fa";
import Card from "@components/ui/Card.jsx";
import Button from "@components/ui/Button.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";
import toast from "react-hot-toast";
import * as THREE from "three";

// 3D Holographic Globe
const HolographicGlobe = () => {
  const globeRef = useRef();
  const ringsRef = useRef([]);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }

    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = state.clock.elapsedTime * (0.2 + i * 0.1);
        ring.rotation.z = state.clock.elapsedTime * (0.15 + i * 0.05);
      }
    });
  });

  // Create latitude/longitude grid lines
  const gridLines = [];
  const segments = 24;

  // Latitude lines
  for (let i = 0; i <= segments; i++) {
    const lat = (Math.PI * i) / segments;
    const points = [];
    for (let j = 0; j <= segments * 2; j++) {
      const lon = (Math.PI * 2 * j) / (segments * 2);
      const x = 1.5 * Math.sin(lat) * Math.cos(lon);
      const y = 1.5 * Math.cos(lat);
      const z = 1.5 * Math.sin(lat) * Math.sin(lon);
      points.push(new THREE.Vector3(x, y, z));
    }
    gridLines.push(points);
  }

  // Longitude lines
  for (let i = 0; i < segments; i++) {
    const lon = (Math.PI * 2 * i) / segments;
    const points = [];
    for (let j = 0; j <= segments; j++) {
      const lat = (Math.PI * j) / segments;
      const x = 1.5 * Math.sin(lat) * Math.cos(lon);
      const y = 1.5 * Math.cos(lat);
      const z = 1.5 * Math.sin(lat) * Math.sin(lon);
      points.push(new THREE.Vector3(x, y, z));
    }
    gridLines.push(points);
  }

  return (
    <group>
      {/* Main Globe */}
      <Sphere ref={globeRef} args={[1.5, 32, 32]}>
        <meshBasicMaterial
          color="#00FFFF"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Grid Lines */}
      {gridLines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#39FF14"
          lineWidth={0.5}
          transparent
          opacity={0.2}
        />
      ))}

      {/* Location Marker (Harar, Ethiopia) */}
      <Sphere position={[0.8, 0.3, 1.2]} args={[0.08, 16, 16]}>
        <meshBasicMaterial color="#FF10F0" />
      </Sphere>

      {/* Orbital Rings */}
      {[2, 2.5, 3].map((radius, i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial
            color={i === 0 ? "#39FF14" : i === 1 ? "#00FFFF" : "#FF10F0"}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      {/* Ambient Glow */}
      <Sphere args={[3.5, 32, 32]}>
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.05} />
      </Sphere>
    </group>
  );
};

// Contact Info Item
const ContactInfoItem = ({
  icon: Icon,
  label,
  value,
  href,
  copyable,
  telegram,
  linkedin,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const content = (
    <div className="flex items-center gap-4 group">
      <div className="w-12 h-12 rounded-lg glass flex items-center justify-center text-neon-cyan group-hover:text-neon-green transition-colors">
        <Icon className="text-xl" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-white/50 uppercase font-mono mb-1">
          {label}
        </p>
        <p className="text-white/90 font-medium">{value}</p>
      </div>
      {copyable && (
        <button
          onClick={handleCopy}
          className="w-8 h-8 rounded glass flex items-center justify-center text-white/50 hover:text-neon-green transition-colors"
        >
          {copied ? <IoCheckmark /> : <IoCopy />}
        </button>
      )}
    </div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={telegram || linkedin ? "_blank" : undefined}
        rel={telegram || linkedin ? "noopener noreferrer" : undefined}
        variants={FADE_IN_UP}
        whileHover={{ x: 5 }}
        className="block p-4 glass-dark border border-white/10 rounded-lg hover:border-neon-green/50 transition-all"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      variants={FADE_IN_UP}
      className="p-4 glass-dark border border-white/10 rounded-lg"
    >
      {content}
    </motion.div>
  );
};

// Main Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding bg-cyber-darker relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl" />

      {/* HUD Corner Elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-neon-cyan/20" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-neon-green/20" />

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
                Communication Terminal
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green" />
            </motion.div>

            <motion.h2 variants={FADE_IN_UP} className="section-title">
              Get In Touch
            </motion.h2>

            <motion.p
              variants={FADE_IN_UP}
              className="text-white/60 max-w-2xl mx-auto leading-relaxed mb-2"
            >
              Have a project in mind? Let's build something extraordinary
              together
            </motion.p>

            <motion.p
              variants={FADE_IN_UP}
              className="text-neon-cyan text-sm font-mono"
            >
              // Encrypted communication channel active
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: 3D Globe + Contact Info */}
            <motion.div variants={FADE_IN_UP} className="space-y-8">
              {/* 3D Holographic Globe */}
              <Card
                variant="glass"
                className="p-8 h-80 relative overflow-hidden"
              >
                <div className="absolute inset-0">
                  <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.5} />
                      <pointLight
                        position={[10, 10, 10]}
                        intensity={1}
                        color="#00FFFF"
                      />
                      <pointLight
                        position={[-10, -10, -10]}
                        intensity={0.5}
                        color="#39FF14"
                      />
                      <HolographicGlobe />
                    </Suspense>
                  </Canvas>
                </div>

                {/* Scanning Line Effect */}
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"
                />
              </Card>

              {/* Contact Information */}
              <motion.div variants={STAGGER_CONTAINER} className="space-y-4">
                <ContactInfoItem
                  icon={IoMail}
                  label="Email"
                  value="mushas1248@gmail.com"
                  href="mailto:mushas1248@gmail.com"
                  copyable
                />
                <ContactInfoItem
                  icon={IoCall}
                  label="Phone"
                  value="0948126868"
                  href="tel:0948126868"
                  copyable
                />
                <ContactInfoItem
                  icon={FaTelegram}
                  label="Telegram"
                  value="@ramiso0"
                  href="https://t.me/ramiso0"
                  telegram
                />
                <ContactInfoItem
                  icon={FaLinkedin}
                  label="LinkedIn"
                  value="Musab Hassen"
                  href="https://www.linkedin.com/in/musab-hassen-b86247316"
                  linkedin
                />
                <ContactInfoItem
                  icon={IoLocation}
                  label="Location"
                  value="Harar, Ethiopia"
                />
              </motion.div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div variants={FADE_IN_UP}>
              <Card variant="glass" className="p-8 relative overflow-hidden">
                {/* Corner Brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-neon-green/30" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/30" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-cyan/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-green/30" />

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  {/* Name Field */}
                  <div className="relative">
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      whileFocus={{ scale: 1.01 }}
                      className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-transparent focus:outline-none transition-all ${
                        focusedField === "name"
                          ? "border-neon-green shadow-lg shadow-neon-green/20"
                          : "border-white/20"
                      }`}
                      placeholder="Name"
                    />
                    <label
                      className={`absolute left-4 transition-all pointer-events-none font-mono text-xs ${
                        formData.name || focusedField === "name"
                          ? "-top-2 px-2 bg-cyber-dark text-neon-green"
                          : "top-3 text-white/50"
                      }`}
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      whileFocus={{ scale: 1.01 }}
                      className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-transparent focus:outline-none transition-all ${
                        focusedField === "email"
                          ? "border-neon-cyan shadow-lg shadow-neon-cyan/20"
                          : "border-white/20"
                      }`}
                      placeholder="Email"
                    />
                    <label
                      className={`absolute left-4 transition-all pointer-events-none font-mono text-xs ${
                        formData.email || focusedField === "email"
                          ? "-top-2 px-2 bg-cyber-dark text-neon-cyan"
                          : "top-3 text-white/50"
                      }`}
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Subject Field */}
                  <div className="relative">
                    <motion.input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      required
                      whileFocus={{ scale: 1.01 }}
                      className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-transparent focus:outline-none transition-all ${
                        focusedField === "subject"
                          ? "border-neon-pink shadow-lg shadow-neon-pink/20"
                          : "border-white/20"
                      }`}
                      placeholder="Subject"
                    />
                    <label
                      className={`absolute left-4 transition-all pointer-events-none font-mono text-xs ${
                        formData.subject || focusedField === "subject"
                          ? "-top-2 px-2 bg-cyber-dark text-neon-pink"
                          : "top-3 text-white/50"
                      }`}
                    >
                      Subject
                    </label>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={6}
                      whileFocus={{ scale: 1.01 }}
                      className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-transparent focus:outline-none resize-none transition-all ${
                        focusedField === "message"
                          ? "border-neon-green shadow-lg shadow-neon-green/20"
                          : "border-white/20"
                      }`}
                      placeholder="Message"
                    />
                    <label
                      className={`absolute left-4 transition-all pointer-events-none font-mono text-xs ${
                        formData.message || focusedField === "message"
                          ? "-top-2 px-2 bg-cyber-dark text-neon-green"
                          : "top-3 text-white/50"
                      }`}
                    >
                      Your Message
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-cyan rounded-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                    <div className="relative px-8 py-4 glass border-2 border-neon-green rounded-lg text-neon-green font-bold uppercase tracking-wider flex items-center justify-center gap-3 group-hover:border-neon-cyan group-hover:text-neon-cyan transition-all">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <IoSend />
                          </motion.div>
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <IoPaperPlane />
                          Send Message
                        </>
                      )}
                    </div>
                  </motion.button>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-neon-cyan"
                    />
                    <span className="text-white/50">
                      Secure channel:{" "}
                      <span className="text-neon-cyan">ACTIVE</span>
                    </span>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div variants={FADE_IN_UP} className="text-center mt-16">
            <p className="text-2xl font-bold bg-gradient-to-r from-neon-green via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              Let's build something extraordinary.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-30" />
    </section>
  );
};

export default Contact;
