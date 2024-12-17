"use client";

import { FormEvent, startTransition, useActionState } from "react";
import {
    Textarea,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Button,
    Input,
} from "@nextui-org/react";
import FormButton from "../common/form-button";
import * as actions from "@/actions";

interface PostCreateFormProps {
    slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
    const [formState, action, isPending] = useActionState(
        actions.createPost.bind(null, slug),
        {
            errors: {},
        },
    );

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const formData = new FormData(ev.currentTarget);
        startTransition(() => {
            action(formData);
        });
    };

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create a Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Post </h3>

                        <Input
                            name="title"
                            label="Title"
                            labelPlacement="outside"
                            placeholder="Title"
                            isInvalid={!!formState.errors?.title?.join(", ")}
                            errorMessage={formState.errors?.title?.join(", ")}
                        />
                        <Textarea
                            name="content"
                            label="content"
                            labelPlacement="outside"
                            placeholder="Content"
                            isInvalid={!!formState.errors?.content?.join(", ")}
                            errorMessage={formState.errors?.content?.join(", ")}
                        />

                        {formState.errors._form && (
                            <div className="rounded p-2 bg-red-200 border border-red-400">
                                {formState.errors._form.join(", ")}
                            </div>
                        )}

                        <FormButton isLoading={isPending}>
                            Create Post
                        </FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
