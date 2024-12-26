import BlogDetailCard from "@/src/components/UI/Blog/BlogDetailCard";
import { getSingleBlog } from "@/src/services/BlogService";

type Params = Promise<{ blogId: string }>;

const BlogDetail = async (params: { params: Params }) => {
  const blogId = (await params.params).blogId;
  const { data: blog } = await getSingleBlog(blogId);
  return (
    <div>
      <BlogDetailCard blog={blog} />
    </div>
  );
};

export default BlogDetail;
