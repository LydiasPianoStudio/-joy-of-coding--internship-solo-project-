"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PracticeLog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic route ID from the URL
  const [log, setLog] = useState({ date: "", duration: "", notes: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isNew = id === "new"; // Determine if this is a new log

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated" && !isNew) {
      const fetchLog = async () => {
        try {
          const response = await fetch(`/api/auth/practice-log/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch practice log");
          }
          const data = await response.json();
          setLog(data);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };

      if (id) {
        fetchLog();
      }
    } else {
      setLoading(false);
    }
  }, [status, id, isNew, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = isNew
      ? "/api/auth/practice-log"
      : `/api/auth/practice-log/${id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(log),
      });

      if (res.ok) {
        const responseData = await res.json();
        router.push(`/practice-log/${isNew ? responseData.id : id}`);
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to save practice log");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isNew ? "Add Practice Log" : "Update Practice Log"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={log.date}
            onChange={(e) => setLog({ ...log, date: e.target.value })}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700"
          >
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={log.duration}
            onChange={(e) => setLog({ ...log, duration: e.target.value })}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={log.notes}
            onChange={(e) => setLog({ ...log, notes: e.target.value })}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {isNew ? "Add Practice Log" : "Update Practice Log"}
        </button>
      </form>
    </div>
  );
}
