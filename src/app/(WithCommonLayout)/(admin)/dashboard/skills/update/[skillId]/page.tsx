import SkillManageCard from "@/src/components/UI/Skill/SkillManagementCard";
import { getSingleSkill } from "@/src/services/SkillService";

const SkillUpdate = async ({ params }: { params: { skillId: string } }) => {
  const { data: skill } = await getSingleSkill(params?.skillId);
  return (
    <div>
      <SkillManageCard cardTitle="Update" skill={skill} />
    </div>
  );
};

export default SkillUpdate;
