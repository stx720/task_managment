"use client";
import React from "react";
import { motion } from "framer-motion";

const StaticInfo = () => {
  return (
    <motion.div
      className="w-full flex flex-col items-center mt-6 mb-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
    >
      <div className="w-full max-w-2xl bg-[#EEEDF2] p-8 lg:p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] border border-gray-300/50 relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <motion.div
            className="text-left space-y-2 flex-1 pl-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-black font-custom tracking-tight">
              Simply Organized.
            </h3>
            <p className="text-gray-500 font-medium text-lg leading-snug">
              Manage your daily goals <br />
              <span className="text-black">without the chaos.</span>
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-2 w-full md:w-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.div
              className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-black/5 hover:scale-[1.02] transition-transform"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="bg-emerald-500/10 p-2 rounded-full text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm">
                Quick Add Tasks
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-black/5 hover:scale-[1.02] transition-transform"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="bg-purple-500/10 p-2 rounded-full text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm">
                Personal Notes
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-black/5 hover:scale-[1.02] transition-transform"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="bg-blue-500/10 p-2 rounded-full text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm">
                100% Private
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StaticInfo;
