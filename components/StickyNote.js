const StickyNote = ({ title, content }) => {
  return (
    <div className="bg-zinc-600 h-max w-full rounded-lg shadow mb-4 p-4 break-words hover:shadow-xl hover:shadow-zinc-700 transition-shadow">
      <h2 className="text-lg text-white font-semibold mb-1">{title}</h2>
      <p className="text-white">{content}</p>
    </div>
  );
};

export default StickyNote;
