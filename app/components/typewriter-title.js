"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypewriterTitle = () => {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  const [speed, setSpeed] = useState(150);

  const fonts = [
    "font-custom",
    "font-playfair",
    "font-mono-code",
    "font-bebas",
    "font-caveat",
    "font-pixel",
    "font-pacifico",
    "font-montserrat",
    "font-lobster",
    "font-outfit",
  ];
  const full = "Notebook";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!del) {
        setText(full.substring(0, text.length + 1));
        setSpeed(150);
        if (text === full) setTimeout(() => setDel(true), 2000);
      } else {
        setText(full.substring(0, text.length - 1));
        setSpeed(75);
        if (text === "") {
          setDel(false);
          setIdx((prev) => (prev + 1) % fonts.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, del, idx, speed]);

  return (
    <div className="flex items-center min-w-[200px]">
      <h1
        className={`${fonts[idx]} text-xl lg:text-3xl font-bold text-gray-900 transition-all duration-300`}
      >
        {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block ml-1 w-1 h-6 bg-black align-middle"
        />
      </h1>
    </div>
  );
};

export default TypewriterTitle;
