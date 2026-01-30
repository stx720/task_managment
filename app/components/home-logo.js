"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      className="cursor-pointer block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="font-custom flex flex-col items-center w-full max-w-[100vw] transition-all duration-300 px-2 sm:px-6 py-4 rounded-3xl"
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      >
        <div className="flex flex-row flex-nowrap justify-center items-center gap-x-0.5 sm:gap-x-2 overflow-visible relative">
          <motion.h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold sm:font-normal inline-block tracking-tighter sm:tracking-normal" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>T</motion.h1>
          <motion.h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold sm:font-normal inline-block tracking-tighter sm:tracking-normal" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>A</motion.h1>
          <motion.h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold sm:font-normal inline-block tracking-tighter sm:tracking-normal" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>S</motion.h1>
          <motion.h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold sm:font-normal inline-block tracking-tighter sm:tracking-normal" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>K</motion.h1>
          <motion.h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold sm:font-normal inline-block tracking-tighter sm:tracking-normal" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>_</motion.h1>
          <motion.h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold sm:font-normal inline-block tracking-tighter sm:tracking-normal" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>L</motion.h1>
          <motion.h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold sm:font-normal inline-block tracking-tighter sm:tracking-normal" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>I</motion.h1>
          <motion.h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold sm:font-normal inline-block tracking-tighter sm:tracking-normal" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>S</motion.h1>
          <motion.h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold sm:font-normal inline-block tracking-tighter sm:tracking-normal" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>T</motion.h1>
        </div>

        <div className="h-4 sm:h-8 flex justify-center items-center">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2 text-gray-400 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="text-sm">Home</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;