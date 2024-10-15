"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/auth/signin">Sign In</Link>
      <Link href="/signup">Sign Up</Link>
      {session && (
        <Link href={`/practice-log/${session.user.id}`}>My Practice Log</Link>
      )}
    </nav>
  );
}
