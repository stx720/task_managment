"use client";
import { motion } from "framer-motion";

const Button = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      className="
        flex flex-row bg-gray-400 mt-14 text-white text-xl lg:text-3xl font-bold 
        py-4 px-6 rounded-full min-w-max
        transition-colors duration-300 hover:bg-gray-600
        focus:outline-none focus:ring-4 focus:ring-gray-500/50
      "
    >
      Get started
      <h1 className="ml-2 animate-shake text-gray-200">➜</h1>
    </motion.button>
  );
};

export default Button;
