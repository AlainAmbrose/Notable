import React from "react";
import clsx from "clsx";
import { useState, useEffect } from "react";

const NewNotePopup = ({ notes, setNotes }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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

  // Handle keydown event for Command + I (Mac) or Ctrl + I (Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "i") {
        event.preventDefault(); // Prevents browser default (like italicizing text)
        setIsVisible((prev) => !prev); // Toggle popup visibility
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close popup when clicking outside
  const handleOverlayClick = (event) => {
    setIsVisible(false);
  };

  return (
    <div
      className={clsx(
        !isVisible && "invisible",
        "fixed top-0 backdrop-blur-sm left-0 w-full h-full bg-black/50 flex justify-center items-center opacity-100 z-[1000]"
      )}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-zinc-500 p-5 rounded-lg w-[100vh] h-[75vh] shadow-md scale-95 transition-transform duration-150 ease-in opacity-85 overflow-scroll scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="">New Note</h1>
        <input
          type="text"
          className="w-full mb-2 p-1 text-xl font-semibold border-b border-gray-200 focus:outline-none focus:border-gray-400 bg-transparent"
          placeholder="Title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <textarea
          className="w-full p-1 border-b border-gray-200 focus:outline-none focus:border-gray-400 bg-transparent"
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
    </div>
  );
};

export default NewNotePopup;
