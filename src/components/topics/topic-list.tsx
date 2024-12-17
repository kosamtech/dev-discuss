"use client";

import { useActionState, useEffect, startTransition } from "react";
import Link from "next/link";
import { Chip } from "@nextui-org/react";
import * as actions from "@/actions";
import paths from "@/paths";

export default function TopicList() {
    const [data, action] = useActionState(actions.queryTopic, []);
    useEffect(() => {
        startTransition(() => action());
    }, []);

    const renderedTopics = data.map((topic) => {
        return (
            <div key={topic.id}>
                <Link href={paths.topicShow(topic.slug)}>
                    <Chip color="warning" variant="shadow">
                        {topic.slug}
                    </Chip>
                </Link>
            </div>
        );
    });

    return (
        <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>
    );
}
