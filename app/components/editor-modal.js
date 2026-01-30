"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiMenu from "./emoji-menu";

const ToolbarButton = ({ icon, command, arg, active, onClick }) => (
  <button
    onMouseDown={(e) => {
      e.preventDefault();
      if (onClick) onClick();
      else document.execCommand(command, false, arg);
    }}
    className={`p-2 rounded-lg transition-colors ${active ? "bg-black text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
  >
    {icon}
  </button>
);

const ColorPicker = ({ currentColor, onChange }) => {
  const colors = [
    "#000000",
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#eab308",
    "#a855f7",
  ];

  const isActive = (c) => {
    if (!currentColor) return c === "#000000";
    const d1 = document.createElement("div");
    d1.style.color = c;
    const d2 = document.createElement("div");
    d2.style.color = currentColor;
    return d1.style.color === d2.style.color;
  };

  return (
    <div
      className="flex gap-1 border-l border-gray-200 pl-2"
      style={{ userSelect: "none" }}
    >
      {colors.map((c) => (
        <button
          key={c}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            document.execCommand("foreColor", false, c);
            if (onChange) {
              setTimeout(() => onChange(), 10);
            }
          }}
          className={`w-6 h-6 rounded-full border transition-transform ${
            isActive(c)
              ? "border-black scale-125 ring-2 ring-gray-100"
              : "border-gray-100 hover:scale-110"
          }`}
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
};

const EditorModal = ({ note, isOpen, onClose, onSave }) => {
  const [isImportant, setIsImportant] = useState(false);
  const [icon, setIcon] = useState("📝");
  const [hasInteracted, setHasInteracted] = useState(false);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    justifyLeft: false,
    justifyRight: false,
    foreColor: "#000000",
  });

  const editorRef = useRef(null);
  const titleRef = useRef(null);

  const checkActiveFormats = () => {
    if (typeof document === "undefined") return;

    const activeElement = document.activeElement;
    const isInEditor =
      activeElement === editorRef.current || activeElement === titleRef.current;

    if (!isInEditor) return;

    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyRight: document.queryCommandState("justifyRight"),
      foreColor: document.queryCommandValue("foreColor"),
    });
  };

  useEffect(() => {
    if (isOpen) {
      if (note) {
        if (titleRef.current) titleRef.current.innerHTML = note.title || "";
        if (editorRef.current) editorRef.current.innerHTML = note.content || "";
        setIsImportant(note.isImportant || false);
        setIcon(note.icon || "📝");
        setHasInteracted(false);
      } else {
        if (titleRef.current) titleRef.current.innerHTML = "";
        if (editorRef.current) editorRef.current.innerHTML = "";
        setIsImportant(false);
        setIcon("📝");
        setHasInteracted(true);
      }
    }
  }, [isOpen, note]);

  const handleSave = () => {
    const finalContent = editorRef.current ? editorRef.current.innerHTML : "";
    const finalTitle = titleRef.current ? titleRef.current.innerHTML : "";

    const isTitleEmpty = !titleRef.current?.innerText.trim();
    const isContentEmpty = !editorRef.current?.innerText.trim();

    if (isTitleEmpty && isContentEmpty) {
      onClose();
      return;
    }

    onSave({
      id: note?.id || Date.now(),
      title: finalTitle || "Untitled",
      content: finalContent,
      isImportant,
      icon,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
            onClick={handleSave}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`bg-white w-full max-w-5xl h-[85vh] lg:h-[90vh] rounded-3xl overflow-hidden flex flex-col relative z-[101] border-4 ${isImportant ? "border-red-500 shadow-[0_20px_50px_rgba(239,68,68,0.3)]" : "border-black shadow-2xl"}`}
          >
            <div className="flex flex-col border-b-2 border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between p-3 px-4 lg:px-6 border-b border-gray-200/60 gap-4">
                <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto no-scrollbar">
                  <EmojiMenu selected={icon} onSelect={setIcon} />
                  <button
                    onClick={onClose}
                    className="text-sm font-bold text-gray-500 hover:text-black transition-colors shrink-0"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => setIsImportant(!isImportant)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${isImportant ? "bg-red-100 text-red-600 border border-red-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                  >
                    {isImportant ? "🔥 URGENT" : "Normal"}
                  </button>
                </div>
                <button
                  onClick={handleSave}
                  className={`px-4 lg:px-6 py-2 rounded-xl font-bold font-custom text-white hover:scale-105 transition-transform shadow-lg shrink-0 ${isImportant ? "bg-red-600 shadow-red-600/20" : "bg-black shadow-black/20"}`}
                >
                  Save
                </button>
              </div>

              <AnimatePresence>
                {hasInteracted && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="flex items-center gap-1 p-2 px-4 lg:px-6 overflow-x-auto no-scrollbar"
                      style={{ userSelect: "none" }}
                    >
                      <ToolbarButton
                        command="bold"
                        active={activeFormats.bold}
                        onClick={() => {
                          document.execCommand("bold");
                          setTimeout(() => checkActiveFormats(), 10);
                        }}
                        icon={<strong className="font-serif">B</strong>}
                      />
                      <ToolbarButton
                        command="italic"
                        active={activeFormats.italic}
                        onClick={() => {
                          document.execCommand("italic");
                          setTimeout(() => checkActiveFormats(), 10);
                        }}
                        icon={<i className="font-serif">I</i>}
                      />
                      <ToolbarButton
                        command="underline"
                        active={activeFormats.underline}
                        onClick={() => {
                          document.execCommand("underline");
                          setTimeout(() => checkActiveFormats(), 10);
                        }}
                        icon={<span className="underline">U</span>}
                      />
                      <ToolbarButton
                        command="strikeThrough"
                        active={activeFormats.strikeThrough}
                        onClick={() => {
                          document.execCommand("strikeThrough");
                          setTimeout(() => checkActiveFormats(), 10);
                        }}
                        icon={<span className="line-through">S</span>}
                      />
                      <div className="w-[1px] h-6 bg-gray-300 mx-2 shrink-0" />
                      <ToolbarButton
                        command="justifyLeft"
                        active={activeFormats.justifyLeft}
                        onClick={() => {
                          document.execCommand("justifyLeft");
                          setTimeout(() => checkActiveFormats(), 10);
                        }}
                        icon={
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="15" y2="12" />
                            <line x1="3" y1="18" x2="18" y2="18" />
                          </svg>
                        }
                      />
                      <ToolbarButton
                        command="justifyRight"
                        active={activeFormats.justifyRight}
                        onClick={() => {
                          document.execCommand("justifyRight");
                          setTimeout(() => checkActiveFormats(), 10);
                        }}
                        icon={
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="9" y1="12" x2="21" y2="12" />
                            <line x1="7" y1="18" x2="21" y2="18" />
                          </svg>
                        }
                      />
                      <ColorPicker
                        currentColor={activeFormats.foreColor}
                        onChange={() =>
                          setTimeout(() => checkActiveFormats(), 10)
                        }
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 lg:p-12 cursor-text bg-white"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  editorRef.current?.focus();
                }
              }}
            >
              <div
                ref={titleRef}
                contentEditable
                onFocus={() => setHasInteracted(true)}
                onKeyUp={checkActiveFormats}
                onMouseUp={checkActiveFormats}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    editorRef.current?.focus();
                  }
                }}
                className="w-full text-3xl lg:text-5xl font-custom mb-6 outline-none empty:before:content-['Title'] empty:before:text-gray-300 break-words"
                style={{ fontWeight: 600 }}
              />
              <div
                ref={editorRef}
                contentEditable
                onFocus={() => setHasInteracted(true)}
                onKeyUp={checkActiveFormats}
                onMouseUp={checkActiveFormats}
                className="outline-none text-base lg:text-xl leading-relaxed text-gray-800 min-h-[50vh] empty:before:content-[attr(placeholder)] empty:before:text-gray-300"
                placeholder="Start typing your note here..."
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditorModal;
