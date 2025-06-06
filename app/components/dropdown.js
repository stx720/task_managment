"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ExpandableInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeInOut" },
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.5, ease: "easeInOut" },
      },
    },
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-xl lg:text-3xl mt-16 mb-4 font-custom text-black w-screen text-center cursor-default">
        What is this?
      </h1>

      <motion.div
        animate={{
          y: [0, -4, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <motion.button
          onClick={toggleExpand}
          whileTap={{ scale: 1.3 }}
          whileHover={{ scale: 1.1, boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
          className="flex justify-center items-center flex-col min-h-max mb-9 p-3 rounded-3xl min-w-max bg-gray-300 hover:bg-gray-500"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              transformOrigin: "50% 50%",
              willChange: "transform",
            }}
          >
            <Image
              src="/arrow.png"
              alt="Toggle arrow"
              width={27}
              height={27}
              className="cursor-pointer block"
            />
          </motion.div>
        </motion.button>
      </motion.div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={variants}
            className="w-64 lg:w-1/2 overflow-hidden text-base lg:text-2xl"
          >
            <p className="font-medium">
              The Task List app is a calendar-based tool designed to help you
              organize your tasks in an easy and visual way. You can add your
              own tasks whenever you want and see them all in one place. Each
              task appears as a block that you can drag and drop onto any day on
              the calendar. This makes planning simple because you can quickly
              decide when to do each task. Whether it’s work, school, or
              personal errands, everything is clearly shown on the calendar. You
              don’t need to remember your tasks or write them down on paper
              anymore. The app keeps all your important to-dos organized so you
              never forget anything. You can move tasks around if your plans
              change, just by dragging the blocks to a new day. This gives you
              full control over your schedule and makes it easy to stay on top
              of things. The interface is clean and user-friendly, so even if
              you’re not used to task apps, you’ll find it simple to use. By
              seeing your tasks laid out in front of you, you can better manage
              your time and reduce stress. Overall, this app helps you keep your
              days organized and your goals clear.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableInfo;
