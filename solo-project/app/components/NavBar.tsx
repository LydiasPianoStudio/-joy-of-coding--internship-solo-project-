"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="navbar">
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()} className="btn-signout">
            Sign Out
          </button>
        </>
      ) : (
        <button onClick={() => signIn()} className="btn-signin">
          Sign In
        </button>
      )}
    </nav>
  );
}
