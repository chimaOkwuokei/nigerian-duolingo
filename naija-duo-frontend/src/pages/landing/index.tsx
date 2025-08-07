import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import lingunaija from "@/assets/lingunaija-illustration.png"; // Adjust the path as necessary
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f4ef] to-[#fdf9f3] text-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex items-center justify-between mb-16">
          <h1 className="text-3xl font-bold text-[#1f1f1f] tracking-tight">
            LinguNaija
          </h1>
          <div>
            <Link to="/login">
              <Button variant="ghost" className="text-[#1f1f1f]">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="ml-2 bg-[#ffb703] hover:bg-[#fca311] text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-60">
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Learn Nigerian Languages <span className="text-[#ffb703]">your way</span>
            </h2>
            <p className="text-lg mb-6">
              Discover Yoruba, Igbo, Hausa, and more through fun, interactive lessons.
              Learn with voice, games, quizzes, and real-life context. Naija to the world!
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-[#ffb703] font-bold">✓</span>
                Interactive voice lessons
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-[#ffb703] font-bold">✓</span>
                Fun quizzes & games
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-[#ffb703] font-bold">✓</span>
                Progress tracking
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-[#ffb703] font-bold">✓</span>
                Community support
              </li>
            </ul>
            <Link to="/signup">
              <Button className="bg-[#023047] hover:bg-[#012a3a] text-white text-md px-6 py-7 rounded-2xl">
                Start Learning Now
              </Button>
            </Link>
          </div>
          <div className="lg:w-1/2">
            <img
              src={lingunaija}
              alt="Vibrant illustration of diverse Nigerian people learning languages together, with cultural symbols and a friendly classroom vibe"
              className="w-full max-w-md mx-auto rounded-xl shadow-lg"
            />
            <div className="mt-6 bg-white rounded-xl shadow p-4">
              <p className="italic text-[#023047]">
                “LinguNaija helped me connect with my roots and learn Yoruba in a fun way!”<br />
                <span className="font-bold text-[#ffb703]">— Ada, Lagos</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}