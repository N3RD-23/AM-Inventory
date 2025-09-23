"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ui/toast";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(m);
    document.documentElement.classList.toggle("dark", m);
  }, []);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
