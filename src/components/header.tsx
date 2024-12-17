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
    const session = useSession();

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

            <NavbarContent justify="end">
                <NavbarItem>
                    {session.data?.user ? (
                        <div>Signed In</div>
                    ) : (
                        <div>Signed Out</div>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
