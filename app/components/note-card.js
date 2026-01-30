"use client";

import { motion } from "framer-motion";

const NoteCard = ({ note, onClick, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`
            group relative flex flex-col justify-between p-6 h-64 bg-white rounded-2xl cursor-pointer overflow-hidden
            border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg
            ${note.isImportant ? "border-red-500 shadow-[4px_4px_0px_#ef4444]" : "border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"}
        `}
      onClick={() => onClick(note)}
    >
      <div className="space-y-2 pointer-events-none">
        <div className="flex justify-between items-start gap-2">
          <h3
            className="font-custom text-xl font-bold line-clamp-1 pr-2 flex-1"
            dangerouslySetInnerHTML={{ __html: note.title || "Untitled" }}
          />
          {note.icon && <span className="text-2xl">{note.icon}</span>}
        </div>

        <div
          className="text-sm text-gray-600 line-clamp-5 leading-relaxed overflow-hidden break-words"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </div>

      <div className="flex justify-between items-end mt-4 pointer-events-none">
        <span
          className={`text-xs font-bold uppercase tracking-widest ${note.isImportant ? "text-red-500" : "text-gray-400"}`}
        >
          {note.date} {note.isImportant && "• URGENT"}
        </span>
      </div>

      <button
        className="absolute bottom-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:scale-110 transition-all z-30 pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </motion.div>
  );
};

export default NoteCard;
