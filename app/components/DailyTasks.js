"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const TaskItem = ({ task, onToggle, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`group relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 ${task.done
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
                            className={`flex-1 min-w-0 font-custom text-base cursor-pointer select-none transition-all duration-300 break-words whitespace-pre-wrap leading-tight mt-0.5 ${task.done ? "text-gray-400 line-through" : "text-black font-medium"
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </motion.button>
                        )}
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1, color: "#dc2626" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(task.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
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
                        <div className={`mt-3 pt-3 border-t-2 border-dashed border-gray-200 text-sm leading-relaxed whitespace-pre-wrap ${task.done ? 'text-gray-400' : 'text-gray-700'}`}>
                            {task.description}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const AnimatedPlaceholder = ({ text }) => {
    return (
        <span className="absolute inset-0 flex items-center px-4 py-3 pointer-events-none text-lg font-custom text-gray-400 font-medium opacity-60">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={text}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="block"
                >
                    {text}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}

const DailyTasks = ({ currentDate }) => {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [showDesc, setShowDesc] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const key = `tasks_${format(currentDate, "yyyy-MM-dd")}`;

    const placeholders = [
        "Walk the dog",
        "Take out trash",
        "Buy milk",
        "Take meds",
        "Call mom",
        "Finish project",
        "Gym workout"
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
        if (!newTitle.trim()) return;

        update([...tasks, {
            id: Date.now(),
            title: newTitle.trim(),
            description: newDescription.trim(),
            done: false,
        }]);

        setNewTitle("");
        setNewDescription("");
        setShowDesc(false);
    };

    const toggle = (id) => {
        update(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
    };

    const remove = (id) => {
        update(tasks.filter((t) => t.id !== id));
    };

    return (
        <div className="mt-8 mx-auto w-full max-w-lg">
            <motion.form
                layout
                onSubmit={add}
                className="mb-10 bg-white p-1 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative"
            >
                <div className="flex items-start px-4 py-3 relative gap-2">
                    {/* Custom Animated Placeholder */}
                    {!newTitle && <AnimatedPlaceholder text={placeholders[placeholderIndex]} />}

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
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>
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
            </motion.form >

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
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-30 text-black"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                            <p className="font-custom text-xs font-bold uppercase tracking-widest opacity-40 text-black">Empty list</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div >
    );
};

export default DailyTasks;
