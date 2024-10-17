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

// const { data: session } = useSession();

//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider session={session}>{children}</SessionProvider>
//       </body>
//     </html>
//   );
// }
