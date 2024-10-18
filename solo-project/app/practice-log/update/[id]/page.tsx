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
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6 pt-4 text-purple-700">
        Update Practice Log
      </h1>
      {log ? (
        <form
          onSubmit={handleUpdate}
          className="rounded bg-purple-400 p-8 max-w-lg mx-auto"
        >
          <div className="mb-6">
            <label
              htmlFor="duration"
              className="block text-lg font-medium text-white"
            >
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-2 p-3 w-full border rounded-md text-gray-700 text-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="notes"
              className="block text-lg font-medium text-white"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 p-3 w-full border rounded-md text-gray-700 text-lg"
              rows={4}
              required
            />
          </div>
          <div className="text-center mt-8">
            <Button
              className="bg-purple-700 text-white py-3 px-6 rounded hover:bg-purple-900 text-lg"
              type="submit"
            >
              Update Practice Log
            </Button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
