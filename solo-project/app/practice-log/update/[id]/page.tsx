import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UpdatePracticeLogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [log, setLog] = useState(null);
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  // Get the practice log by ID
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchLog = async () => {
      const response = await fetch(`/api/practice-log/${id}`);
      const data = await response.json();
      setLog(data);
      setDuration(data.duration);
      setNotes(data.notes);
    };

    if (id) {
      fetchLog();
    }
  }, [id]);

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
      router.push("/practice-log");
    } else {
      console.error("Failed to update log");
    }
  };

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
            />
          </label>
          <label className="block mt-2">
            <span className="text-gray-700">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full"
            />
          </label>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Update Log
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
