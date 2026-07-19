import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MacroCard from "./components/MacroCard";

function App() {
  const [message, setMessage] = useState("");

  function coachMe() {
    setMessage(
      "You need more protein today. A grilled chicken breast or a protein shake would be a great choice!"
    );
  }

  return (
    <div className="app">
      <Header />

      <MacroCard
        calories={1485}
        protein={96}
        carbs={162}
        fat={42}
      />

      <button onClick={coachMe}>🍔 Coach Me</button>

      {message !== "" && (
        <div className="coach-message">
          <strong>Coach Recommendation</strong>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;