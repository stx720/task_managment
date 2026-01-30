"use client";
import { motion } from "framer-motion";

const Button = () => {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: "6px 6px 0px rgba(0,0,0,1)",
        y: -2,
      }}
      whileTap={{
        scale: 0.97,
        x: 3,
        y: 3,
        boxShadow: "0px 0px 0px rgba(0,0,0,1)",
      }}
      className="
        flex items-center gap-3 mt-4 sm:mt-8
        bg-black text-white text-lg sm:text-xl lg:text-3xl font-bold font-custom
        py-4 px-8 sm:py-5 sm:px-10 rounded-full border-2 border-black
        transition-all duration-300 ease-out
        shadow-[4px_4px_0px_rgba(0,0,0,1)]
      "
    >
      Get started
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="inline-block text-2xl"
      >
        →
      </motion.span>
    </motion.button>
  );
};

export default Button;
