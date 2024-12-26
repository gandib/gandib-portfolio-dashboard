"use client";

import { Card as NextUiCard, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { IBlog } from "@/src/types";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const BlogDetailCard = ({ blog }: { blog: IBlog }) => {
  return (
    <div>
      {blog ? (
        <NextUiCard
          key={blog._id}
          isFooterBlurred
          className=" hover:shadow-2xl pb-4"
        >
          <CardHeader className=" ">
            {blog?.image && (
              <Image
                width={1000}
                height={500}
                src={blog?.image[0]}
                alt="Product image"
              />
            )}
          </CardHeader>

          <CardBody>
            <div className=" w-full">
              <h4 className="mt-1 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                {blog.tag}
              </h4>
              <h4 className="mt-1 rounded  p-1 text-xl  md:text-xl font-semibold ">
                {blog?.title}
              </h4>
            </div>
            <div className="my-1 rounded  p-1 lg:text-lg font-medium flex ">
              <div
                className="instructions"
                dangerouslySetInnerHTML={{
                  __html: blog.description,
                }}
              />
            </div>
          </CardBody>
        </NextUiCard>
      ) : (
        "No blogs to show!"
      )}
    </div>
  );
};

export default BlogDetailCard;
