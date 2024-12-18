import HomeLayout from "@/components/home-layout";
import { fetchTopPosts } from "@/db/queries/posts";

export default function Home() {
    return <HomeLayout />;
}
