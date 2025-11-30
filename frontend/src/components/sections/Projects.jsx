import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoGlobe, IoLogoGithub, IoApps } from "react-icons/io5";
import Card from "@components/ui/Card.jsx";
import Button from "@components/ui/Button.jsx";
import Modal from "@components/ui/Modal.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";

// Project Data
const projectsData = [
  {
    id: 1,
    title: "MGSA Digital Hub",
    subtitle: "Community-Driven Educational Platform",
    description:
      "A futuristic community platform engineered for the Murti Guuto Student Association at Haramaya University. Features an advanced academic resources system, collaborative knowledge-sharing hub, student support network, and digital mentorship ecosystem. Built to empower students through unified data structures and real-time collaboration protocols.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB", "TailwindCSS", "Express"],
    category: "Web",
    liveUrl: "https://murti-guutoo-student-association-v1.vercel.app/",
    githubUrl: "#",
    featured: true,
    color: "#39FF14",
  },
  {
    id: 2,
    title: "WealthLog Analytics",
    subtitle: "AI-Powered Financial Intelligence Platform",
    description:
      "Next-generation personal finance management system with quantum-level analytics. Real-time expense tracking, predictive savings insights, portfolio analytics, and autonomous budget optimization. Engineered with MERN stack and powered by intelligent data visualization algorithms.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Chart.js", "AI"],
    category: "MERN",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    color: "#00FFFF",
  },
  {
    id: 3,
    title: "Islamic Knowledge Matrix",
    subtitle: "Interactive Learning System",
    description:
      "Advanced knowledge-testing platform with intelligent categorization, adaptive scoring algorithms, and ultra-responsive UX. Features multi-tier difficulty progression, instant feedback systems, and gamified learning pathways designed for optimal knowledge retention.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    technologies: ["React", "JavaScript", "Firebase", "TailwindCSS"],
    category: "Web",
    liveUrl: "#",
    githubUrl: "https://github.com/Rammiso/Ramiso-Islamic-Quiz",
    featured: false,
    color: "#FF10F0",
  },
  {
    id: 4,
    title: "Izharul Haq Automation Core",
    subtitle: "Intelligent Task Orchestration Bot",
    description:
      "Autonomous automation engine designed for workflow optimization and intelligent auto-response systems. Handles complex task sequences, smart scheduling, and adaptive decision-making protocols. Built with advanced scripting and API integration architecture.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    technologies: ["Python", "APIs", "Automation", "Node.js"],
    category: "Automation",
    liveUrl: "#",
    githubUrl: "https://github.com/Rammiso/Izharul-Haq---Bot-Automation-App",
    featured: false,
    color: "#FFA500",
  },
  {
    id: 5,
    title: "Per Diem Command Center",
    subtitle: "Enterprise Financial Management System",
    description:
      "Sophisticated web-based platform for organizational per-diem workflows. Features request submission portals, multi-tier approval systems, real-time tracking dashboards, and comprehensive financial reporting. Engineered for scalability and security compliance.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    category: "Web",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    color: "#39FF14",
  },
  {
    id: 6,
    title: "NeuralDoc AI Assistant",
    subtitle: "LLM-Powered Document Intelligence",
    description:
      "Advanced AI document analysis platform leveraging large language models for intelligent content extraction, semantic search, and automated summarization. Features vector embeddings, RAG architecture, and real-time AI responses with context-aware processing.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    technologies: [
      "React",
      "OpenAI",
      "LangChain",
      "Vector DB",
      "Python",
      "FastAPI",
    ],
    category: "AI",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    color: "#00FFFF",
  },
  {
    id: 7,
    title: "QuantumTask Mobile",
    subtitle: "Cross-Platform Productivity Suite",
    description:
      "Next-gen mobile productivity application with offline-first architecture, real-time sync, smart notifications, and AI-powered task prioritization. Built with React Native for seamless iOS and Android experiences with native performance.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    technologies: ["React Native", "TypeScript", "Firebase", "AI", "Redux"],
    category: "Mobile",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    color: "#FF10F0",
  },
  {
    id: 8,
    title: "CloudSync Enterprise",
    subtitle: "Distributed SaaS Infrastructure",
    description:
      "Scalable multi-tenant SaaS platform with microservices architecture, real-time collaboration, advanced RBAC, and enterprise-grade security. Features automated deployment pipelines, load balancing, and distributed caching for optimal performance.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "AWS",
    ],
    category: "MERN",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    color: "#39FF14",
  },
];

