"use client";
import { motion, AnimatePresence } from "framer-motion";


export function ConfirmDialog({
    open,
    title = "Are you sure?",
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}: {
    open: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 grid place-items-center bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onCancel}
                >
                    <motion.div
                        className="ac-card w-[min(92vw,480px)] p-5 shadow-xl"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="confirm-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-3">
                            <h3 id="confirm-title" className="text-lg font-semibold">{title}</h3>
                            {description && <p className="text-sm opacity-80 mt-1">{description}</p>}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="ac-btn" onClick={onCancel}>{cancelText}</button>
                            <button className="ac-btn" onClick={onConfirm}>{confirmText}</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}