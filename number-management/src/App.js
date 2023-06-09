import "./App.css";
import React, { useState } from "react";

function App() {
  const [results, setResults] = useState([]);

  const handleButtonClick = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urls = urlParams.getAll("url");

    const fetchNumbers = async () => {
      const fetchData = async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            return { error: "Failed to fetch data" };
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
          return { error: "Failed to fetch data" };
        }
      };

      const results = await Promise.all(urls.map(fetchData));
      setResults(results);
    };

    fetchNumbers();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Fetch Numbers</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{JSON.stringify(result)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
