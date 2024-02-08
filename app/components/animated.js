"use client";
import React from "react";
import { motion } from "framer-motion";

const AnimatedComponent = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    Test
  </motion.div>
);

export default AnimatedComponent;
