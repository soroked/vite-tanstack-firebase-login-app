import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";

import { auth } from "@/firebase";
import { Input, Button, Card} from "@/components/ui";

export const Route = createFileRoute('/signup')({
  beforeLoad: ({ context }) => {
    const { user } = context.auth;
    if (user) {
      throw redirect({ to: "/profile" });
    }
  },
  component: SignUp,
})

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
          <Card.Title className="text-center text-xl">Sign Up</Card.Title>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