// Project Card Component (WITHOUT 3D Canvas to prevent WebGL overflow)
const ProjectCard = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={FADE_IN_UP}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group cursor-pointer h-full"
    >
      <Card
        variant="glass"
        className={`p-0 h-full overflow-hidden transition-all duration-500 ${
          isHovered
            ? "border-neon-green/60 shadow-2xl shadow-neon-green/20"
            : "border-white/10"
        }`}
      >
        {/* Image Preview */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-radial from-neon-green/30 via-transparent to-transparent z-10"
          />

          {/* Project Image */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-10 z-30">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.2) 2px, rgba(57, 255, 20, 0.2) 4px)",
              }}
            />
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 z-30 px-3 py-1 glass-dark border border-neon-green/50 rounded-full"
            >
              <span className="text-xs font-mono text-neon-green uppercase">
                Featured
              </span>
            </motion.div>
          )}

          {/* Corner Brackets */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neon-green/40 z-30" />
          <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neon-cyan/40 z-30" />
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <span
              className="text-xs font-mono uppercase"
              style={{ color: project.color }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-green transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-white/50 mb-3">{project.subtitle}</p>

          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs glass-dark border border-white/10 rounded font-mono text-white/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs glass-dark border border-white/10 rounded font-mono text-neon-green">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <IoGlobe className="mr-2" />
                  Live Demo
                </Button>
              </a>
            )}
            {project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <IoLogoGithub className="mr-2" />
                  GitHub
                </Button>
              </a>
            )}
          </div>

          {/* Hover Glow */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-radial from-neon-green/10 via-transparent to-transparent blur-xl pointer-events-none"
          />
        </div>
      </Card>
    </motion.div>
  );
};

// Main Projects Component
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "MERN", "Web", "Mobile", "AI", "Automation"];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="section-padding bg-cyber-dark relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              variants={FADE_IN_UP}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan" />
              <span className="text-sm font-mono text-neon-cyan uppercase tracking-wider">
                Mission Archive
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan" />
            </motion.div>

            <motion.h2 variants={FADE_IN_UP} className="section-title">
              Featured Projects
            </motion.h2>

            <motion.p
              variants={FADE_IN_UP}
              className="text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
              A showcase of innovative solutions and cutting-edge applications
            </motion.p>
          </div>

          {/* Category Filters */}
          <motion.div
            variants={FADE_IN_UP}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === category
                    ? "glass border-2 border-neon-green text-neon-green shadow-lg shadow-neon-green/20"
                    : "glass-dark border border-white/10 text-white/60 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <IoApps className="text-xs" />
                  {category}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={STAGGER_CONTAINER}
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/40 text-lg">
                No projects found in this category
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Modal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            title={selectedProject.title}
            size="xl"
          >
            <div className="space-y-6">
              {/* Project Image */}
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Subtitle */}
              <p className="text-neon-cyan text-lg font-semibold">
                {selectedProject.subtitle}
              </p>

              {/* Description */}
              <p className="text-white/70 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              <div>
                <h4 className="text-sm font-mono text-neon-green uppercase mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 glass-dark border border-neon-green/30 rounded text-sm font-mono text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {selectedProject.liveUrl !== "#" && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="primary" size="lg" className="w-full">
                      <IoGlobe className="mr-2" />
                      View Live Demo
                    </Button>
                  </a>
                )}
                {selectedProject.githubUrl !== "#" && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="secondary" size="lg" className="w-full">
                      <IoLogoGithub className="mr-2" />
                      View Source
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
