"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MiniLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 cursor-pointer"
        whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.03)" }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex font-custom text-2xl font-bold tracking-tighter">
          <motion.span
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            T
          </motion.span>
          <motion.span
            animate={{ y: isHovered ? 2 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            L
          </motion.span>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                Home
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

export default MiniLogo;
