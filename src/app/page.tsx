import BlogDisplayCard from "../components/UI/Blog/BlogDisplayCard";
import Container from "../components/UI/Container";
import { getAllBlogs } from "../services/BlogService";

export default async function Home() {
  const { data: allBlogs } = await getAllBlogs([
    { name: "limit", value: 10 },
    { name: "sort", value: "-createdAt" },
  ]);
  return (
    <Container>
      <h1 className="py-8 text-2xl font-bold">My Blogs</h1>
      <BlogDisplayCard blogs={allBlogs} />
    </Container>
  );
}
