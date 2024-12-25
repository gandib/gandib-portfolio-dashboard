"use client";
import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import { useUser } from "@/src/context/user.provider";
import { useCreateProject, useUpdateProject } from "@/src/hooks/project.hook";
import { IProject } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

const ProjectManageCard = ({
  cardTitle,
  project,
}: {
  cardTitle: string;
  project?: IProject;
}) => {
  const { user, isLoading } = useUser();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const {
    mutate: handleCreateProject,
    isPending,
    isSuccess,
  } = useCreateProject();
  const router = useRouter();
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [clientLiveLink, setClientLiveLink] = useState(
    project?.clientLiveLink || ""
  );
  const [serverLiveLink, setServerLiveLink] = useState(
    project?.serverLiveLink || ""
  );
  const [gitClientLink, setGitClientLink] = useState(
    project?.gitClientLink || ""
  );
  const [gitServerLink, setGitServerLink] = useState(
    project?.gitServerLink || ""
  );
  const [tag, setTag] = useState(project?.tag || "");

  const { mutate: handleUpdateProject, isSuccess: projectUpdateSuccess } =
    useUpdateProject();

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    const projectData = {
      ...data,
      image: "",
    };

    if (cardTitle === "Update") {
      const updatedProjectData = {
        id: project?._id,
        data: {
          title: title,
          description: data.description || description,
          tag: data.tag || tag,
          clientLiveLink: data.clientLiveLink || clientLiveLink,
          serverLiveLink: data.serverLiveLink || serverLiveLink,
          gitClientLink: data.gitClientLink || gitClientLink,
          gitServerLink: data.gitServerLink || gitServerLink,
        },
      };

      handleUpdateProject(updatedProjectData);
    }

    formData.append("data", JSON.stringify(projectData));

    formData.append("file", imageFiles[0]);

    if (cardTitle === "Add") {
      handleCreateProject(formData);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

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
    if (isSuccess || projectUpdateSuccess) {
      router.push("/dashboard/projects");
    }
  }, [projectUpdateSuccess, isSuccess, router]);
  return (
    <div>
      <div className="flex mt-6 w-full flex-col items-center justify-center mb-12">
        <h3 className="my-2 text-2xl font-bold">{cardTitle} Project</h3>
        <div className=" w-[80%]">
          <ESForm
            onSubmit={onSubmit}
            // resolver={zodResolver(createShopValidationSchema)}
          >
            <div className="py-3">
              <ESInput
                name="title"
                label="Title"
                size="sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
            </div>
            <div className="py-3">
              <ESInput
                name="description"
                label="Description"
                size="sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
              />
            </div>
            <div className="py-3">
              <ESInput
                name="tag"
                label="Tag"
                size="sm"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required={true}
              />
            </div>
            <div className="py-3">
              <ESInput
                name="clientLiveLink"
                label="Client Live Link"
                size="sm"
                value={clientLiveLink}
                onChange={(e) => setClientLiveLink(e.target.value)}
              />
            </div>
            <div className="py-3">
              <ESInput
                name="serverLiveLink"
                label="Server Live Link"
                size="sm"
                value={serverLiveLink}
                onChange={(e) => setServerLiveLink(e.target.value)}
              />
            </div>
            <div className="py-3">
              <ESInput
                name="gitClientLink"
                label="Git Client Link"
                size="sm"
                value={gitClientLink}
                onChange={(e) => setGitClientLink(e.target.value)}
              />
            </div>
            <div className="py-3">
              <ESInput
                name="gitServerLink"
                label="Git Server Link"
                size="sm"
                value={gitServerLink}
                onChange={(e) => setGitServerLink(e.target.value)}
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

export default ProjectManageCard;
