import BlogDisplayCard from "@/src/components/UI/Blog/BlogDisplayCard";
import { getAllBlogs } from "@/src/services/BlogService";

const Blogs = async () => {
  const { data: allBlogs } = await getAllBlogs([
    { name: "limit", value: 10 },
    { name: "sort", value: "-createdAt" },
  ]);

  return (
    <div>
      <BlogDisplayCard blogs={allBlogs} />
    </div>
  );
};

export default Blogs;
