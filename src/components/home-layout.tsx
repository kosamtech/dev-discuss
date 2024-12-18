"use client";

import TopicCreateForm from "./topics/topic-create-form";
import TopicList from "./topics/topic-list";
import { Divider } from "@nextui-org/react";
import PostListClient from "./posts/post-list-client";

export default function HomeLayout() {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <h1 className="text-xl m-2">Top Post</h1>
                <PostListClient />
            </div>
            <div className="border shadow py-3 px-2">
                <TopicCreateForm />
                <Divider />
                <h3 className="text-lg">Topics</h3>
                <TopicList />
            </div>
        </div>
    );
}
