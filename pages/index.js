import Head from "next/head";
import StickyNote from "../components/StickyNote";
import { useState } from "react";
import NewNotePopup from "../components/NewNotePopup.js";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4, // 3 columns on large screens
  1100: 3, // 2 columns at 1100px and below
  700: 1, // 1 column at 700px and below
};

export default function Home() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Welcome!", content: "This is a sample note." },
    {
      id: 2,
      title: "Google Keep Clone",
      content: "Try adding your own notes!",
    },
    { id: 3, title: "Welcome!", content: "This is a sample note." },
    {
      id: 4,
      title: "Google Keep Clone",
      content: "Try adding your own notes!",
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-500">
      {/* Header */}
      <header className="w-full bg-zinc-600 p-3">
        <h1 className="text-3xl font-bold text-white">Notable</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 items-center overflow-scroll max-h-[calc(100vh-4rem)]">
        {/* New Note Input */}
        <NewNotePopup setNotes={setNotes} notes={notes} />
        {/* Notes Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex animate-slide-fade gap-5"
          columnClassName=""
        >
          {notes.map((note) => (
            <StickyNote
              key={note.id}
              title={note.title}
              content={note.content}
            />
          ))}
        </Masonry>
      </main>
    </div>
  );
}
