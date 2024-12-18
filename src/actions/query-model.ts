"use server";

import { db } from "@/db";
import { Comment, Topic } from "@prisma/client";

export async function queryTopic(data: Topic[]) {
    return await db.topic.findMany();
}

export async function queryComment() {
    return await db.comment.findMany();
}
