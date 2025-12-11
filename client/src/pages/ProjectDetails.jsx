import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel from "../components/layout/Carousel.jsx";
import useFetch from "../hooks/useFetch.js";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch("/data/projects.json");  // Fixed: add error
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (data?.projects) {
      setProject(data.projects.find((p) => p.id.toString() === id));
    }
  }, [data, id]);

  if (loading) return <p className="p-8 text-white">Loading project...</p>;
  if (error || !project) return <p className="p-8 text-red-400">Project not found</p>;  // ✅ Fixed skeleton

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-400 mb-6">{project.description}</p>  {/* Fixed color */}
      
      {project.images && <Carousel images={project.images} />}
      
      <div className="mt-6 space-y-2 text-gray-400">
        <p><span className="font-semibold text-white">Tech Stack:</span> {project.tech}</p>
        <p><span className="font-semibold text-white">Category:</span> {project.category}</p>
      </div>
    </div>
  );
};

export default ProjectDetails;
