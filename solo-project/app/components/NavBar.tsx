"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="flex space-x-4 p-4 bg-white shadow-md rounded-lg">
      <Link
        href="/auth/signin"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Sign Up
      </Link>
      {session && (
        <Link
          href={`/practice-log/${session.user.id}`}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          My Practice Log
        </Link>
      )}
    </nav>
  );
}
