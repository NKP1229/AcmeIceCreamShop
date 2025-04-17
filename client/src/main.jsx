import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get("/");
    };
    fetchEmployees();
  }, []);

  if (isLoading) {
    return <section className="loading">Loading</section>;
  }

  return (
    <main>
      <h1>Acme HR ({employees.length})</h1>
    </main>
  );
};

const root = createRoot(document.querySelector("#root"));

root.render(<App />);
