import BlogDisplayCard from "@/src/components/UI/Blog/BlogDisplayCard";
import ProjectDisplayCard from "@/src/components/UI/Project/ProjectDisplayCard";
import { getAllProjects } from "@/src/services/ProjectService";

const Projects = async () => {
  const { data: allProjects } = await getAllProjects([
    { name: "limit", value: 10 },
  ]);
  return (
    <div>
      <ProjectDisplayCard projects={allProjects} />
    </div>
  );
};

export default Projects;
