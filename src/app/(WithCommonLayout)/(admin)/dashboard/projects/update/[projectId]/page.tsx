import ProjectManageCard from "@/src/components/UI/Project/ProjectManagementCard";
import { getSingleProject } from "@/src/services/ProjectService";

const ProjectUpdate = async ({ params }: { params: { projectId: string } }) => {
  const { data: project } = await getSingleProject(params?.projectId);
  return (
    <div>
      <ProjectManageCard cardTitle="Update" project={project} />
    </div>
  );
};

export default ProjectUpdate;
