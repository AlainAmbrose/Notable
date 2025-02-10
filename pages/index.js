import Head from "next/head";
import StickyNote from "../components/StickyNote";
import { useState } from "react";
import NewNotePopup from "../components/NewNotePopup.js";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4, // 4 columns on large screens
  1500: 3,  // 3 columns at 1500px and below
  1200: 2,  // 2 columns at 1200px and below
  700: 1,   // 1 column at 700px and below
};

export default function Home() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Welcome!", content: "This is a sample note." },
    { id: 2, title: "Google Keep Clone", content: "Try adding your own notes!" },
    { id: 3, title: "Welcome!", content: "This is a sample note." },
    { id: 4, title: "Google Keep Clone", content: "Try adding your own notes!" },
    { id: 5, title: "Google Keep Clone", content: "Try adding your own notes!" },
  ]);

  // Track the mouse position relative to the main element
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  return (
    <>
      <Head>
        <title>Notable</title>
      </Head>
      <main
        // Remove bg-sky-800 from the class list so that the inline style takes full control.
        className="h-screen p-4 items-center overflow-scroll"
        onMouseMove={(e) => {
          // Get the bounding rectangle of the main element
          const rect = e.currentTarget.getBoundingClientRect();
          // Calculate the mouse position relative to the element
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => {
          // Optional: reset the mouse position when leaving
          setMousePos({ x: -100, y: -100 });
        }}
        style={{
          // Use the Tailwind bg-sky-800 equivalent (e.g. #075985) as the base background color.
          backgroundColor: "#075985",
          // Overlay a radial gradient centered on the mouse position.
          // The gradient creates a circle with a 150px radius where the background appears lighter.
          backgroundImage: `radial-gradient(
            circle 500px at ${mousePos.x}px ${mousePos.y}px,
            rgba(19, 147, 216, 0.3),
            transparent 90%
          )`,
          // Ensure the gradient layers on top of the base color.
          backgroundBlendMode: "lighten",
        }}
      >
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
    </>
  );
}
