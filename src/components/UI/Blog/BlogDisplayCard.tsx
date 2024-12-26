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
import { IBlog, queryParams } from "@/src/types";
import { getAllBlogs } from "@/src/services/BlogService";
import { useRouter } from "next/navigation";
import { useDeleteBlog } from "@/src/hooks/blog.hook";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const BlogDisplayCard = ({
  blogs,
}: {
  blogs: { meta: IMeta; result: IBlog[] };
}) => {
  const [blogData, setBlogData] = useState(blogs);
  const [currentPage, setCurrentPage] = useState(blogData?.meta?.page);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(blogData?.meta?.totalPage);
  const router = useRouter();
  const { mutate: deleteBlog, isSuccess } = useDeleteBlog();

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
        const { data: allBlogs } = await getAllBlogs([
          ...query,
          { name: "sort", value: "-createdAt" },
        ]);
        setBlogData(allBlogs);
        setTotalPage(blogData?.meta?.totalPage);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    if (query.length > 0) {
      fetchData();
    }
  }, [currentPage, totalPage, isSuccess]);

  const handleDelete = (id: string) => {
    deleteBlog(id);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-2 grow relative">
        {blogData &&
          blogData?.result?.length > 0 &&
          blogData?.result?.map((data: IBlog) => (
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
                  <div
                    className="instructions"
                    dangerouslySetInnerHTML={{
                      __html:
                        data.description.slice(0, 150) +
                        `${data.description.length > 150 ? "..." : ""}`,
                    }}
                  />
                </div>
              </CardBody>

              <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
                <>
                  <Button
                    onPress={() =>
                      router.push(`/dashboard/blogs/update/${data._id}`)
                    }
                  >
                    Update{" "}
                  </Button>
                  <Button onPress={() => handleDelete(data._id)}>
                    Delete{" "}
                  </Button>
                  <Button
                    onPress={() =>
                      router.push(`/dashboard/blogs/details/${data._id}`)
                    }
                  >
                    See Detail{" "}
                  </Button>
                </>
              </CardFooter>
            </NextUiCard>
          ))}
      </div>
      {blogData?.result?.length > 0 ? (
        <Pagination
          total={totalPage}
          page={currentPage}
          showControls
          onChange={(page) => setCurrentPage(page)}
          className="flex justify-center my-2"
        />
      ) : (
        "No blogs to show!"
      )}
    </div>
  );
};

export default BlogDisplayCard;
