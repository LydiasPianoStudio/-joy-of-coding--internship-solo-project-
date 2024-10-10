"use client"; // Necessary to use state and event handlers

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPracticeLog() {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a new practice log object
    const newLog = {
      date: new Date(date),
      duration: parseInt(duration),
      notes,
    };

    try {
      const res = await fetch("/api/practice-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLog),
      });

      if (res.ok) {
        // If the request is successful, redirect to the practice logs page
        router.push("/practice-log");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to add practice log");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Practice Log</h1>
      {error && <p className="text-red-500">{error}</p>}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Practice Log
        </button>
      </form>
    </div>
  );
}
