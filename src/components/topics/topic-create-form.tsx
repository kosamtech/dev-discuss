"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Input,
    Button,
    Textarea,
} from "@nextui-org/react";
import { useActionState, startTransition, FormEvent } from "react";
import * as actions from "@/actions";
import FormButton from "../common/form-button";

export default function TopicCreateForm() {
    const [formState, action, isPending] = useActionState(actions.createTopic, {
        errors: {},
    });

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
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Topic</h3>
                        <Input
                            name="name"
                            label="Name"
                            labelPlacement="outside"
                            placeholder="Name"
                            isInvalid={!!formState.errors?.name}
                            errorMessage={formState.errors?.name?.join(", ")}
                        />
                        <Textarea
                            name="description"
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Describe your topic"
                            isInvalid={!!formState.errors?.description}
                            errorMessage={formState.errors?.description?.join(
                                ", ",
                            )}
                        />

                        {formState.errors._form && (
                            <div className="p-2 bg-red-200 border border-red-400 rounded">
                                {formState.errors?._form?.join(", ")}
                            </div>
                        )}
                        <FormButton isLoading={isPending}>Save</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
