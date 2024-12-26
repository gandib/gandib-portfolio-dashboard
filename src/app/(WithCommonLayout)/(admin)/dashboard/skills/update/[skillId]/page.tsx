import SkillManageCard from "@/src/components/UI/Skill/SkillManagementCard";
import { getSingleSkill } from "@/src/services/SkillService";

type Params = Promise<{ skillId: string }>;

const SkillUpdate = async (params: { params: Params }) => {
  const skillId = (await params.params).skillId;
  const { data: skill } = await getSingleSkill(skillId);
  return (
    <div>
      <SkillManageCard cardTitle="Update" skill={skill} />
    </div>
  );
};

export default SkillUpdate;
