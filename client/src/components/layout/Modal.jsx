export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">

      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Content */}
      <div className="relative bg-black/40 border border-white/10 rounded-2xl p-6 shadow-2xl max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-300 hover:text-white"
        >
          ✕
        </button>

        {children}
      </div>

    </div>
  );
}
