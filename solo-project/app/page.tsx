import NavBar from "./components/NavBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to the Practice Log App by LydiasPianoStudio
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          This app is designed to help students of LydiasPianoStudio keep track
          of their piano practice sessions. Log your practice times, track your
          progress, and achieve your musical goals with ease.
        </p>
        <NavBar />
      </div>
    </div>
  );
}
