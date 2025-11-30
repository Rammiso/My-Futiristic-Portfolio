import { motion } from "framer-motion";

const Loader = ({ size = "md", text = "" }) => {
  const sizes = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizes[size]} loading-spinner`} />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/70 text-sm"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
