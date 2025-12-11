import Hero from "../components/layout/Hero.jsx";
import Stats from "../components/layout/Stats.jsx";
import ProjectGrid from "../components/layout/ProjectGrid.jsx";
import ChatbotWidget from "../components/layout/ChatbotWidget.jsx";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Stats />
      <ProjectGrid />
      <ChatbotWidget />
    </div>
  );
};

export default Home;
