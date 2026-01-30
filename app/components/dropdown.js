"use client";
import React from "react";
import { motion } from "framer-motion";

const StaticInfo = () => {
  return (
    <motion.div
      className="w-full flex flex-col items-center mt-6 mb-12 px-0 sm:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
    >
      <div className="w-full max-w-2xl bg-white px-4 py-6 sm:p-8 lg:p-12 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_rgba(0,0,0,1)] relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #000 1.2px, transparent 0)` , backgroundSize: '32px 32px' }} />

        <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-8 items-center md:items-stretch justify-between relative z-10 text-left">
          <motion.div
            className="space-y-3 sm:space-y-4 flex-1 w-full flex flex-col items-start justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-black font-pixel tracking-tighter leading-tight uppercase">
              Simply<br className="hidden sm:block"/> Organized.
            </h3>
            <div className="flex flex-col gap-1 sm:gap-2">
              <p className="text-gray-500 font-mono-code text-sm sm:text-lg lg:text-xl leading-relaxed uppercase tracking-tight">
                Manage goals <br className="sm:hidden"/>
                <span className="text-black font-bold relative inline-block border-b-[3px] border-black pb-0.5">
                  without the chaos.
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 w-full flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {[
              { label: 'Add Tasks', color: 'bg-emerald-400', icon: (
                <path d="M5 12h14M12 5v14" />
              )},
              { label: 'Make Notes', color: 'bg-purple-400', icon: (
                <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>
              )},
              { label: '100% Private', color: 'bg-blue-400', icon: (
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              )}
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 bg-white px-4 py-2.5 border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl cursor-pointer group w-full md:min-w-[160px]"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`${item.color} p-1.5 border-[2px] border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:shadow-none transition-all flex-shrink-0`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>
                </div>
                <span className="font-pixel text-[10px] sm:text-[11px] uppercase text-black font-bold tracking-widest whitespace-nowrap">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StaticInfo;
