import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const App = () => {
  const [flavors, setFlavors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

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
      setSelectedFlavor(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  function goBack() {
    setSelectedFlavor(null);
    console.log("set to null");
  }
  if (isLoading) {
    return <section className="loading">Loading</section>;
  }
  if (selectedFlavor) {
    return (
      <main>
        <h1>
          <b>Selected Flavor:</b>
        </h1>
        <h2>{selectedFlavor.name}</h2>
        {selectedFlavor.is_favorite ? (
          <span style={{ paddingLeft: "1rem", color: "red" }}>(FAVORITE)</span>
        ) : (
          <h4>NOT the Favorite.</h4>
        )}
        <h3>Added: {selectedFlavor.created_at}</h3>
        <h3>Updated: {selectedFlavor.updated_at}</h3>
        <div>
          <button
            onClick={() => {
              goBack();
            }}
          >
            back
          </button>
        </div>
      </main>
    );
  }
  if (isAdding) {
    return (
      <main>
        <h1>
          <b>Add New Flavor:</b>
          <button className="details" onClick={() => setIsAdding(false)}>
            back
          </button>
        </h1>
      </main>
    );
  }
  return (
    <main>
      <h1>
        <b>Acme Ice Cream Shop:</b>
      </h1>
      <h3>Total flavors: ({flavors.length})</h3>
      <ul>
        {flavors.map((flavor) => (
          <li key={flavor.id}>
            {flavor.name}
            {flavor.is_favorite ? (
              <span style={{ paddingLeft: "5px", color: "red" }}>
                (FAVORITE)
              </span>
            ) : null}
            <button className="details" onClick={() => getDetails(flavor.id)}>
              Details
            </button>
          </li>
        ))}
      </ul>
      <button className="details" onClick={() => setIsAdding(true)}>
        Add Flavor
      </button>
    </main>
  );
};

const root = createRoot(document.querySelector("#root"));

root.render(<App />);
