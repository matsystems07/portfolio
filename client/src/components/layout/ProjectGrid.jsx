import ProjectCard from "./ProjectCard";
import projects from "../../data/projects.json";

export default function ProjectGrid() {
  const featured = projects;

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <ProjectCard
              key={p.id}
              id={p.id}
              title={p.title}
              tech={p.tech}
              thumbnail={p.thumbnail}
              live={p.live}
              repo={p.repo}
              description={p.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
