import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
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
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";
import toast from "react-hot-toast";
import api from "@utils/api.js";

// Addis Ababa — MapLibre GL + OpenFreeMap (no API key, no iframe)
const LocationMap = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [38.7636, 9.0054], // Addis Ababa [lng, lat]
      zoom: 12,
      attributionControl: false,
    });

    // Neon-green marker pin
    const el = document.createElement("div");
    el.style.cssText = `
      width: 18px; height: 18px;
      border-radius: 50%;
      background: #39FF14;
      border: 2px solid #fff;
      box-shadow: 0 0 12px #39FF14, 0 0 24px rgba(57,255,20,0.5);
    `;

    new maplibregl.Marker({ element: el })
      .setLngLat([38.7636, 9.0054])
      .setPopup(new maplibregl.Popup({ offset: 16 }).setText("Addis Ababa, Ethiopia"))
      .addTo(map);

    // Disable scroll zoom so page scrolling isn't hijacked
    map.scrollZoom.disable();

    return () => map.remove();
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Map container */}
      <div ref={containerRef} className="w-full h-full rounded-lg" />

      {/* HUD top-left */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
        <span className="text-[10px] font-mono text-neon-green uppercase tracking-wider bg-black/60 px-1.5 py-0.5 rounded">
          Addis Ababa, ET
        </span>
      </div>

      {/* HUD bottom-right */}
      <div className="absolute bottom-2 right-2 pointer-events-none z-10">
        <span className="text-[10px] font-mono text-neon-cyan/80 bg-black/60 px-1.5 py-0.5 rounded">
          9.0054° N · 38.7636° E
        </span>
      </div>

      {/* Neon border */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,255,255,0.25)" }}
      />
    </div>
  );
};

const ContactInfoItem = ({ icon: Icon, label, value, href, copyable, external }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const inner = (
    <div className="flex items-center gap-3 group">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg glass flex items-center justify-center text-neon-cyan group-hover:text-neon-green transition-colors flex-shrink-0">
        <Icon className="text-lg sm:text-xl" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/50 uppercase font-mono mb-0.5">{label}</p>
        <p className="text-white/90 font-medium text-sm sm:text-base truncate">{value}</p>
      </div>
      {copyable && (
        <button
          onClick={handleCopy}
          className="w-8 h-8 rounded glass flex items-center justify-center text-white/50 hover:text-neon-green transition-colors flex-shrink-0"
          aria-label="Copy to clipboard"
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
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        variants={FADE_IN_UP}
        whileHover={{ x: 4 }}
        className="block p-3 sm:p-4 glass-dark border border-white/10 rounded-lg hover:border-neon-green/50 transition-all"
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div variants={FADE_IN_UP} className="p-3 sm:p-4 glass-dark border border-white/10 rounded-lg">
      {inner}
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field, color = "neon-green") =>
    `w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-transparent focus:outline-none transition-all text-sm sm:text-base ${
      focusedField === field
        ? `border-${color} shadow-lg shadow-${color}/20`
        : "border-white/20"
    }`;

  const labelClass = (field, color = "text-neon-green") =>
    `absolute left-4 transition-all pointer-events-none font-mono text-xs ${
      formData[field] || focusedField === field
        ? `-top-2 px-2 bg-cyber-dark ${color}`
        : "top-3 text-white/50"
    }`;

  return (
    <section id="contact" className="section-padding bg-cyber-darker relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
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

      {/* Ambient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl pointer-events-none" />

      {/* HUD Corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neon-cyan/20 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-neon-green/20 pointer-events-none" />

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
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-green" />
              <span className="text-sm font-mono text-neon-green uppercase tracking-wider">Communication Terminal</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green" />
            </motion.div>

            <motion.h2 variants={FADE_IN_UP} className="section-title">Get In Touch</motion.h2>

            <motion.p variants={FADE_IN_UP} className="text-white/60 max-w-2xl mx-auto leading-relaxed mb-2">
              Have a project in mind? Let's build something extraordinary together
            </motion.p>

            <motion.p variants={FADE_IN_UP} className="text-neon-cyan text-sm font-mono">
              // Encrypted communication channel active
            </motion.p>
          </div>

          {/* Main Grid — stacks on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Globe + Contact Info */}
            <motion.div variants={FADE_IN_UP} className="space-y-6 sm:space-y-8">
              {/* Map */}
              <Card variant="glass" className="p-0 h-56 sm:h-72 lg:h-80 relative overflow-hidden">
                <LocationMap />
              </Card>

              {/* Contact Info */}
              <motion.div variants={STAGGER_CONTAINER} className="space-y-3 sm:space-y-4">
                <ContactInfoItem icon={IoMail} label="Email" value="mushas1248@gmail.com" href="mailto:mushas1248@gmail.com" copyable />
                <ContactInfoItem icon={IoCall} label="Phone" value="0948126868" href="tel:0948126868" copyable />
                <ContactInfoItem icon={FaTelegram} label="Telegram" value="@ramiso0" href="https://t.me/ramiso0" external />
                <ContactInfoItem icon={FaLinkedin} label="LinkedIn" value="Musab Hassen" href="https://www.linkedin.com/in/musab-hassen-b86247316" external />
                <ContactInfoItem icon={IoLocation} label="Location" value="Harar, Ethiopia" />
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div variants={FADE_IN_UP}>
              <Card variant="glass" className="p-5 sm:p-8 relative overflow-hidden">
                {/* Corner Brackets */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-neon-green/30" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-neon-cyan/30" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-neon-cyan/30" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-neon-green/30" />

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10">
                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={inputClass("name")}
                      placeholder="Name"
                    />
                    <label className={labelClass("name", "text-neon-green")}>Full Name</label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={inputClass("email", "neon-cyan")}
                      placeholder="Email"
                    />
                    <label className={labelClass("email", "text-neon-cyan")}>Email Address</label>
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={inputClass("subject", "neon-pink")}
                      placeholder="Subject"
                    />
                    <label className={labelClass("subject", "text-neon-pink")}>Subject</label>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className={`${inputClass("message")} resize-none`}
                      placeholder="Message"
                    />
                    <label className={labelClass("message", "text-neon-green")}>Your Message</label>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-cyan rounded-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                    <div className="relative px-6 sm:px-8 py-3 sm:py-4 glass border-2 border-neon-green rounded-lg text-neon-green font-bold uppercase tracking-wider flex items-center justify-center gap-3 group-hover:border-neon-cyan group-hover:text-neon-cyan transition-all text-sm sm:text-base">
                      {isSubmitting ? (
                        <>
                          <IoSend className="animate-spin" />
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

                  {/* Status */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    <span className="text-white/50">
                      Secure channel: <span className="text-neon-cyan">ACTIVE</span>
                    </span>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div variants={FADE_IN_UP} className="text-center mt-12 sm:mt-16">
            <p className="text-xl sm:text-2xl font-bold font-display text-gradient">
              Let's build something extraordinary.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-30 pointer-events-none" />

      <style>{`
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
