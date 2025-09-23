"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Toast = { id: string; title: string; kind?: "success"|"error"|"info"|"warn" };

const ToastCtx = createContext<{ push: (t: Omit<Toast, "id">) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("ToastProvider missing");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  function push(t: Omit<Toast,"id">) {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== id)), 3500);
  }
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="toast-container">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="ac-card px-4 py-3 text-sm"
            >
              <span className={
                t.kind === "success" ? "text-green-600" :
                t.kind === "error" ? "text-red-600" :
                t.kind === "warn" ? "text-yellow-600" : "text-zinc-700 dark:text-zinc-200"
              }>
                {t.title}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
