import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-t-transparent border-b-transparent relative"
        style={{
          borderLeftColor: "#8B5CF6",
          borderRightColor: "#EC4899",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent"
          style={{
            borderLeftColor: "#3B82F6",
            borderRightColor: "#46e0e5",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}

export default LoadingSpinner;
