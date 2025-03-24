import { onAuthStateChanged, User } from 'firebase/auth';
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import { auth } from '@/firebase';
import { AuthContext, useAuth } from '@/context/AuthContext'

const activeProps = { className: "text-blue-500 font-semibold" };

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const user = await new Promise<User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        resolve(currentUser);
        unsubscribe();
      });
    });

    return { auth: { user } };
  },
  component: RootComponent,
})

function RootComponent() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">Login App</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" activeProps={activeProps}>{({isActive}) => `Home ${isActive ? "/" : ""}` }</Link>
              </li>
              <li>
                <Link to="/login" activeProps={activeProps}>Login</Link>
              </li>
              <li>
                <Link to="/signup" activeProps={activeProps}>Signup</Link>
              </li>
              <li>
                <Link to="/profile" activeProps={activeProps}>
                  Profile {loading ? "Loading..." : user?.email}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
