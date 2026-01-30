"use client";

import { motion, AnimatePresence } from "framer-motion";

const AnimatedPlaceholder = ({ text }) => {
  return (
    <span className="absolute inset-0 flex items-center px-4 py-3 pointer-events-none text-lg font-custom text-gray-400 font-medium opacity-60">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default AnimatedPlaceholder;
