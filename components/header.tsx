// Server component: renders navbar ONLY when authenticated
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import HeaderClient from "./header-client";

export default async function Header() {
    const session = await getServerSession(authOptions);
    if (!session) return null; // hide header on sign-in page or when logged out

    const role = (session.user as any)?.role as "ADMIN" | "TECH" | undefined;
    return <HeaderClient role={role} />;
}
