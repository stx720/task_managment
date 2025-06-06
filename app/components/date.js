"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US";

const Dates = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const prevDay = () => setSelectedDate((d) => addDays(d, -1));
  const nextDay = () => setSelectedDate((d) => addDays(d, 1));

  const handleDateChange = (e) => {
    const picked = parseISO(e.target.value);
    if (!isNaN(picked)) {
      setSelectedDate(picked);
      setShowDatePicker(false);
    }
  };

  return (
    <div className="mx-auto p-4">
      {/* Nawigacja po dniach */}
      <div className="flex items-center justify-center font-custom mt-6 ">
        <button onClick={prevDay} className="text-xl px-2 animate-shake mr-2">
          ←
        </button>
        <span className="lg:text-2xl text-xs font-semibold ">
          {format(selectedDate, "EEEE, d MMMM yyyy", { locale: enUS })}
        </span>
        <button onClick={nextDay} className="text-xl px-2 animate-shake ml-2">
          →
        </button>
      </div>

      {/* Przycisk "Pick date" z animacją kliknięcia */}
      <div className="flex justify-center mt-4">
        <motion.button
          onClick={() => setShowDatePicker((prev) => !prev)}
          whileTap={{ scale: 0.9 }}
          whileHover={{
            scale: 1.08,
            rotate: [-1, 1, -1, 0],
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 12,
            mass: 0.4,
          }}
          className="lg:text-base text-sm text-slate-950 px-3 py-1 border rounded-xl bg-gray-200 hover:bg-gray-300 font-custom font-medium transition-shadow duration-300 shadow-md hover:shadow-xl"
        >
          Pick date
        </motion.button>
      </div>

      {/* Roleta z kalendarzem */}
      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            key="date-picker"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1], // ease-out spring-like
            }}
            className="origin-top flex justify-center mt-3 overflow-hidden"
          >
            <input
              type="date"
              className="border-2 border-gray-950 px-2  py-1 rounded font-custom font-semibold text-gray-700 w-fit text-sm lg:text-base"
              value={format(selectedDate, "yyyy-MM-dd")}
              onChange={handleDateChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dates;
