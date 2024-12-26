import BlogManageCard from "@/src/components/UI/Blog/BlogManagementCard";
import { getSingleBlog } from "@/src/services/BlogService";

type Params = Promise<{ blogId: string }>;

const BlogUpdate = async (params: { params: Params }) => {
  const blogId = (await params.params).blogId;
  const { data: blog } = await getSingleBlog(blogId);
  return (
    <div>
      <BlogManageCard cardTitle="Update" blog={blog} />
    </div>
  );
};

export default BlogUpdate;
