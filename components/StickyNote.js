const StickyNote = ({ title, content }) => {
  return (
    <div className="bg-sky-500  bg-opacity-70 backdrop-blur-lg min-h-[25vh] rounded-lg shadow-2xl mb-5 p-4 break-words transition-transform duration-150 ease-in transform hover:scale-105">
      <h2 className="text-lg text-white font-semibold mb-1">{title}</h2>
      <p className="text-white">{content}</p>
    </div>
  );
};

export default StickyNote;
