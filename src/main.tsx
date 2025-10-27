import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./context/theme-provider";
import { router } from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>

      <ThemeProvider>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
        <Toaster richColors />
      </ThemeProvider>

  </QueryClientProvider>
);
