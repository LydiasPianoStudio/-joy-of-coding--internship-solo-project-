"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@radix-ui/themes";

export default function UpdatePracticeLogPage() {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic route ID from the URL
  const [log, setLog] = useState(null);
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null);

  // Fetch the practice log details using the provided `id`
  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await fetch(`/api/practice-log/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch practice log");
        }
        const data = await response.json();
        setLog(data);
        setDuration(data.duration); // Set initial duration from fetched log
        setNotes(data.notes || ""); // Set initial notes, default to empty if null
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
  }, [id]);

  // Handle updating the practice log
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedLog = {
      duration,
      notes,
    };

    const res = await fetch(`/api/practice-log/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLog),
    });

    if (res.ok) {
      router.push("/practice-log"); // Redirect to practice log list on successful update
    } else {
      console.error("Failed to update log");
      setError("Failed to update log"); // Show error if update fails
    }
  };

  // Loading and error handling
  if (loading) {
    return <p>Loading practice log...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Update Practice Log</h1>
      {log ? (
        <form onSubmit={handleUpdate}>
          <label className="block mt-2">
            <span className="text-gray-700">Duration (minutes)</span>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full"
              required
            />
          </label>
          <label className="block mt-2">
            <span className="text-gray-700">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full"
              required
            />
          </label>
          <Button
            type="submit"
            className="bg-fuchsia-700 text-white py-1 px-3 rounded hover:bg-fuchsia-900 text-lg mr-2"
          >
            Update Log
          </Button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
