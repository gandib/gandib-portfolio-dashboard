import ProjectDetailCard from "@/src/components/UI/Project/ProjectDetailCard";
import { getSingleProject } from "@/src/services/ProjectService";

const ProjectDetail = async ({ params }: { params: { projectId: string } }) => {
  const { data: project } = await getSingleProject(params?.projectId);
  return (
    <div>
      <ProjectDetailCard project={project} />
    </div>
  );
};

export default ProjectDetail;
