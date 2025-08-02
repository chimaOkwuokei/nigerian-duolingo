import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f5f0]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#1f1f1f]">
          Welcome back to LinguNaija
        </h2>
        <form className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@domain.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full bg-[#ffb703] hover:bg-[#fca311] text-white">
            Log In
          </Button>
        </form>
        <p className="mt-6 text-center text-sm">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#ffb703] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
