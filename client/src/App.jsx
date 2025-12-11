import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import ChatbotWidget from "./components/layout/ChatbotWidget.jsx";

import { useState, useEffect } from "react";
import { useCursor } from "./hooks/useCursor";   // <-- ADDED

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  useCursor();  // <-- ADDED

  useEffect(() => {
    const handler = () => setChatOpen(true);
    window.addEventListener("open-chatbot", handler);
    return () => window.removeEventListener("open-chatbot", handler);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-white">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        <ChatbotWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
