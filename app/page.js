"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./components/home-logo";
import Button from "./components/button";
import StaticInfo from "./components/dropdown";
import Github from "./components/github";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:p-24 w-screen animate-fade overflow-x-hidden bg-gradient-to-b from-white to-gray-50/30">
      <motion.div
        className="mt-12 lg:mt-0"
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
            className="group flex items-center gap-3 px-6 py-3 rounded-2xl text-gray-500 hover:text-black transition-all hover:bg-white/80 backdrop-blur-sm border border-transparent hover:border-gray-200 hover:shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="bg-gray-200 text-gray-600 p-2 rounded-xl group-hover:bg-black group-hover:text-white transition-all duration-300"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
            </motion.div>
            <span className="font-custom text-sm font-bold tracking-wide">
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
