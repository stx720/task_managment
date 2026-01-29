"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Github from "../components/github";

// --- Components ---

const MiniLogo = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href="/" className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <motion.div
                className="flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.03)" }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="flex font-custom text-2xl font-bold tracking-tighter">
                    <motion.span
                        animate={{ y: isHovered ? -2 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >T</motion.span>
                    <motion.span
                        animate={{ y: isHovered ? 2 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >L</motion.span>
                </div>

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden flex items-center gap-1.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Home</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Link>
    );
};

const EmojiMenu = ({ selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const emojis = ["📝", "🔥", "💡", "✅", "⚠️", "🚀", "❤️", "⭐", "📌", "🎉", "📅", "💰"];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-xl shrink-0"
            >
                {selected}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/10 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="relative z-[160] bg-white p-6 rounded-3xl shadow-2xl border-2 border-black grid grid-cols-4 gap-4 w-full max-w-xs"
                        >
                            <div className="col-span-4 text-center mb-2 font-bold font-custom text-gray-400 text-sm tracking-widest uppercase">Select Icon</div>
                            {emojis.map(e => (
                                <button
                                    key={e}
                                    onClick={() => {
                                        onSelect(e);
                                        setIsOpen(false);
                                    }}
                                    className={`aspect-square flex items-center justify-center rounded-xl text-3xl transition-all ${selected === e ? "bg-black text-white shadow-lg scale-110" : "bg-gray-50 hover:bg-gray-100 hover:scale-105"}`}
                                >
                                    {e}
                                </button>
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

const TypewriterTitle = () => {
    const [text, setText] = useState("");
    const [idx, setIdx] = useState(0);
    const [del, setDel] = useState(false);
    const [speed, setSpeed] = useState(150);

    const fonts = ["font-custom", "font-playfair", "font-mono-code", "font-bebas", "font-caveat", "font-pixel", "font-pacifico", "font-montserrat", "font-lobster", "font-outfit"];
    const full = "Notebook";

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!del) {
                setText(full.substring(0, text.length + 1));
                setSpeed(150);
                if (text === full) setTimeout(() => setDel(true), 2000);
            } else {
                setText(full.substring(0, text.length - 1));
                setSpeed(75);
                if (text === "") {
                    setDel(false);
                    setIdx((prev) => (prev + 1) % fonts.length);
                }
            }
        }, speed);
        return () => clearTimeout(timer);
    }, [text, del, idx, speed]);

    return (
        <div className="flex items-center min-w-[200px]">
            <h1 className={`${fonts[idx]} text-xl lg:text-3xl font-bold text-gray-900 transition-all duration-300`}>
                {text}
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block ml-1 w-1 h-6 bg-black align-middle"
                />
            </h1>
        </div>
    );
};


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
                <span className={`text-xs font-bold uppercase tracking-widest ${note.isImportant ? "text-red-500" : "text-gray-400"}`}>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
            </button>
        </motion.div>
    );
};

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
    const colors = ["#000000", "#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7"];

    // Helper to compare arbitrary color strings (hex vs rgb)
    const isActive = (c) => {
        if (!currentColor) return c === "#000000";
        // Create dummy elements to standardize color strings
        const d1 = document.createElement("div");
        d1.style.color = c;
        const d2 = document.createElement("div");
        d2.style.color = currentColor;
        return d1.style.color === d2.style.color;
    };

    const applyColor = (color) => {
        // Simply apply color - browser will handle it correctly:
        // - If text is selected: applies to selection
        // - If no selection (just cursor): sets color for next typing
        document.execCommand("foreColor", false, color);

        if (onChange) {
            setTimeout(() => onChange(), 10);
        }
    };

    return (
        <div className="flex gap-1 border-l border-gray-200 pl-2" style={{ userSelect: 'none' }}>
            {colors.map(c => (
                <button
                    key={c}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        // Apply color directly
                        document.execCommand("foreColor", false, c);

                        // Update state
                        if (onChange) {
                            setTimeout(() => onChange(), 10);
                        }
                    }}
                    className={`w-6 h-6 rounded-full border transition-transform ${isActive(c)
                        ? "border-black scale-125 ring-2 ring-gray-100"
                        : "border-gray-100 hover:scale-110"
                        }`}
                    style={{ backgroundColor: c }}
                />
            ))}
        </div>
    )
}

