import React from "react";
import clsx from "clsx";
import { useState, useEffect } from "react";

const NewNotePopup = ({
  notes,
  setNotes,
  newNoteIsVisible,
  setNewNoteIsVisible,
  setIsMasonryReady,
}) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  const addNote = () => {
    if (inputTitle.trim() || inputContent.trim()) {
      setIsMasonryReady(false);
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "i") {
        event.preventDefault(); // Prevents browser default (like italicizing text)
        setNewNoteIsVisible((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOverlayClick = (event) => {
    addNote();
    setNewNoteIsVisible(false);
  };

  return (
    <div
      className={clsx(
        !newNoteIsVisible && "invisible",
        "fixed top-0 backdrop-blur-sm left-0 w-full h-full bg-black/50 flex justify-center items-center opacity-100 z-[1000]"
      )}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-sky-500 w-[60vh] min-h-[25vh] p-5 rounded-lg shadow-md scale-95 transition-transform duration-150 ease-in overflow-scroll scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          className="placeholder-white text-white  w-full mb-2 p-1 text-2xl font-bold focus:outline-none bg-transparent"
          placeholder="Title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <textarea
          className="placeholder-white text-white w-full min-h-[50vh] resize-none p-1 text-xl font-semibold focus:outline-none bg-transparent"
          rows="2"
          placeholder="Take a note..."
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NewNotePopup;
