"use client";
import { motion } from "framer-motion";

const Button = () => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: "10px 10px 0px rgba(0,0,0,1)",
        y: -5,
      }}
      whileTap={{
        scale: 0.95,
        x: 5,
        y: 5,
        boxShadow: "0px 0px 0px rgba(0,0,0,1)",
      }}
      className="
        relative group overflow-hidden
        flex items-center gap-3 mt-2 sm:mt-10
        bg-gradient-to-br from-gray-900 to-black text-white 
        text-[11px] sm:text-sm lg:text-base font-pixel
        py-4 px-8 sm:py-6 sm:px-14 border-4 border-black
        transition-all duration-200
        shadow-[6px_6px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_rgba(0,0,0,1)]
        tracking-[0.2em] uppercase
        rounded-2xl
      "
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
      <span className="relative z-10 flex items-center gap-1">
        Get started
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.2, 
            ease: "easeInOut",
          }}
          className="relative z-10 flex items-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 lg:w-7 lg:h-7"
          >
            <path
              d="M2 12H18M18 12L12 6M18 12L12 18"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </motion.div>
      </span>
    </motion.button>
  );
};

export default Button;
