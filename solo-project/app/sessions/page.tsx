// app/sessions/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Session {
  id: number;
  sessionToken: string;
  userId: string;
  expires: string;
}

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("/api/auth/session");
        setSessions(response.data as Session[]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Sessions</h1>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <p>Session Token: {session.sessionToken}</p>
            <p>User ID: {session.userId}</p>
            <p>Expires: {new Date(session.expires).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionsPage;
