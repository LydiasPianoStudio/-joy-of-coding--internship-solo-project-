// app/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import "./styles/globals.css"; // Import your global styles

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
