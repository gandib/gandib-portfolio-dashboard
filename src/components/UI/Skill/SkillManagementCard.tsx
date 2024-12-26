"use client";
import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import { useUser } from "@/src/context/user.provider";
import { useCreateProject, useUpdateProject } from "@/src/hooks/project.hook";
import { useCreateSkill, useUpdateSkill } from "@/src/hooks/skill.hook";
import { IProject, ISkill } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

const SkillManageCard = ({
  cardTitle,
  skill,
}: {
  cardTitle: string;
  skill?: ISkill;
}) => {
  const { user, isLoading } = useUser();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { mutate: handleCreateSkill, isPending, isSuccess } = useCreateSkill();
  const router = useRouter();
  const [name, setName] = useState(skill?.name || "");
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: handleUpdateSkill, isSuccess: skillUpdateSuccess } =
    useUpdateSkill();

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    const skillData = {
      ...data,
      logo: "",
    };

    if (cardTitle === "Update") {
      const updatedSkillData = {
        id: skill?._id,
        data: {
          name: name,
        },
      };

      handleUpdateSkill(updatedSkillData);
    }

    formData.append("data", JSON.stringify(skillData));
    console.log(imageFiles[0]);
    if (imageFiles[0] === undefined) {
      return setErrorMessage("Please select a logo!");
    }

    formData.append("file", imageFiles[0]);

    if (cardTitle === "Add") {
      handleCreateSkill(formData);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setErrorMessage("");
    setImageFiles([file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  if (isPending) {
    //handle loading state
  }

  if (isLoading) {
    <p>Loading...</p>;
  }

  useEffect(() => {
    if (isSuccess || skillUpdateSuccess) {
      router.push("/dashboard/skills");
    }
  }, [skillUpdateSuccess, isSuccess, router]);
  return (
    <div>
      <div className="flex mt-6 w-full flex-col items-center justify-center mb-12">
        <h3 className="my-2 text-2xl font-bold">{cardTitle} Skill</h3>
        <div className=" w-[80%]">
          <ESForm
            onSubmit={onSubmit}
            // resolver={zodResolver(createShopValidationSchema)}
          >
            <div className="py-3">
              <ESInput
                name="name"
                label="Name"
                size="sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
            </div>

            {cardTitle === "Add" && (
              <div className="min-w-fit flex-1 h-12">
                <label
                  className="bg-default-50/10 border-2 p-3 w-full h-full rounded-md flex items-center font-light"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            )}
            {errorMessage && cardTitle === "Add" && (
              <p className="text-red-500 text-base">{errorMessage}</p>
            )}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-5 my-5">
                <div className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2">
                  <img
                    src={imagePreviews[0] as string}
                    //   alt="item"
                    className="h-full w-full object-cover object-center rounded-md"
                  />
                </div>
              </div>
            )}

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Submit
            </Button>
          </ESForm>
        </div>
      </div>
    </div>
  );
};

export default SkillManageCard;
