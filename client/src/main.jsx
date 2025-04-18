import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const App = () => {
  const [flavors, setFlavors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlavor, setSelectedFlavor] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get("/api/flavors");
      setFlavors(response.data);
      setIsLoading(false);
    };
    fetchEmployees();
  }, []);

  async function getDetails(id) {
    try {
      const response = await axios.get(`/api/flavors/${id}`);
      console.log(response.data[0]);
      setSelectedFlavor(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  if (isLoading) {
    return <section className="loading">Loading</section>;
  }

  return (
    <main>
      <h1>Acme Ice Cream Shop:</h1>
      <h3>Total flavors: ({flavors.length})</h3>
      <ul>
        {flavors.map((flavor) => (
          <li key={flavor.id}>
            {flavor.name}
            {flavor.is_favorite ? (
              <span style={{ paddingLeft: "1rem", color: "red" }}>
                (FAVORITE)
              </span>
            ) : null}
            <button className="details" onClick={() => getDetails(flavor.id)}>
              Details
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

const root = createRoot(document.querySelector("#root"));

root.render(<App />);
