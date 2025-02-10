import Head from "next/head";
import StickyNote from "../components/StickyNote";
import { useState } from "react";
import NewNotePopup from "../components/NewNotePopup.js";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4, // 4 columns on large screens
  1500: 3, // 3 columns at 1100px and below
  1200: 2, // 2 columns at 900px and below
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
    {
      id: 4,
      title: "Google Keep Clone",
      content: "Try adding your own notes!",
    },
  ]);

  return (
    <main className="bg-sky-800 h-screen p-4 items-center overflow-scroll">
      <header className="bg-sky-600 bg-opacity-70 backdrop-blur-md w-full p-3 fixed top-0 left-0 z-50">
        <h1 className="text-3xl font-bold text-white">Notable</h1>
      </header>
      <div className="mt-20">
        <NewNotePopup setNotes={setNotes} notes={notes} />
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
      </div>
    </main>
  );
}
