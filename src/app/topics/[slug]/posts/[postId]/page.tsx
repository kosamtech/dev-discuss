import Link from "next/link";
import paths from "@/paths";
import PostShow from "@/components/posts/post-show";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import CommentList from "@/components/comments/comment-list";

interface PostShowPageProps {
    params: Promise<{ slug: string; postId: string }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
    const { slug, postId } = await params;
    return (
        <div className="space-y-3">
            <Link
                className="underline decorations-solid"
                href={paths.topicShow(slug)}
            >
                {"< "} Back to {slug}
            </Link>
            <PostShow postId={postId} />
            <CommentCreateForm postId={postId} startOpen />
            <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
        </div>
    );
}
