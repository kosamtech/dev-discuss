"use server";

import { db } from "@/db";
import { Topic } from "@prisma/client";

export async function queryTopic(data: Topic[]) {
    return await db.topic.findMany();
}
