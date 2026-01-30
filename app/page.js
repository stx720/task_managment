"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./components/home-logo";
import Button from "./components/button";
import StaticInfo from "./components/dropdown";
import Github from "./components/github";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center px-4 py-8 lg:p-24 w-screen animate-fade overflow-x-hidden bg-[#fafafa]">
      {/* Premium Retro Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #000 2px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 pointer-events-none" />
      <motion.div
        className="mt-6 lg:mt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Logo />
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-6 w-full z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {/* Primary CTA - Main App Focus */}
        <Link href="/tasks">
          <Button text="Get Started" />
        </Link>

        {/* Secondary - Bonus Feature */}
        <Link href="/notes">
          <motion.button
            className="group flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-4 bg-white text-black border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-2xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="bg-gray-100 p-1.5 sm:p-2 border-[3px] border-black rounded-xl group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:shadow-none"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, ease: "linear" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                className="sm:w-4 sm:h-4"
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
              </svg>
            </motion.div>
            <span className="font-pixel text-[8px] sm:text-[10px] uppercase tracking-[0.1em]">
              Open Notebook
            </span>
          </motion.button>
        </Link>
      </motion.div>

      <StaticInfo />

      <Github />
    </main>
  );
}
