"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TaskItem = ({ task, onToggle, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group relative flex flex-col p-4 rounded-xl border-2 ${
        task.done
          ? "bg-gray-50 border-gray-200 opacity-75"
          : "bg-white border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:-translate-y-[1px]"
      }`}
    >
      <div className="flex items-start gap-4">
        <motion.div whileTap={{ scale: 0.8 }} className="relative">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
            className="peer appearance-none w-6 h-6 border-2 border-gray-800 rounded-md checked:bg-black checked:border-black transition-colors cursor-pointer"
          />
          <svg
            className="absolute top-1 left-1 w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span
              onClick={() => onToggle(task.id)}
              className={`flex-1 min-w-0 font-custom text-base cursor-pointer select-none transition-all duration-300 break-words whitespace-pre-wrap leading-tight mt-0.5 ${
                task.done
                  ? "text-gray-400 line-through"
                  : "text-black font-medium"
              }`}
            >
              {task.title}
            </span>

            {task.description && (
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="p-1 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors shrink-0 mt-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </motion.button>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.15, color: "#ef4444" }}
          whileTap={{ scale: 0.9, rotate: -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => onDelete(task.id)}
          className="text-black p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M3 6h18M19 6v14H5V6M8 6V4h8v2M10 11v6M14 11v6" />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && task.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div
              className={`mt-3 pt-3 border-t-2 border-dashed border-gray-200 text-sm leading-relaxed whitespace-pre-wrap ${task.done ? "text-gray-400" : "text-gray-700"}`}
            >
              {task.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskItem;
