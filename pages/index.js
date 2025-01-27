import Head from "next/head";
import StickyNote from "../components/StickyNote";
import { useState } from "react";

export default function Home() {
  // For demonstration, we’re storing notes in state
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

    // Add more demo notes if you’d like
  ]);

  // State to handle input from "Take a note..." box
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  const addNote = () => {
    if (inputTitle.trim() || inputContent.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title: inputTitle,
          content: inputContent,
        },
      ]);
      setInputTitle("");
      setInputContent("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-500">
      {/* Header */}
      <header className="w-full bg-zinc-600 p-4 flex items-center space-x-4 shadow">
        <h1 className="text-2xl font-bold text-white">Notable</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 flex flex-col items-center">
        {/* New Note Input */}
        <div className="w-full max-w-xl bg-gray-50 rounded-md shadow p-4 mb-6">
          <input
            type="text"
            className="w-full mb-2 p-1 text-xl font-semibold border-b border-gray-200 focus:outline-none focus:border-gray-400 bg-transparent"
            placeholder="Title"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          <textarea
            className="w-full p-1 text-gray-700 border-b border-gray-200 focus:outline-none focus:border-gray-400 bg-transparent"
            rows="2"
            placeholder="Take a note..."
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={addNote}
              className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-1 px-4 rounded-md transition-colors"
            >
              Add
            </button>
          </div>
        </div>

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
