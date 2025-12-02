import { motion } from "framer-motion";
import { useState, memo } from "react";
import { useInView } from "react-intersection-observer";
import Card from "@components/ui/Card.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";

// Optimized Skill Card Component with CSS Glow Effect
const SkillCard = memo(({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getColorByProficiency = (level) => {
    if (level >= 90) return "#39FF14"; // Green
    if (level >= 75) return "#00FFFF"; // Cyan
    if (level >= 60) return "#FF10F0"; // Pink
    return "#FFA500"; // Orange
  };

  const color = getColorByProficiency(skill.proficiency);

  return (
    <motion.div
      ref={ref}
      variants={FADE_IN_UP}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card
          variant="glass"
          className={`p-4 relative overflow-hidden transition-all duration-300 ${
            isHovered ? "border-neon-green/60" : "border-white/10"
          }`}
        >
          {/* Futuristic Glow Effect on Hover */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            className="absolute -inset-4 blur-2xl opacity-0"
            style={{
              background: `radial-gradient(circle at center, ${color}40, transparent 70%)`,
            }}
          />

          {/* Animated Ring Effect */}
          <motion.div
            animate={{
              opacity: isHovered ? [0, 1, 0] : 0,
              scale: isHovered ? [0.8, 1.2, 1.4] : 0.8,
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-lg"
            style={{
              border: `2px solid ${color}`,
              opacity: 0.3,
            }}
          />

          {/* Corner Brackets */}
          <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-neon-green/30" />
          <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-neon-cyan/30" />

          {/* Floating Orb Above Card (CSS Only) */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.5 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [-10, -60, -60, -80],
                scale: [0.5, 1, 1, 0.8],
              }}
              transition={{
                duration: 2,
                times: [0, 0.3, 0.7, 1],
                ease: "easeOut",
              }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full pointer-events-none z-20"
              style={{
                background: `radial-gradient(circle, ${color}FF, ${color}80 40%, transparent 70%)`,
                boxShadow: `0 0 40px ${color}, 0 0 80px ${color}60, inset 0 0 20px ${color}`,
                filter: "blur(1px)",
              }}
            >
              {/* Inner glow */}
              <div
                className="absolute inset-2 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${color}FF, transparent)`,
                  animation: "pulse 1s ease-in-out infinite",
                }}
              />
            </motion.div>
          )}

          {/* Skill Icon/Name */}
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <motion.div
              animate={{
                boxShadow: isHovered
                  ? `0 0 20px ${color}, 0 0 40px ${color}60`
                  : `0 0 0px ${color}`,
              }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-lg flex items-center justify-center glass text-2xl relative"
              style={{
                background: isHovered
                  ? `linear-gradient(135deg, ${color}20, transparent)`
                  : "transparent",
              }}
            >
              {skill.icon || "⚡"}

              {/* Particle effect */}
              {isHovered && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (i - 1) * 20],
                        y: [0, -20 - i * 10],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </>
              )}
            </motion.div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white">{skill.name}</h4>
            </div>
          </div>

          {/* Proficiency Bar - Optimized */}
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/50 font-mono">LEVEL</span>
              <span className="text-xs font-bold" style={{ color }}>
                {skill.proficiency}%
              </span>
            </div>

            <div className="relative h-2 bg-cyber-card/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={
                  inView ? { width: `${skill.proficiency}%` } : { width: 0 }
                }
                transition={{
                  duration: 1.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${color}, ${color}99)`,
                  boxShadow: `0 0 10px ${color}`,
                  willChange: "width",
                }}
              />

              {/* Animated Shimmer */}
              <motion.div
                animate={{
                  x: [-20, 200],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm"
              />
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 mt-3 relative z-10">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-mono uppercase" style={{ color }}>
              {skill.proficiency >= 90
                ? "Expert"
                : skill.proficiency >= 75
                ? "Advanced"
                : "Proficient"}
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

      {/* CSS Keyframes for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

// Category Header Component
const CategoryHeader = ({ title, icon, color = "#39FF14" }) => {
  return (
    <motion.div variants={FADE_IN_UP} className="relative mb-8">
      <div className="flex items-center gap-4">
        <motion.div
          animate={{
            boxShadow: [
              `0 0 10px ${color}`,
              `0 0 20px ${color}`,
              `0 0 10px ${color}`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-12 rounded-full"
          style={{ backgroundColor: color }}
        />

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
          <div className="h-px mt-2 bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border border-white/20 rounded-lg"
        />
      </div>

      {/* Hologram Effect */}
      <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </motion.div>
  );
};

// Main Skills Component
const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "⚛️",
      color: "#39FF14",
      skills: [
        { name: "React.js", proficiency: 95, icon: "⚛️" },
        { name: "JavaScript", proficiency: 92, icon: "📜" },
        { name: "TailwindCSS", proficiency: 90, icon: "🎨" },
        { name: "Framer Motion", proficiency: 88, icon: "🎬" },
        { name: "Three.js", proficiency: 62, icon: "🎲" },
        { name: "HTML5/CSS3", proficiency: 95, icon: "🌐" },
      ],
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      color: "#00FFFF",
      skills: [
        { name: "Node.js", proficiency: 93, icon: "🟢" },
        { name: "Express.js", proficiency: 90, icon: "🚂" },
        { name: "MongoDB", proficiency: 80, icon: "🍃" },
        { name: "REST APIs", proficiency: 92, icon: "🔌" },
        { name: "JWT Auth", proficiency: 85, icon: "🔐" },
        { name: "Mongoose", proficiency: 87, icon: "🦡" },
      ],
    },
    {
      title: "Tools & Technologies",
      icon: "🛠️",
      color: "#FF10F0",
      skills: [
        { name: "Git & GitHub", proficiency: 90, icon: "📦" },
        { name: "VS Code", proficiency: 95, icon: "💻" },
        { name: "Postman", proficiency: 88, icon: "📮" },
        { name: "Figma", proficiency: 60, icon: "🎨" },
        { name: "Vercel/Netlify", proficiency: 85, icon: "🚀" },
      ],
    },
    {
      title: "AI & Emerging Tech",
      icon: "🤖",
      color: "#FFA500",
      skills: [
        { name: "OpenAI API", proficiency: 85, icon: "🧠" },
        { name: "Prompt Engineering", proficiency: 88, icon: "💬" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="section-padding bg-cyber-darker relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl" />

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
                Technical Expertise
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green" />
            </motion.div>

            <motion.h2 variants={FADE_IN_UP} className="section-title">
              Skills & Technologies
            </motion.h2>

            <motion.p
              variants={FADE_IN_UP}
              className="text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
              A comprehensive arsenal of modern technologies and frameworks
            </motion.p>
          </div>

          {/* Skills Grid by Category */}
          <div className="space-y-16">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                variants={STAGGER_CONTAINER}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <CategoryHeader
                  title={category.title}
                  icon={category.icon}
                  color={category.color}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skillIndex}
                      skill={skill}
                      index={skillIndex}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Summary */}
          <motion.div
            variants={FADE_IN_UP}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Technologies", value: "20+", color: "#39FF14" },
              { label: "Years Experience", value: "3+", color: "#00FFFF" },
              { label: "Projects Built", value: "10+", color: "#FF10F0" },
              { label: "Learning", value: "Always", color: "#FFA500" },
            ].map((stat, i) => (
              <Card
                key={i}
                variant="glass"
                className="p-6 text-center relative overflow-hidden group"
              >
                <motion.div
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute inset-0 blur-xl"
                  style={{ backgroundColor: `${stat.color}20` }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="text-4xl font-bold mb-2"
                    style={{ color: stat.color }}
                    animate={{
                      textShadow: [
                        `0 0 10px ${stat.color}`,
                        `0 0 20px ${stat.color}`,
                        `0 0 10px ${stat.color}`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
