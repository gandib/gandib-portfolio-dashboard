"use client";

import { Card as NextUiCard, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { IProject } from "@/src/types";
import Link from "next/link";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const ProjectDetailCard = ({ project }: { project: IProject }) => {
  console.log(project);
  return (
    <div>
      {project ? (
        <NextUiCard
          key={project._id}
          isFooterBlurred
          className=" hover:shadow-2xl pb-4"
        >
          <CardHeader className=" ">
            {project?.image && (
              <Image
                width={1000}
                height={500}
                src={project?.image[0]}
                alt="Product image"
              />
            )}
          </CardHeader>

          <CardBody>
            <div className=" w-full">
              <h4 className="mt-1 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                {project.tag}
              </h4>
              {project?.clientLiveLink && (
                <p className="mt-1 rounded  p-1 text-lg  md:text-lg font-semibold ">
                  Client Live Link:{" "}
                  <Link
                    href={project?.clientLiveLink}
                    className="text-green-500"
                  >
                    {project?.clientLiveLink}
                  </Link>
                </p>
              )}
              {project?.serverLiveLink && (
                <p className="mt-1 rounded  p-1 text-lg  md:text-lg font-semibold ">
                  Server Live Link:{" "}
                  <Link
                    href={project?.serverLiveLink}
                    className="text-green-500"
                  >
                    {project?.serverLiveLink}
                  </Link>
                </p>
              )}
              {project?.gitClientLink && (
                <p className="mt-1 rounded  p-1 text-lg  md:text-lg font-semibold ">
                  Git Client Live Link:{" "}
                  <Link
                    href={project?.gitClientLink}
                    className="text-green-500"
                  >
                    {project?.gitClientLink}
                  </Link>
                </p>
              )}
              {project?.gitServerLink && (
                <p className="mt-1 rounded  p-1 text-lg  md:text-lg font-semibold ">
                  Git Server Live Link:{" "}
                  <Link
                    href={project?.gitServerLink}
                    className="text-green-500"
                  >
                    {project?.gitServerLink}
                  </Link>
                </p>
              )}
              <h4 className="mt-1 rounded  p-1 text-xl  md:text-xl font-semibold ">
                {project?.title}
              </h4>
            </div>
            <div className="my-1 rounded  p-1 lg:text-lg font-medium flex ">
              <h1>{project.description}</h1>
            </div>
          </CardBody>
        </NextUiCard>
      ) : (
        "No projects to show!"
      )}
    </div>
  );
};

export default ProjectDetailCard;
