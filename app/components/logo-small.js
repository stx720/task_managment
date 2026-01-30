"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SmallLogo = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href="/" className="cursor-pointer inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <motion.div
                className="font-custom flex flex-col items-center mt-12 sm:mt-5 px-2 sm:px-6 py-3 rounded-2xl transition-all duration-300"
                whileHover={{ scale: 1.01, backgroundColor: "rgba(0,0,0,0.02)" }}
                whileTap={{ scale: 0.99 }}
            >
                {/* Logo - single row with wrap for mobile */}
                <div className="flex flex-row flex-nowrap justify-center items-center gap-0.5 sm:gap-1 overflow-visible">
                    <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl hover:scale-125 transition-transform duration-300 inline-block font-bold sm:font-normal tracking-tighter sm:tracking-normal">T</h1>
                    <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl hover:scale-125 transition-transform duration-300 inline-block font-bold sm:font-normal tracking-tighter sm:tracking-normal">A</h1>
                    <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl hover:scale-125 transition-transform duration-300 inline-block font-bold sm:font-normal tracking-tighter sm:tracking-normal">S</h1>
                    <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl hover:scale-125 transition-transform duration-300 inline-block font-bold sm:font-normal tracking-tighter sm:tracking-normal">K</h1>
                    <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl font-bold sm:font-normal tracking-tighter sm:tracking-normal">_</h1>
                    <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl hover:scale-125 transition-transform duration-300 inline-block font-bold sm:font-normal tracking-tighter sm:tracking-normal">L</h1>
                    <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl hover:scale-125 transition-transform duration-300 inline-block font-bold sm:font-normal tracking-tighter sm:tracking-normal">I</h1>
                    <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl hover:scale-125 transition-transform duration-300 inline-block font-bold sm:font-normal tracking-tighter sm:tracking-normal">S</h1>
                    <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl hover:scale-125 transition-transform duration-300 inline-block font-bold sm:font-normal tracking-tighter sm:tracking-normal">T</h1>
                </div>

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden flex items-center gap-1.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            <span className="text-sm font-medium text-gray-500">Back to Home</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Link>
    );
};

export default SmallLogo;