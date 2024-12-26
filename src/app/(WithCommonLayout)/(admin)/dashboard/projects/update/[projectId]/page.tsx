import ProjectManageCard from "@/src/components/UI/Project/ProjectManagementCard";
import { getSingleProject } from "@/src/services/ProjectService";

type Params = Promise<{ projectId: string }>;

const ProjectUpdate = async (params: { params: Params }) => {
  const projectId = (await params.params).projectId;
  const { data: project } = await getSingleProject(projectId);
  return (
    <div>
      <ProjectManageCard cardTitle="Update" project={project} />
    </div>
  );
};

export default ProjectUpdate;
