"use client";

import { useSession } from "next-auth/react";
import * as action from "@/actions";
import {
    NavbarItem,
    Button,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@nextui-org/react";

export default function HeaderAuth() {
    const { data, status } = useSession();

    let authContent: React.ReactNode;
    if (status === "loading") {
        authContent = null;
    } else if (data?.user) {
        authContent = (
            <Popover placement="left">
                <PopoverTrigger>
                    <Avatar src={data.user.image || ""} />
                </PopoverTrigger>
                <PopoverContent>
                    <div className="p-4">
                        <form action={action.signOut}>
                            <Button type="submit">Sign Out</Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        );
    } else {
        authContent = (
            <>
                <NavbarItem>
                    <form action={action.signIn}>
                        <Button
                            type="submit"
                            color="secondary"
                            variant="bordered"
                        >
                            Sign In
                        </Button>
                    </form>
                </NavbarItem>

                <NavbarItem>
                    <form action={action.signIn}>
                        <Button type="submit" color="primary" variant="flat">
                            Sign Up
                        </Button>
                    </form>
                </NavbarItem>
            </>
        );
    }
    return authContent;
}
