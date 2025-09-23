"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useToast();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
    if (!res?.ok) push({ title: "Invalid credentials", kind: "error" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="ac-card max-w-md w-full p-6">
        <h1 className="text-xl font-semibold mb-2">Welcome back</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Sign in to manage inventory.</p>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="ac-input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="ac-input" type="password" required value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button className="ac-btn w-full">Sign in</button>
          <p className="text-xs text-zinc-500">Ananea Madivaru Maldives © 2025</p>
        </form>
      </div>
    </div>
  );
}
