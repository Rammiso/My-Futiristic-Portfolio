import { motion } from "framer-motion";
import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-semibold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-transparent border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black [&>*]:hover:text-black",
    secondary:
      "bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-cyber-darker hover:text-neon-cyan [&>*]:hover:text-neon-cyan secondary-button",
    outline:
      "bg-transparent border-2 border-white/20 hover:border-neon-green hover:text-neon-green",
    solid: "bg-neon-green text-black border-2 border-neon-green hover:bg-transparent hover:text-neon-green hover:border-neon-green"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <>
      <style>{`
        .secondary-button:hover {
          border-color: #39ff14 !important;
        }
      `}</style>
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    </>
  );
};

export default Button;
