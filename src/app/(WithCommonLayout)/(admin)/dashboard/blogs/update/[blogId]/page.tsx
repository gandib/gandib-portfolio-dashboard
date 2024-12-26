import BlogManageCard from "@/src/components/UI/Blog/BlogManagementCard";
import { getSingleBlog } from "@/src/services/BlogService";

const BlogUpdate = async ({ params }: { params: { blogId: string } }) => {
  const { data: blog } = await getSingleBlog(params?.blogId);
  return (
    <div>
      <BlogManageCard cardTitle="Update" blog={blog} />
    </div>
  );
};

export default BlogUpdate;
