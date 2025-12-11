import { useState } from "react";
import Modal from "./Modal.jsx";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
  className="chatbot-toggle fixed bottom-6 right-6 z-40 p-4 rounded-full bg-teal-500 text-black text-2xl shadow-xl hover:bg-teal-400 transition"
  onClick={() => setOpen(true)}
>
  💬
</button>


      {/* Modal */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <ChatWindow />
        </Modal>
      )}
    </>
  );
}

// YOUR EXACT ChatWindow - ONLY CHANGED ENDPOINT URL
function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! How can I help you today?" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      // ✅ ONLY CHANGE: Added /chat endpoint
      const res = await fetch("/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error connecting to server." },
      ]);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Chat Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-3 bg-black/30 rounded-lg border border-white/10">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-teal-500 text-black ml-auto"
                : "bg-white/10 text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Row */}
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-3 py-2 rounded-md bg-white/10 text-white outline-none 
          border border-white/10"
          placeholder="Ask me anything..."
        />

        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-md bg-teal-500 text-black font-medium 
          hover:bg-teal-400 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
