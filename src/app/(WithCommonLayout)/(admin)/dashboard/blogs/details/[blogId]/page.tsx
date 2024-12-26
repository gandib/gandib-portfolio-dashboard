import BlogDetailCard from "@/src/components/UI/Blog/BlogDetailCard";
import { getSingleBlog } from "@/src/services/BlogService";

const BlogDetail = async ({ params }: { params: { blogId: string } }) => {
  const { data: blog } = await getSingleBlog(params?.blogId);
  return (
    <div>
      <BlogDetailCard blog={blog} />
    </div>
  );
};

export default BlogDetail;
