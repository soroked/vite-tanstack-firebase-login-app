import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { useAuth } from "@/context/AuthContext";

const router = createRouter({
    routeTree,
    context: {
      auth: undefined!,
    },
  });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />
}

export default App
