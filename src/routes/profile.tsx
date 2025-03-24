import { signOut } from 'firebase/auth';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import { auth } from '@/firebase';
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui';

export const Route = createFileRoute('/profile')({
  beforeLoad: async ({ context }) => {
    const { user } = context.auth;
    if (!user) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Error while logout", error);
    }
  };

  return (
    <div>
      <p>Hello {loading ? "Loading" : user?.email}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
