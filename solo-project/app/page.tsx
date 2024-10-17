// app/page.tsx
"use client";
import { useRouter } from "next/navigation";
import NavBar from "./components/NavBar";
import { Button } from "@radix-ui/themes";

export default function LandingPage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/practice-log/add");
  };

  return (
    <div className="min-h-screen bg-red-300 flex flex-col items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className=" text-4xl font-bold text-center mb-6 bg-purple-400 text-white hover:bg-purple-700">
          <a
            href="https://www.LydiasPianoStudio.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Welcome to LydiasPianoStudio
          </a>
        </h1>
        <div className="flex justify-center mb-6">
          <img
            src="./lydias-piano-studio-logo.png"
            alt="LydiasPianoStudio Logo"
            className="h-24"
          />
        </div>
        <p className="text-lg text-center mb-8 text-purple-700">
          Keep track of your music practice sessions! Log your practice times,
          track your progress, and achieve your musical goals with ease.
        </p>
        {/* <NavBar /> */}
        <div className="text-center mt-8">
          <Button
            className=" bg-purple-700 text-white py-3 px-6 rounded hover:bg-purple-900 text-lg"
            onClick={handleNavigate}
          >
            Add Practice Log
          </Button>
        </div>
      </div>
    </div>
  );
}
