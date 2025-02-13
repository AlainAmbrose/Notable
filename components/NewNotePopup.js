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
    setIsVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "i") {
        event.preventDefault(); // Prevents browser default (like italicizing text)
        setIsVisible((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
        className="bg-sky-500 w-[60vh] min-h-[25vh] p-5 rounded-lg shadow-md scale-95 transition-transform duration-150 ease-in opacity-85 overflow-scroll scrollbar-hide"
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
