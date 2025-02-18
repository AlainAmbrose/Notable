import Head from "next/head";
import StickyNote from "../components/StickyNote";
import { useState, useEffect } from "react";
import NewNotePopup from "../components/NewNotePopup.js";
import Masonry from "@mui/lab/Masonry";
import SearchBar from "../components/SearchBar";

const breakpointColumnsObj = {
  default: 4, // 4 columns on large screens
  1500: 3, // 3 columns at 1500px and below
  1200: 2, // 2 columns at 1200px and below
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
      id: 5,
      title: "Google Keep Clone",
      content: "Try adding your own notes!",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [newNoteIsVisible, setNewNoteIsVisible] = useState(false);
  const [isMasonryReady, setIsMasonryReady] = useState(false);

  useEffect(() => {
    // Delay rendering to avoid flickering effect
    const timer = setTimeout(() => {
      setIsMasonryReady(true);
    }, 50); // 50ms delay to allow layout shift
    console.log("Notes changed");
    return () => clearTimeout(timer);
  }, [notes]); // Runs whenever notes change

  return (
    <>
      <Head>
        <title>Notable</title>
      </Head>
      <main
        className="h-screen p-4 items-center overflow-scroll"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => {
          setMousePos({ x: -100, y: -100 });
        }}
        style={{
          backgroundColor: "#075985",
          backgroundImage: `radial-gradient(
            circle 500px at ${mousePos.x}px ${mousePos.y}px,
            rgba(19, 147, 216, 0.3),
            transparent 90%
          )`,
          backgroundBlendMode: "lighten",
        }}
      >
        <header className="flex justify-between bg-sky-600 bg-opacity-70 backdrop-blur-md w-full p-3 fixed top-0 left-0 z-50">
          <h1 className="text-3xl font-bold text-white">Notable</h1>
          <div className="flex justify-between">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <button
              className="bg-white p-2 rounded-md shadow-md cursor-pointer"
              onClick={() => setNewNoteIsVisible(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-sky-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </header>
        <div className="mt-20">
          <NewNotePopup
            setNotes={setNotes}
            notes={notes}
            newNoteIsVisible={newNoteIsVisible}
            setNewNoteIsVisible={setNewNoteIsVisible}
            setIsMasonryReady={setIsMasonryReady}
          />
          <Masonry columns={4} spacing={2}>
            {notes.map((note) => (
              <div
                key={note.id}
                style={{
                  opacity: isMasonryReady ? 1 : 0,
                }}
              >
                <StickyNote title={note.title} content={note.content} />
              </div>
            ))}
          </Masonry>
        </div>
      </main>
    </>
  );
}
