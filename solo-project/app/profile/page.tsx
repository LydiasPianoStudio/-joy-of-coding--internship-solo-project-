"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {session ? (
        <div>
          {session.user && (
            <>
              <p>Signed in as {session.user.email}</p>
              <p>Name: {session.user.name}</p>
            </>
          )}
          {/* Add more profile details here */}
        </div>
      ) : (
        <p>You are not signed in.</p>
      )}
    </div>
  );
}
