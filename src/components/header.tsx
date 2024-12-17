"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
// import { auth } from "@/auth";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    Button,
    Avatar,
} from "@nextui-org/react";

export default function Header() {
    const { data } = useSession();

    let authContent: React.ReactNode;
    if (data?.user) {
        authContent = <Avatar src={data.user.image || ""} />;
    } else {
        authContent = (
            <>
                <NavbarItem>
                    <Button type="submit" color="secondary" variant="bordered">
                        Sign In
                    </Button>
                </NavbarItem>

                <NavbarItem>
                    <Button type="submit" color="primary" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </>
        );
    }

    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href={`/`} className="font-bold">
                    Discuss
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Input />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">{authContent}</NavbarContent>
        </Navbar>
    );
}
