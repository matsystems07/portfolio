import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Failed to send.");
        return;
      }

      setStatus("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Server error.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-black/30 p-6 rounded-2xl border border-white/10 backdrop-blur"
      >
        <div>
          <label className="block text-sm text-gray-300 mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 text-white rounded-lg border border-white/10 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 text-white rounded-lg border border-white/10 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 text-white rounded-lg border border-white/10 outline-none"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-teal-500 text-black rounded-lg font-semibold hover:bg-teal-400 transition"
        >
          Send Message
        </button>

        {status && (
          <p className="text-center text-sm text-gray-300 mt-2">{status}</p>
        )}
      </form>

      {/* Fiverr Alternative */}
      <div className="pt-6 border-t border-white/10">
        <p className="text-center text-sm text-gray-400 mb-4">
          Or hire me directly on Fiverr:
        </p>
        <a
          href="https://www.fiverr.com/matsystems07/buying?source=avatar_menu_profile"  // Replace with your Fiverr profile
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl text-center hover:from-orange-600 hover:to-orange-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 mx-auto max-w-sm"
        >
          🚀 Hire on Fiverr
        </a>
      </div>
    </div>
  );
}
