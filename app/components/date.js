"use client";
import { useState } from "react";
import { format, addDays, parseISO } from "date-fns";
import { en } from "date-fns/locale";

const Dates = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const prevDay = () => setSelectedDate((d) => addDays(d, -1));
  const nextDay = () => setSelectedDate((d) => addDays(d, 1));

  const handleDateChange = (e) => {
    const picked = parseISO(e.target.value);
    if (!isNaN(picked)) {
      setSelectedDate(picked);
      setShowDatePicker(false); // automatycznie zamyka kalendarz
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Nawigacja po dniach */}
      <div className="flex items-center justify-center font-custom mt-6">
        <button onClick={prevDay} className="text-xl px-2 animate-shake mr-2">
          ←
        </button>
        <span className="text-xl font-semibold">
          {format(selectedDate, "EEEE, d MMMM yyyy", { locale: en })}
        </span>
        <button onClick={nextDay} className="text-xl px-2 animate-shake ml-2">
          →
        </button>
      </div>

      {/* Przycisk: pokaż/ukryj kalendarz */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowDatePicker((prev) => !prev)}
          className="text-base text-slate-950 px-3 py-1 border rounded-xl bg-gray-300 hover:bg-gray-500 font-custom font-medium animate-pulse"
        >
          Pick date
        </button>
      </div>

      {/* Kalendarz tylko jeśli aktywowany */}
      {showDatePicker && (
        <div className="flex justify-center mt-3">
          <input
            type="date"
            className="border px-2 py-1 rounded font-custom font-semibold text-gray-700"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={handleDateChange}
          />
        </div>
      )}
    </div>
  );
};

export default Dates;
