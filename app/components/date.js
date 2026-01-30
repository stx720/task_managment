"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US";
import DailyTasks from "./DailyTasks";

const Dates = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Smooth date changes
  const changeDay = (days) => {
    setSelectedDate((d) => addDays(d, days));
  };

  const handleDateChange = (e) => {
    const picked = parseISO(e.target.value);
    if (!isNaN(picked)) {
      setSelectedDate(picked);
      setShowDatePicker(false);
    }
  };

  return (
    <div className="mx-auto p-4 w-full max-w-lg">
      {/* Date Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mt-6">
        {/* Previous Day Button */}
        <motion.button
          whileHover={{ scale: 1.1, x: -2, backgroundColor: "#f8fafc" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeDay(-1)}
          className="p-3 rounded-full bg-white border-2 border-slate-200 hover:border-slate-400 shadow-sm text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Previous day"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </motion.button>

        {/* Central Date Card (Trigger) */}
        <motion.button
          layout
          onClick={() => setShowDatePicker(!showDatePicker)}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`group flex-1 relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
            showDatePicker
              ? "bg-slate-900 border-slate-900 shadow-xl"
              : "bg-white border-slate-200 hover:border-slate-400 shadow-[0_4px_0_0_rgba(203,213,225,0.5)] active:shadow-none active:translate-y-[4px]"
          }`}
        >
          <div
            className={`flex items-center gap-2 mb-1 transition-colors ${
              showDatePicker
                ? "text-slate-400"
                : "text-slate-500 group-hover:text-slate-700"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest">
              {showDatePicker ? "Select a date" : "Selected Date"}
            </span>
            {/* Edit Icon Hint */}
            {!showDatePicker && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50 group-hover:opacity-100"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="m9 16 2 2 4-4" />
              </svg>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-lg lg:text-xl font-bold font-custom tracking-tight transition-colors ${
                showDatePicker ? "text-white" : "text-slate-900"
              }`}
            >
              {format(selectedDate, "EEE, d MMM", { locale: enUS })}
            </span>
            {/* Chevron Down to indicate dropdown */}
            <motion.svg
              animate={{ rotate: showDatePicker ? 180 : 0 }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-colors ${showDatePicker ? "text-white" : "text-slate-400 group-hover:text-slate-800"}`}
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </div>
        </motion.button>

        {/* Next Day Button */}
        <motion.button
          whileHover={{ scale: 1.1, x: 2, backgroundColor: "#f8fafc" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeDay(1)}
          className="p-3 rounded-full bg-white border-2 border-slate-200 hover:border-slate-400 shadow-sm text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Next day"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </motion.button>
      </div>

      {/* Date Picker Dropdown (Animated) */}
      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden mx-auto w-fit"
          >
            <div className="pt-4 pb-2">
              <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-lg">
                <input
                  type="date"
                  className="p-2 rounded-lg font-custom text-slate-700 outline-none cursor-pointer"
                  value={format(selectedDate, "yyyy-MM-dd")}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-2 border-t border-dashed border-gray-200 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={format(selectedDate, "yyyy-MM-dd")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <DailyTasks currentDate={selectedDate} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dates;
