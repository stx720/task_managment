"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EmojiMenu = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const emojis = [
    "📝",
    "🔥",
    "💡",
    "✅",
    "⚠️",
    "🚀",
    "❤️",
    "⭐",
    "📌",
    "🎉",
    "📅",
    "💰",
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-xl shrink-0"
      >
        {selected}
      </button>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/10 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative z-[160] bg-white p-6 rounded-3xl shadow-2xl border-2 border-black grid grid-cols-4 gap-4 w-full max-w-xs"
            >
              <div className="col-span-4 text-center mb-2 font-bold font-custom text-gray-400 text-sm tracking-widest uppercase">
                Select Icon
              </div>
              {emojis.map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    onSelect(e);
                    setIsOpen(false);
                  }}
                  className={`aspect-square flex items-center justify-center rounded-xl text-3xl transition-all ${selected === e ? "bg-black text-white shadow-lg scale-110" : "bg-gray-50 hover:bg-gray-100 hover:scale-105"}`}
                >
                  {e}
                </button>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmojiMenu;
