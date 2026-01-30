"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Github from "../components/github";
import MiniLogo from "../components/mini-logo";
import TypewriterTitle from "../components/typewriter-title";
import NoteCard from "../components/note-card";
import EditorModal from "../components/editor-modal";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("my_notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const saveNote = (note) => {
    const exists = notes.find((n) => n.id === note.id);
    let updated;
    if (exists) {
      updated = notes.map((n) => (n.id === note.id ? note : n));
    } else {
      updated = [note, ...notes];
    }
    setNotes(updated);
    localStorage.setItem("my_notes", JSON.stringify(updated));
  };

  const deleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem("my_notes", JSON.stringify(updated));
  };

  const openNewNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  const openNote = (note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  return (
    <main className="min-h-screen w-full bg-white p-4 lg:p-12 relative overflow-x-hidden">
      {/* Fixed background */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <header className="relative z-30 flex flex-col md:flex-row items-center justify-between mb-8 lg:mb-12 gap-6 w-full">
        <div className="flex items-center gap-3 lg:gap-6 w-full md:w-auto justify-center md:justify-start">
          <MiniLogo />
          <div className="h-6 lg:h-8 w-[2px] bg-gray-100 rounded-full"></div>
          <TypewriterTitle />
        </div>

        <button
          type="button"
          onClick={openNewNote}
          className="group relative z-50 w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-xl font-custom font-bold shadow-[4px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all active:scale-95 cursor-pointer"
        >
          <div className="bg-white/20 p-1 rounded-lg pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
          <span className="tracking-wide pointer-events-none">New Note</span>
        </button>
      </header>

      {/* Grid */}
      <motion.div
        className={`relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full ${notes.length > 0 ? "pb-32" : ""}`}
      >
        <AnimatePresence mode="popLayout">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={openNote}
              onDelete={deleteNote}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {notes.length === 0 && (
        <div className="relative z-10 w-full flex flex-col items-center justify-center py-20 lg:py-32 opacity-30 select-none text-center">
          <div className="mb-6 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <p className="font-custom text-xl tracking-tight">
            Your mind is empty.
          </p>
          <p className="font-sans text-sm mt-2">Write something down.</p>
        </div>
      )}

      <EditorModal
        isOpen={isEditorOpen}
        note={selectedNote}
        onClose={() => setIsEditorOpen(false)}
        onSave={saveNote}
      />

      <Github />
    </main>
  );
}
