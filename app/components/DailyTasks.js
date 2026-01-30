"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./task-item";
import AnimatedPlaceholder from "./animated-placeholder";

const DailyTasks = ({ currentDate }) => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showDesc, setShowDesc] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [error, setError] = useState(null);

  const key = `tasks_${format(currentDate, "yyyy-MM-dd")}`;

  const placeholders = [
    "Walk the dog",
    "Take out trash",
    "Buy milk",
    "Take meds",
    "Call mom",
    "Finish project",
    "Gym workout",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem(key);
    setTasks(data ? JSON.parse(data) : []);
  }, [key]);

  const update = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
    setTasks(data);
  };

  const add = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setError("Give your task a title first!");
      setTimeout(() => setError(null), 3000);
      return;
    }

    update([
      ...tasks,
      {
        id: Date.now(),
        title: newTitle.trim(),
        description: newDescription.trim(),
        done: false,
      },
    ]);

    setNewTitle("");
    setNewDescription("");
    setShowDesc(false);
    setError(null);
  };

  const toggle = (id) => {
    update(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const remove = (id) => {
    update(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="mt-8 mx-auto w-full max-w-lg">
      <motion.form
        layout
        onSubmit={add}
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="mb-10 bg-white p-1 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative"
      >
        <div className="flex items-start px-4 py-3 relative gap-2">
          {!newTitle && (
            <AnimatedPlaceholder text={placeholders[placeholderIndex]} />
          )}

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none font-custom text-lg text-black font-medium z-10 min-w-0"
          />

          <motion.button
            type="button"
            onClick={() => setShowDesc(!showDesc)}
            animate={{ rotate: showDesc ? 180 : 0 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 text-black rounded-lg border-2 border-transparent hover:border-gray-200 transition-all z-20 shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {showDesc && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t-2 border-gray-100 pt-4">
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Details..."
                  className="w-full min-h-[80px] bg-gray-50 rounded-xl p-3 text-sm text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black/5 transition-all resize-none font-sans border-2 border-gray-200"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(newTitle.trim() || newDescription.trim()) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-2 pb-2"
            >
              <button
                type="submit"
                className="w-full py-3 bg-black hover:bg-gray-900 text-white rounded-xl font-custom text-sm font-bold transition-transform active:scale-[0.98]"
              >
                Save
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      <motion.div layout className="space-y-4">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggle}
              onDelete={remove}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="py-12 flex flex-col items-center justify-center text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-3 opacity-30 text-black"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <p className="font-custom text-xs font-bold uppercase tracking-widest opacity-40 text-black">
                Empty list
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[100] w-[90%] max-w-[320px] bg-black/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 border border-white/10"
          >
            <div className="bg-red-500/20 p-1.5 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <span className="font-custom text-[11px] uppercase tracking-[0.1em] font-bold text-gray-200">
              {error}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyTasks;
