# LydiasPianoStudio Practice Log Application

![Practice Log Page](public/PracticeLogPage.png)

## Overview

The LydiasPianoStudio Practice Log Application is designed to help students of LydiasPianoStudio keep track of their piano practice sessions. This application allows users to log their practice times, track their progress, and achieve their musical goals with ease.

## Dependencies

### Frontend

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Radix UI**: A set of low-level, accessible UI components for building high-quality design systems and web applications.
- **Axios**: A promise-based HTTP client for making API requests.

### Backend

- **Prisma**: An open-source ORM for Node.js and TypeScript that helps developers build faster and make fewer errors.
- **MySQL**: A relational database management system used to store practice log data.

### Authentication

- **NextAuth.js**: A complete open-source authentication solution for Next.js applications (to be implemented in the future).

## Project Structure

```plaintext
my-nextjs-project/
├── app/
│   ├── page.tsx
│   ├── practice-log/
│   │   ├── add.tsx
│   │   ├── update.tsx
│   │   └── page.tsx
│   └── components/
│       └── NavBar.tsx
├── public/
│   └── lydias-piano-studio-logo.png
├── styles/
│   └── globals.css
├── prisma/
│   └── schema.prisma
├── .env
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── [README.md]
```

## Key Features

### Practice Log Management

- **Add Practice Log**: Users can add new practice logs with details such as date, duration, and notes.
- **Update Practice Log**: Users can update existing practice logs.
- **Delete Practice Log**: Users can delete practice logs.
- **View Practice Logs**: Users can view a list of all practice logs, sorted and filtered by date and duration.

### User Interface

- **Responsive Design**: The application is designed to be responsive and user-friendly across various devices.
- **Tailwind CSS**: Utilized for rapid and efficient styling.
- **Radix UI**: Used for accessible and high-quality UI components.

### API Integration

- **Prisma ORM**: Used for database interactions, ensuring type safety and ease of use.
- **RESTful API**: Implemented using Next.js API routes for CRUD operations on practice logs.

### Future Enhancements

- **Authentication**: Authentication will be implemented using NextAuth.js to provide secure user login and registration functionalities.

## Code Snippets

![Practice Log](public/PracticeLog.png)

### Adding a Practice Log

```javascript
//
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newLog = { date, duration, notes };
    try {
      const res = await fetch("/api/practice-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLog),
      });
      if (res.ok) {
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
      <form onSubmit={handleSubmit} className="rounded bg-purple-400 p-4">
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-white"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-white"
          >
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-white"
          >
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-gray-700"
            rows={4}
          />
        </div>
        <Button
          className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900"
          type="submit"
        >
          Add Practice Log
        </Button>
      </form>
    </div>
  );
}
```

### Updating a Practice Log

![Practice Log Edit](public/PracticeLogEdit.png)

```javascript
//
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@radix-ui/themes";

export default function UpdatePracticeLogPage() {
  const router = useRouter();
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = (useState < string) | (null > null);
  const [successMessage, setSuccessMessage] =
    (useState < string) | (null > null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await fetch(`/api/practice-log/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch practice log");
        }
        const data = await response.json();
        setLog(data);
        setDuration(data.duration);
        setNotes(data.notes || "");
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedLog = { duration, notes };
    const res = await fetch(`/api/practice-log/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLog),
    });

    if (res.ok) {
      setSuccessMessage("Successfully edited");
      setTimeout(() => {
        setSuccessMessage(null);
        router.push("/practice-log");
      }, 3000);
    } else {
      console.error("Failed to update log");
      setError("Failed to update log");
    }
  };

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
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          {successMessage}
        </div>
      )}
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
```

### Form Submission

![Practice Log Add](public/PracticeLogAdd.png)

```javascript
// form submission code snippet
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
```

### Adding a Practice Log

```javascript
//
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newLog = { date, duration, notes };
    try {
      const res = await fetch("/api/practice-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLog),
      });
      if (res.ok) {
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
      <form onSubmit={handleSubmit} className="rounded bg-purple-400 p-4">
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-white"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-white"
          >
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-white"
          >
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-gray-700"
            rows={4}
          />
        </div>
        <Button
          className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900"
          type="submit"
        >
          Add Practice Log
        </Button>
      </form>
    </div>
  );
}
```

### Updating a Practice Log

```javascript
//
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@radix-ui/themes";

export default function UpdatePracticeLogPage() {
  const router = useRouter();
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = (useState < string) | (null > null);
  const [successMessage, setSuccessMessage] =
    (useState < string) | (null > null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await fetch(`/api/practice-log/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch practice log");
        }
        const data = await response.json();
        setLog(data);
        setDuration(data.duration);
        setNotes(data.notes || "");
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedLog = { duration, notes };
    const res = await fetch(`/api/practice-log/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLog),
    });

    if (res.ok) {
      setSuccessMessage("Successfully edited");
      setTimeout(() => {
        setSuccessMessage(null);
        router.push("/practice-log");
      }, 3000);
    } else {
      console.error("Failed to update log");
      setError("Failed to update log");
    }
  };

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
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          {successMessage}
        </div>
      )}
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
```

### Form Submission

```javascript
// form submission code snippet
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
```

## Conclusion

The LydiasPianoStudio Practice Log Application is a comprehensive tool for managing piano practice sessions. It leverages modern web technologies and frameworks to provide a seamless user experience. Future enhancements include implementing authentication with NextAuth.js to secure user data and provide personalized experiences.

## Contact
Lydia Bandy, Software Engineer/Pianist/Harpist/MusicTeacher
[Website](https://www.LydiasPianoStudio.com)
[LinkedIn Profile](https://www.linkedin.com/in/lydia-bandy-2b160745/)
