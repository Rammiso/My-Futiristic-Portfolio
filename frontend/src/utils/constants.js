// ==================== RESUME/CV ====================
import resumePdf from "@/assets/RESUME.pdf";
export const RESUME_URL = resumePdf;

// API Base URL
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:10000/api";

// Navigation Links
export const NAV_LINKS = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "services", label: "Services", href: "#services" },
  { id: "ai-playground", label: "AI Playground", href: "#ai-playground" },
  { id: "contact", label: "Contact", href: "#contact" },
];

// Skills Categories
export const SKILLS = {
  frontend: [
    { name: "React", level: 95, icon: "⚛️" },
    { name: "JavaScript", level: 95, icon: "🟨" },
    { name: "HTML/CSS", level: 98, icon: "🎨" },
    { name: "TailwindCSS", level: 90, icon: "💨" },
    { name: "Framer Motion", level: 85, icon: "🎭" },
  ],
  backend: [
    { name: "Node.js", level: 90, icon: "🟢" },
    { name: "Express", level: 90, icon: "🚂" },
    { name: "MongoDB", level: 88, icon: "🍃" },
    { name: "REST APIs", level: 92, icon: "🔌" },
    { name: "JWT Auth", level: 85, icon: "🔐" },
  ],
  tools: [
    { name: "Git", level: 90, icon: "📦" },
    { name: "Vite", level: 85, icon: "⚡" },
    { name: "Postman", level: 88, icon: "📮" },
    { name: "VS Code", level: 95, icon: "💻" },
    { name: "Figma", level: 80, icon: "🎨" },
  ],
  other: [
    { name: "UI/UX Design", level: 87, icon: "✨" },
    { name: "AI Integration", level: 82, icon: "🤖" },
    { name: "Mobile Dev", level: 75, icon: "📱" },
    { name: "SEO", level: 78, icon: "🔍" },
    { name: "Performance", level: 85, icon: "⚡" },
  ],
};

// Services Offered
export const SERVICES = [
  {
    id: "mern-development",
    title: "MERN Stack Development",
    description:
      "Full-stack web applications using MongoDB, Express, React, and Node.js. Scalable, secure, and performant solutions.",
    icon: "🚀",
    features: [
      "Custom Web Apps",
      "RESTful APIs",
      "Database Design",
      "Authentication",
      "Deployment",
    ],
  },
  {
    id: "ai-solutions",
    title: "AI Integration",
    description:
      "Integrate cutting-edge AI capabilities into your applications. From chatbots to image generation.",
    icon: "🤖",
    features: [
      "OpenAI Integration",
      "Custom AI Models",
      "Chatbot Development",
      "AI Analytics",
      "Automation",
    ],
  },
  {
    id: "uiux-design",
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces that delight users. Modern design systems with accessibility in mind.",
    icon: "🎨",
    features: [
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Responsive Design",
      "User Research",
    ],
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications with React Native. Native performance, unified codebase.",
    icon: "📱",
    features: [
      "React Native",
      "iOS & Android",
      "Push Notifications",
      "Offline Support",
      "App Store Deploy",
    ],
  },
];

// Social Links
export const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/yourusername", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "linkedin",
  },
  { name: "Twitter", url: "https://twitter.com/yourusername", icon: "twitter" },
  { name: "Email", url: "mailto:your.email@example.com", icon: "email" },
];

// Contact Info
export const CONTACT_INFO = {
  email: "your.email@example.com",
  phone: "+1 (123) 456-7890",
  location: "Your City, Country",
};

// Animation Variants for Framer Motion
export const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const SLIDE_IN_LEFT = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const SLIDE_IN_RIGHT = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const SCALE_IN = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
