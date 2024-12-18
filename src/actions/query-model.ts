"use server";

import { db } from "@/db";
import { PostWithData } from "@/db/queries/posts";

export async function queryTopic() {
    return await db.topic.findMany();
}

export async function queryComment() {
    return await db.comment.findMany();
}

export async function fetchTopPost(): Promise<PostWithData[]> {
    return await db.post.findMany({
        orderBy: [
            {
                comments: {
                    _count: "desc",
                },
            },
        ],
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } },
        },
        take: 5,
    });
}
