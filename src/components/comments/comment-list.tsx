import { fetchCommentsByPostId } from "@/db/queries/comments";
import CommentShow from "./comment-show";

interface CommentListProps {
    postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
    const comments = await fetchCommentsByPostId(postId);

    const topLevelComments = comments.filter((c) => c.parentId === null);

    const renderedComments = topLevelComments.map((comment) => {
        return (
            <CommentShow
                key={comment.id}
                commentId={comment.id}
                postId={postId}
            />
        );
    });

    return (
        <div className="space-y-3">
            <h1 className="text-lg font-bold">
                All {comments.length} comments
            </h1>
            {renderedComments}
        </div>
    );
}
