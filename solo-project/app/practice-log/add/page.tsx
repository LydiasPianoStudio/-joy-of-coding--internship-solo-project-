"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

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
      <h1 className="text-4xl font-bold text-center mb-6 pt-4 text-purple-700">
        Add Practice Log
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="rounded bg-purple-400 p-8 max-w-lg mx-auto"
      >
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-lg font-medium text-white"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 p-3 w-full border rounded-md text-gray-700 text-lg"
            required
          />
        </div>

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
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-2 p-3 w-full border rounded-md text-gray-700 text-lg"
            rows={4}
          />
        </div>
        <div className="text-center mt-8">
          <Button
            className=" bg-purple-700 text-white py-3 px-6 rounded hover:bg-purple-900 text-lg"
            type="submit"
          >
            Add Practice Log
          </Button>
        </div>
      </form>
    </div>
  );
}
