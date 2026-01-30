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
    <div className="mx-auto p-6 w-full max-w-lg relative">
      {/* Date Navigation Bar */}
      <div className="flex items-center justify-between gap-3 sm:gap-6 mt-4 sm:mt-8 relative z-10">
        {/* Previous Day Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "6px 6px 0px rgba(0,0,0,1)", y: -4 }}
          whileTap={{ scale: 0.95, x: 4, y: 4, boxShadow: "0px 0px 0px rgba(0,0,0,1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => changeDay(-1)}
          className="p-3 sm:p-4 rounded-2xl bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          aria-label="Previous day"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="4"
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
          whileHover={{ scale: 1.02, y: -2, boxShadow: "10px 10px 0px rgba(0,0,0,1)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`group flex-[2] relative flex flex-col items-center justify-center py-4 px-2 sm:p-5 rounded-[2rem] border-4 border-black min-w-0 ${
            showDatePicker
              ? "bg-black text-white shadow-none translate-x-1 translate-y-1"
              : "bg-white text-black shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          }`}
        >
          <div className="flex items-center gap-2 mb-1 opacity-60">
            <span className="text-[7px] sm:text-[10px] font-pixel uppercase tracking-[0.2em] whitespace-nowrap">
              {showDatePicker ? "Select" : "Date"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 w-full justify-center px-1">
            <span className="text-xs sm:text-sm lg:text-base font-pixel tracking-tighter sm:tracking-tight uppercase whitespace-nowrap">
              {format(selectedDate, "EEE, d MMM", { locale: enUS })}
            </span>
            <motion.div
              animate={{ rotate: showDatePicker ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex-shrink-0"
            >
              <svg 
                width="14" 
                height="14" 
                className="sm:w-4 sm:h-4 flex-shrink-0"
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter"/>
              </svg>
            </motion.div>
          </div>
        </motion.button>

        {/* Next Day Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "6px 6px 0px rgba(0,0,0,1)", y: -4 }}
          whileTap={{ scale: 0.95, x: 4, y: 4, boxShadow: "0px 0px 0px rgba(0,0,0,1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => changeDay(1)}
          className="p-3 sm:p-4 rounded-2xl bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          aria-label="Next day"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="4"
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
            initial={{ height: 0, opacity: 0, y: -20, scale: 0.95 }}
            animate={{ height: "auto", opacity: 1, y: 0, scale: 1 }}
            exit={{ height: 0, opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="overflow-hidden mx-auto w-fit z-0"
          >
            <div className="pt-4 pb-2 px-2">
              <div className="bg-white p-2.5 rounded-[1.5rem] border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] relative flex items-center px-4">
                <div className="text-black opacity-80 pointer-events-none flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="1" />
                    <path d="M3 10h18" />
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="2" height="2" x="7" y="14" />
                    <rect width="2" height="2" x="11" y="14" />
                    <rect width="2" height="2" x="15" y="14" />
                  </svg>
                </div>
                <input
                  type="date"
                  className="p-2 font-pixel text-[11px] text-black outline-none cursor-pointer bg-transparent transition-colors uppercase w-full text-center appearance-none pl-2"
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
