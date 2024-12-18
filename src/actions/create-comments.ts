"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import paths from "@/paths";
import { auth } from "@/auth";

const createCommentSchema = z.object({
    content: z.string().min(3),
});

interface CreateCommentFormState {
    errors: {
        content?: string[];
        _forms?: string[];
    };
    success?: boolean;
}

interface Args {
    postId?: string;
    parentId?: string;
}

export async function createComment(
    { postId, parentId }: Args,
    formState: CreateCommentFormState,
    formData: FormData,
): Promise<CreateCommentFormState> {
    const result = createCommentSchema.safeParse({
        content: formData.get("content"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _forms: ["You must sign in to do this."],
            },
        };
    }

    try {
        await db.comment.create({
            data: {
                content: result.data.content,
                postId: postId as string,
                parentId: parentId,
                userId: session.user.id as string,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _forms: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    _forms: ["Something went wrong..."],
                },
            };
        }
    }

    const topic = await db.topic.findFirst({
        where: { posts: { some: { id: postId } } },
    });
    if (!topic) {
        return {
            errors: {
                _forms: ["Failed to revalidate topic"],
            },
        };
    }
    revalidatePath(paths.postShow(topic.slug, postId as string));
    return {
        errors: {},
        success: true,
    };
    // TODO: revlidate the post show page
}
