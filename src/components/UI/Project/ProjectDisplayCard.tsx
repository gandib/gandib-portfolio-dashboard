"use client";

import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
  Pagination,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { IProject, queryParams } from "@/src/types";
import { getAllProjects } from "@/src/services/ProjectService";
import { useRouter } from "next/navigation";
import { useDeleteProject } from "@/src/hooks/project.hook";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const ProjectDisplayCard = ({
  projects,
}: {
  projects: { meta: IMeta; result: IProject[] };
}) => {
  const [projectData, setProjectData] = useState(projects);
  const [currentPage, setCurrentPage] = useState(projectData?.meta?.page);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(projectData?.meta?.totalPage);
  const router = useRouter();
  const { mutate: deleteProject, isSuccess } = useDeleteProject();

  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }
    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }

    const fetchData = async () => {
      try {
        const { data: allProjects } = await getAllProjects([
          ...query,
          { name: "sort", value: "-createdAt" },
        ]);
        setProjectData(allProjects);
        setTotalPage(projectData?.meta?.totalPage);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    if (query.length > 0) {
      fetchData();
    }
  }, [currentPage, totalPage, isSuccess]);

  const handleDelete = (id: string) => {
    deleteProject(id);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-2 grow relative">
        {projectData &&
          projectData?.result?.length > 0 &&
          projectData?.result?.map((data: IProject) => (
            <NextUiCard
              key={data._id}
              isFooterBlurred
              className=" hover:shadow-2xl "
            >
              <CardHeader className=" ">
                {data?.image && (
                  <Image
                    width={500}
                    height={200}
                    src={data?.image[0]}
                    alt="Product image"
                  />
                )}
              </CardHeader>

              <CardBody>
                <div className=" w-full">
                  <h4 className="mt-1 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                    {data.tag}
                  </h4>
                  <h4 className="mt-1 rounded  p-1 text-xl  md:text-xl font-semibold ">
                    {data?.title}
                  </h4>
                </div>
                <div className="my-1 rounded  p-1 lg:text-lg font-medium flex ">
                  <h1>
                    {data.description.slice(0, 150) +
                      `${data.description.length > 150 ? "..." : ""}`}
                  </h1>
                </div>
              </CardBody>

              <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
                <>
                  <Button
                    onPress={() =>
                      router.push(`/dashboard/projects/update/${data._id}`)
                    }
                  >
                    Update{" "}
                  </Button>
                  <Button onPress={() => handleDelete(data._id)}>
                    Delete{" "}
                  </Button>
                  <Button
                    onPress={() =>
                      router.push(`/dashboard/projects/details/${data._id}`)
                    }
                  >
                    See Detail{" "}
                  </Button>
                </>
              </CardFooter>
            </NextUiCard>
          ))}
      </div>
      {projectData?.result?.length > 0 ? (
        <Pagination
          total={totalPage}
          page={currentPage}
          showControls
          onChange={(page) => setCurrentPage(page)}
          className="flex justify-center my-2"
        />
      ) : (
        "No projects to show!"
      )}
    </div>
  );
};

export default ProjectDisplayCard;
