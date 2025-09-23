import "./globals.css";
import Header from "@/components/header";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "AM Inventory",
  description: "Ananea Madivaru Maldives Inventory",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-dvh bg-zinc-950 text-zinc-100 antialiased">
        <Providers>
          <Header />
          <main className="mx-auto max-w-7xl px-3 sm:px-4 py-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