// ... EditorModal start ...
const EditorModal = ({ note, isOpen, onClose, onSave }) => {
    // Note title now handled via ref for Rich Text support
    const [isImportant, setIsImportant] = useState(false);
    const [icon, setIcon] = useState("📝");
    const [hasInteracted, setHasInteracted] = useState(false); // Track if user started editing

    // Formatting state
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikeThrough: false,
        justifyLeft: false,
        justifyRight: false,
        foreColor: "#000000"
    });

    const editorRef = useRef(null);
    const titleRef = useRef(null); // New ref for title

    const checkActiveFormats = () => {
        if (!document) return;

        // Check if we're in one of our editable divs
        const activeElement = document.activeElement;
        const isInEditor = activeElement === editorRef.current || activeElement === titleRef.current;

        // Always update if we're in the editor, even without selection
        if (!isInEditor) {
            return;
        }

        setActiveFormats({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            strikeThrough: document.queryCommandState("strikeThrough"),
            justifyLeft: document.queryCommandState("justifyLeft"),
            justifyRight: document.queryCommandState("justifyRight"),
            foreColor: document.queryCommandValue("foreColor")
        });
    };

    useEffect(() => {
        if (isOpen) {
            if (note) {
                // Load content into refs directly
                if (titleRef.current) titleRef.current.innerHTML = note.title || "";
                if (editorRef.current) editorRef.current.innerHTML = note.content || "";

                setIsImportant(note.isImportant || false);
                setIcon(note.icon || "📝");
                setHasInteracted(false); // Reset interaction state
            } else {
                if (titleRef.current) titleRef.current.innerHTML = "";
                if (editorRef.current) editorRef.current.innerHTML = "";
                setIsImportant(false);
                setIcon("📝");
                setHasInteracted(true); // New note - show toolbar immediately
            }
        }
    }, [isOpen, note]);

    // Removed content useEffect as we set it once on open

    const handleSave = () => {
        const finalContent = editorRef.current ? editorRef.current.innerHTML : "";
        const finalTitle = titleRef.current ? titleRef.current.innerHTML : ""; // Get HTML from title

        // Check if empty (handling <br> or empty tags)
        const isTitleEmpty = !titleRef.current?.innerText.trim();
        const isContentEmpty = !editorRef.current?.innerText.trim();

        if (isTitleEmpty && isContentEmpty) {
            onClose();
            return;
        }

        onSave({
            id: note?.id || Date.now(),
            title: finalTitle || "Untitled", // Save as HTML
            content: finalContent,
            isImportant,
            icon,
            date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
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

                                    <button onClick={onClose} className="text-sm font-bold text-gray-500 hover:text-black transition-colors shrink-0">CANCEL</button>
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

                            {/* Toolbar - only show after user starts editing */}
                            <AnimatePresence>
                                {hasInteracted && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex items-center gap-1 p-2 px-4 lg:px-6 overflow-x-auto no-scrollbar" style={{ userSelect: 'none' }}>
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
                                                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" /></svg>}
                                            />
                                            <ToolbarButton
                                                command="justifyRight"
                                                active={activeFormats.justifyRight}
                                                onClick={() => {
                                                    document.execCommand("justifyRight");
                                                    setTimeout(() => checkActiveFormats(), 10);
                                                }}
                                                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="7" y1="18" x2="21" y2="18" /></svg>}
                                            />
                                            <ColorPicker
                                                currentColor={activeFormats.foreColor}
                                                onChange={() => setTimeout(() => checkActiveFormats(), 10)}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div
                            className="flex-1 overflow-y-auto p-4 lg:p-12 cursor-text bg-white"
                            onClick={(e) => {
                                // Only focus editor if clicking on the empty space, not on title or content
                                if (e.target === e.currentTarget) {
                                    editorRef.current?.focus();
                                }
                            }}
                        >
                            {/* Rich Text Title */}
                            <div
                                ref={titleRef}
                                contentEditable
                                onFocus={() => setHasInteracted(true)}
                                onKeyUp={checkActiveFormats}
                                onMouseUp={checkActiveFormats}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault(); // Prevent multi-line title
                                        editorRef.current?.focus(); // Move to content on Enter
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

export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("my_notes");
        if (saved) setNotes(JSON.parse(saved));
    }, []);

    const saveNote = (note) => {
        const exists = notes.find(n => n.id === note.id);
        let updated;
        if (exists) {
            updated = notes.map(n => n.id === note.id ? note : n);
        } else {
            updated = [note, ...notes];
        }
        setNotes(updated);
        localStorage.setItem("my_notes", JSON.stringify(updated));
    };

    const deleteNote = (id) => {
        const updated = notes.filter(n => n.id !== id);
        setNotes(updated);
        localStorage.setItem("my_notes", JSON.stringify(updated));
    }

    const openNewNote = () => {
        setSelectedNote(null);
        setIsEditorOpen(true);
    }

    const openNote = (note) => {
        setSelectedNote(note);
        setIsEditorOpen(true);
    }

    return (
        <main className="min-h-screen w-full bg-white p-4 lg:p-12 relative overflow-x-hidden">
            {/* Fixed background */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
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
                        <NoteCard key={note.id} note={note} onClick={openNote} onDelete={deleteNote} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {
                notes.length === 0 && (
                    <div className="relative z-10 w-full flex flex-col items-center justify-center py-20 lg:py-32 opacity-30 select-none text-center">
                        <div className="mb-6 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                        </div>
                        <p className="font-custom text-xl tracking-tight">Your mind is empty.</p>
                        <p className="font-sans text-sm mt-2">Write something down.</p>
                    </div>
                )
            }

            <EditorModal
                isOpen={isEditorOpen}
                note={selectedNote}
                onClose={() => setIsEditorOpen(false)}
                onSave={saveNote}
            />

            <Github />
        </main >
    );
}
