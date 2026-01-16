import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [soundData, setSoundData] = useState([]);

  const getSoundData = async () => {
    const response = await fetch(
      `https://freesound.org/apiv2/search/text/?query=piano&page=2&token=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await response.json();

    setSoundData(data.results);
  };

  useEffect(() => {
    getSoundData();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Freesound API</h1>
        <h2>Search Results for "Piano"</h2>

        <div className="container">
          {soundData.map((info) => {
            const soundID = info.id;
            const soundName = info.name;
            const soundUserName = info.username;

            return (
              <div className="sound-card" key={soundID}>
                <h3 className="zero-margin">ID: {soundID}</h3>
                <div className="zero-margin">
                  <p>Name: {soundName}</p>
                  <p>Username: {soundUserName}</p>
                  <p>Tags: {info.tags.join(", ")}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
