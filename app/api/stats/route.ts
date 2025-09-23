import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });


    const [users, pc, monitor, ups, brands, locations, departments, categories] = await Promise.all([
        prisma.user.count(),
        prisma.asset.count({ where: { category: "PC" } }),
        prisma.asset.count({ where: { category: "MONITOR" } }),
        prisma.asset.count({ where: { category: "UPS" } }),
        prisma.brand.count(),
        prisma.location.count(),
        prisma.department.count(),
        prisma.category.count(),
    ]);


    return Response.json({
        users,
        pc,
        monitors: monitor,
        ups,
        brands,
        locations,
        departments,
        categories
    });
}