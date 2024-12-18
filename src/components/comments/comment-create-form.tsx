"use client";

import {
    FormEvent,
    startTransition,
    useActionState,
    useEffect,
    useRef,
    useState,
} from "react";
import { Textarea, Button } from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";

interface CommentCreateFormProps {
    postId: string;
    parentId?: string;
    startOpen?: boolean;
}

export default function CommentCreateForm({
    postId,
    parentId,
    startOpen,
}: CommentCreateFormProps) {
    const [open, setOpen] = useState(startOpen);
    const ref = useRef<HTMLFormElement | null>(null);
    const [formState, action, isPending] = useActionState(
        actions.createComment.bind(null, { postId, parentId }),
        { errors: {} },
    );

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const formData = new FormData(ev.currentTarget);
        startTransition(() => {
            action(formData);
        });
    };

    useEffect(() => {
        if (formState.success) {
            ref.current?.reset();

            if (!startOpen) {
                setOpen(false);
            }
        }
    }, [formState, startOpen]);

    const form = (
        <form onSubmit={handleSubmit} ref={ref}>
            <div className="space-y-2 px-1">
                <Textarea
                    name="content"
                    label="Reply"
                    placeholder="Enter your comment"
                    isInvalid={!!formState.errors?.content}
                    errorMessage={formState.errors.content?.join(", ")}
                />

                {formState.errors._forms && (
                    <div className="p-2 bg-red-200 border rounded border-red-400">
                        {formState.errors._forms.join(", ")}
                    </div>
                )}

                <FormButton isLoading={isPending}>Create Comment</FormButton>
            </div>
        </form>
    );

    return (
        <div>
            <Button
                size="sm"
                variant="light"
                type="button"
                onPress={() => setOpen(!open)}
            >
                Reply
            </Button>
            {open && form}
        </div>
    );
}
