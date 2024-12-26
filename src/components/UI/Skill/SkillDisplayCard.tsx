"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ISkill } from "@/src/types";
import { getAllSkills } from "@/src/services/SkillService";
import { useRouter } from "next/navigation";
import { useDeleteSkill } from "@/src/hooks/skill.hook";
import { DeleteIcon, EditIcon } from "lucide-react";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const SkillDisplayCard = ({
  skill,
}: {
  skill: { meta: IMeta; result: ISkill[] };
}) => {
  const [skillData, setSkillData] = useState(skill);
  // const [currentPage, setCurrentPage] = useState(skillData?.meta?.page);
  //   const [limit, setLimit] = useState(10);
  // const [totalPage, setTotalPage] = useState(skillData?.meta?.totalPage);
  const router = useRouter();
  const { mutate: deleteSkill, isSuccess } = useDeleteSkill();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: allSkill } = await getAllSkills([]);
        setSkillData(allSkill);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    fetchData();
  }, [isSuccess]);

  const handleDelete = (id: string) => {
    deleteSkill(id);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 px-4 sm:px-8">
      {skillData?.result?.map((skill) => (
        <div key={skill._id} className="rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center p-4  ">
            <Image
              src={skill.logo}
              alt={`${skill.name} logo`}
              width={48}
              height={48}
              className="mb-2"
            />
          </div>
          <p className="flex justify-end items-end p-1">
            {" "}
            <EditIcon
              onClick={() =>
                router.push(`/dashboard/skills/update/${skill._id}`)
              }
              className="cursor-pointer"
            />
            <DeleteIcon
              onClick={() => handleDelete(skill._id)}
              className="ml-4 cursor-pointer"
            />
          </p>

          {/* <span className="text-lg font-semibold text-yellow-600">
              {skill.name}
            </span> */}
        </div>
      ))}
    </div>
  );
};

export default SkillDisplayCard;
