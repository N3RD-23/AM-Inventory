import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    const session = await getServerSession(authOptions);
    return Response.json({ session }, { headers: { "cache-control": "no-store" } });
}
