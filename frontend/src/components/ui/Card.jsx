import { motion } from "framer-motion";
import clsx from "clsx";

const Card = ({
  children,
  className = "",
  variant = "glass",
  hover = true,
  ...props
}) => {
  const variants = {
    glass: "glass",
    "glass-dark": "glass-dark",
    solid: "bg-cyber-card border border-white/10",
    neon: "bg-cyber-card/50 border-2 border-neon-green/30 hover:border-neon-green/60",
  };

  const hoverEffect = hover
    ? {
        scale: 1.02,
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <motion.div
      className={clsx(
        "rounded-lg p-6 transition-all duration-300",
        variants[variant],
        className
      )}
      whileHover={hoverEffect}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
