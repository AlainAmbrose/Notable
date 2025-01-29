import Head from "next/head";
import StickyNote from "../components/StickyNote";
import { useState } from "react";
import NewNotePopup from "../components/NewNotePopup.js";

export default function Home() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Welcome!", content: "This is a sample note." },
    {
      id: 2,
      title: "Google Keep Clone",
      content: "Try adding your own notes!",
    },
    { id: 1, title: "Welcome!", content: "This is a sample note." },
    {
      id: 2,
      title: "Google Keep Clone",
      content: "Try adding your own notes!",
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-500">
      {/* Header */}
      <header className="w-full bg-zinc-600 p-4 flex items-center space-x-4 shadow">
        <h1 className="text-2xl font-bold text-white">Notable</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 flex flex-col items-center">
        {/* New Note Input */}
        <NewNotePopup setNotes={setNotes} notes={notes} />
        {/* Notes Grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {notes.map((note) => (
            <StickyNote
              key={note.id}
              title={note.title}
              content={note.content}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
