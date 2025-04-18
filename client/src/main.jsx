import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const App = () => {
  const [flavors, setFlavors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [flavorName, setFlavorName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get("/api/flavors");
      setFlavors(response.data);
      setIsLoading(false);
    };
    fetchEmployees();
  }, [isAdding, isUpdating, selectedFlavor]);

  async function getDetails(id) {
    try {
      const response = await axios.get(`/api/flavors/${id}`);
      setSelectedFlavor(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteFlavor(id) {
    try {
      const response = await axios.delete(`/api/flavors/${id}`);
      setSelectedFlavor(null);
    } catch (error) {
      console.error(error);
    }
  }
  async function addFlavor(event) {
    event.preventDefault();
    try {
      console.log("new flavor: ", flavorName, isFavorite);
      const response = await axios.post("/api/flavors", {
        name: flavorName,
        is_favorite: isFavorite,
      });
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      setIsAdding(false);
    }
  }
  async function updateFlavor(event) {
    event.preventDefault();
    try {
      const id = selectedFlavor.id;
      const response = await axios.put(`/api/flavors/${id}`, {
        is_favorite: isFavorite,
      });
      setIsUpdating(false);
      getDetails(id);
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
    }
  }
  function goBack() {
    setSelectedFlavor(null);
  }
  if (isLoading) {
    return <section className="loading">Loading</section>;
  }
  if (isUpdating) {
    return (
      <main>
        <button className="details right" onClick={() => setIsUpdating(false)}>
          back
        </button>
        <h1>
          <b>Update Flavor:</b>
        </h1>
        <form onSubmit={updateFlavor}>
          <div className="formDiv">{selectedFlavor.name}</div>
          <div className="formDiv">
            <input
              type="checkbox"
              name="flavorFavorite"
              value={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />
            <label>favorite?</label>
          </div>
          <button className="details" type="submit">
            Submit
          </button>
        </form>
      </main>
    );
  } else if (selectedFlavor) {
    return (
      <main>
        <h1>
          <b>Selected Flavor:</b>
        </h1>
        <h2>
          {selectedFlavor.name}
          <button
            className="details"
            onClick={() => deleteFlavor(selectedFlavor.id)}
          >
            delete
          </button>
        </h2>
        {selectedFlavor.is_favorite ? (
          <span style={{ paddingLeft: "1rem", color: "red" }}>(FAVORITE)</span>
        ) : (
          <h4>NOT the Favorite.</h4>
        )}
        <h3>Added: {selectedFlavor.created_at}</h3>
        <h3>
          Updated: {selectedFlavor.updated_at}
          <button className="details" onClick={() => setIsUpdating(true)}>
            update
          </button>
        </h3>
        <div>
          <button
            className="details"
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
        <button className="details right" onClick={() => setIsAdding(false)}>
          back
        </button>
        <h1>
          <b>Add New Flavor:</b>
        </h1>
        <form onSubmit={addFlavor}>
          <div className="formDiv">
            <input
              type="text"
              name="flavorName"
              value={flavorName}
              onChange={(e) => setFlavorName(e.target.value)}
              className="textInput"
              placeholder="Flavor"
            />
          </div>
          <div className="formDiv">
            <input
              type="checkbox"
              name="flavorFavorite"
              value={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />
            <label>favorite?</label>
          </div>
          <button className="details" type="submit">
            Submit
          </button>
        </form>
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
