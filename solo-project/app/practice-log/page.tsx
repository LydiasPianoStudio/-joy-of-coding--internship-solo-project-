// app/practice-log/page.tsx
"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    // Fetch logs from API
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

  if (loading) {
    return <p>Loading practice logs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Practice Logs</h1>
      {logs.length === 0 ? (
        <p className="text-gray-500">No logs found.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log.id} className="p-4 bg-white shadow rounded-lg">
              <strong>Date:</strong> {new Date(log.date).toLocaleDateString()} |{" "}
              <strong>Duration:</strong> {log.duration} minutes |{" "}
              <strong>Notes:</strong> {log.notes ?? "None"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
