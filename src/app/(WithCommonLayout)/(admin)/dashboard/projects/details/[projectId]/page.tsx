import ProjectDetailCard from "@/src/components/UI/Project/ProjectDetailCard";
import { getSingleProject } from "@/src/services/ProjectService";

type Params = Promise<{ projectId: string }>;

const ProjectDetail = async (params: { params: Params }) => {
  const projectId = (await params.params).projectId;
  const { data: project } = await getSingleProject(projectId);
  return (
    <div>
      <ProjectDetailCard project={project} />
    </div>
  );
};

export default ProjectDetail;
