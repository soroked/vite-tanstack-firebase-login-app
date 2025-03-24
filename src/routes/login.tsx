import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, createFileRoute, redirect, Link } from "@tanstack/react-router";

import { auth } from "@/firebase";
import { Button, Input, Card } from "@/components/ui";

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    const { user } = context.auth;
    if (user) {
      throw redirect({ to: "/profile" });
    }
  },
  component: Login,
})

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate({ to: "/profile" });
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <Card.Header>
          <Card.Title className="text-center text-xl">Login</Card.Title>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">Some error occurred...</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
