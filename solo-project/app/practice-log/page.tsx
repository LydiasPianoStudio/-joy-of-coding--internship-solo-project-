"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

type PracticeLog = {
  id: number;
  date: string; // ISO string format
  duration: number;
  notes: string | null;
};

export default function PracticeLogList() {
  const [logs, setLogs] = useState<PracticeLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string>("date"); // Sorting key
  const [filterDate, setFilterDate] = useState<string>(""); // Filter by date
  const [minDuration, setMinDuration] = useState<number | null>(null); // Filter by min duration
  const router = useRouter();

  // Fetch logs from API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/practice-log");
        if (!response.ok) {
          throw new Error("Failed to fetch practice logs");
        }
        const data = await response.json();
        setLogs(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Delete log function
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/practice-log?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete practice log");
      }
      setLogs(logs.filter((log) => log.id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Redirect to the update page
  const handleEdit = (id: number) => {
    router.push(`/practice-log/update/${id}`);
  };

  // Sort logs based on selected key
  const sortedLogs = logs.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortKey === "duration") {
      return a.duration - b.duration;
    }
    return 0;
  });

  // Filter logs based on selected criteria
  const filteredLogs = sortedLogs.filter((log) => {
    const matchesDate = filterDate ? log.date.startsWith(filterDate) : true;
    const matchesDuration = minDuration ? log.duration >= minDuration : true;
    return matchesDate && matchesDuration;
  });

  if (loading) {
    return <p>Loading practice logs...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6 rounded bg-purple-400 ">
      <h1 className="text-4xl font-bold text-center mb-6 pt-4 text-purple-700">
        Practice Logs
      </h1>

      {/* Sorting Options */}
      <div className="text-center mb-6 pt-4 ">
        <label className="mr-2 text-lg font-medium py-1 px-3 text-white">
          Sort by:
        </label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="border p-2"
        >
          <option value="date">Date</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      {/* Filtering Options */}
      <div className="text-center mb-6 pt-4">
        <label className="mr-2 text-lg font-medium py-1 px-3 text-white">
          Filter by date:
        </label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2"
        />

        <label className="text-center mb-6 pt-4 text-lg font-medium py-1 px-3 text-white">
          Minimum duration (minutes):
        </label>
        <input
          type="number"
          value={minDuration ?? ""}
          onChange={(e) => setMinDuration(Number(e.target.value) || null)}
          className="border p-2"
        />
      </div>

      {/* Logs List */}
      {filteredLogs.length === 0 ? (
        <p className="text-gray-500">No logs found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredLogs.map((log) => (
            <li key={log.id} className="p-4 bg-white shadow rounded-lg">
              <strong className="font-bold text-md">Date:</strong>{" "}
              {new Date(log.date).toLocaleDateString()} |{" "}
              <strong className="font-bold text-md">Duration:</strong>{" "}
              {log.duration} minutes |{" "}
              <strong className="font-bold text-md">Notes:</strong>{" "}
              {log.notes ?? "None"} |{" "}
              <Button
                className="bg-fuchsia-700 text-white py-1 px-3 rounded hover:bg-fuchsia-900 text-lg mr-2"
                onClick={() => handleEdit(log.id)}
              >
                Edit
              </Button>
              <Button
                className="bg-rose-700 text-white py-1 px-3 rounded hover:bg-rose-900 text-lg"
                onClick={() => handleDelete(log.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
