"use client";

import { DateRangePicker } from "@nextui-org/react";
import type { RangeValue, DateValue } from "@react-types/calendar";
import { parseDate, CalendarDate } from "@internationalized/date";
import { useMemo } from "react";

type Props = {
    value: { from?: string; to?: string };
    onChange: (v: { from?: string; to?: string }) => void;
    label?: string;
    visibleMonths?: number;
    className?: string;
};

export default function RangeDatePicker({
    value,
    onChange,
    label = "Date range",
    visibleMonths = 1,
    className,
}: Props) {
    const rangeValue: RangeValue<DateValue> | undefined = useMemo(() => {
        const start = value?.from ? (parseDate(value.from) as CalendarDate) : undefined;
        const end = value?.to ? (parseDate(value.to) as CalendarDate) : undefined;
        if (!start && !end) return undefined;
        return { start, end };
    }, [value?.from, value?.to]);

    function handleChange(next: RangeValue<DateValue> | null) {
        const from = (next?.start as CalendarDate | undefined)?.toString();
        const to = (next?.end as CalendarDate | undefined)?.toString();
        const out: { from?: string; to?: string } = {};
        if (from) out.from = from;
        if (to) out.to = to;
        onChange(out);
    }

    return (
        <DateRangePicker
            aria-label={label}
            value={rangeValue}
            onChange={handleChange}
            visibleMonths={visibleMonths}
            showMonthAndYearPickers
            className={className}
        />
    );
}
