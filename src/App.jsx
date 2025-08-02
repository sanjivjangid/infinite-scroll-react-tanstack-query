import React from "react";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Users from "./pages/Users";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <div className="app-header">
          <h5>Infinite scroll</h5>
          <p>Using IntersectionObserver and TanStack react-query</p>
        </div>
        <div className="app-content">
          <Users />
        </div>
        <footer className="app-footer"></footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
