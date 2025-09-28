type Field =
    | "message"
    | "action"
    | "category"
    | "entity"
    | "actorEmail"
    | "actorName"
    | "ip"
    | "before"
    | "after";

function parseYmd(s?: string | null): Date | undefined {
    if (!s) return undefined;
    // Accept YYYY-MM-DD; ignore if invalid
    const d = new Date(`${s}T00:00:00Z`);
    return isNaN(d.getTime()) ? undefined : d;
}

export function buildLogSearchWhere(q: string, from?: string | null, to?: string | null) {
    const fields: Field[] = [
        "message",
        "action",
        "category",
        "entity",
        "actorEmail",
        "actorName",
        "ip",
        "before",
        "after",
    ];

    const where: any = {};

    // Date range (only set if valid)
    const fromD = parseYmd(from);
    const toD = parseYmd(to);
    if (fromD || toD) {
        where.createdAt = {};
        if (fromD) where.createdAt.gte = fromD;
        if (toD) {
            // include full "to" day
            const end = new Date(toD);
            end.setUTCHours(23, 59, 59, 999);
            where.createdAt.lte = end;
        }
    }

    const qTrim = (q ?? "").trim();
    if (!qTrim) return where;

    const tokens = qTrim.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return where;

    where.AND = tokens.map((t) => ({
        OR: fields.map((f) => ({
            [f]: {
                contains: t,
                // omit mode for connector compatibility
            },
        })),
    }));

    return where;
}
