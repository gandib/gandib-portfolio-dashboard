import SkillDisplayCard from "@/src/components/UI/Skill/SkillDisplayCard";
import { getAllSkills } from "@/src/services/SkillService";

const Skills = async () => {
  const { data: allSkills } = await getAllSkills([]);
  console.log(allSkills);
  return (
    <div>
      <SkillDisplayCard skill={allSkills} />
    </div>
  );
};

export default Skills;
