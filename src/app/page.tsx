"use client";

import { Button } from "@nextui-org/react";
import * as action from "@/actions";
import Profile from "@/components/profile";

export default function Home() {

    return (
        <div>
            <form action={action.signIn}>
              <Button type="submit">SignIn</Button>
            </form>

            <form action={action.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>

            <Profile />
        </div>
    );
}
