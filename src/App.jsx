import CoachCard from "./components/CoachCard";
import { useEffect, useState } from "react";
import "./App.css";
import MacroInputs from "./components/MacroInputs";
import RestaurantPicker from "./components/RestaurantPicker";
import Header from "./components/Header";
import MacroCard from "./components/MacroCard";
const macroGoals = {
  calories: 1860,
  protein: 150,
  carbs: 180,
  fat: 60,
};

const emptyMacros = {
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
};

function App() {
  const [todayMacros, setTodayMacros] = useState(() => {
    try {
      const savedMacros = localStorage.getItem("todayMacros");

      return savedMacros ? JSON.parse(savedMacros) : emptyMacros;
    } catch {
      return emptyMacros;
    }
  });

  const [restaurant, setRestaurant] = useState("Home");
  const [message, setMessage] = useState("");

  const numericMacros = {
    calories: Number(todayMacros.calories) || 0,
    protein: Number(todayMacros.protein) || 0,
    carbs: Number(todayMacros.carbs) || 0,
    fat: Number(todayMacros.fat) || 0,
  };

  useEffect(() => {
    localStorage.setItem("todayMacros", JSON.stringify(todayMacros));
  }, [todayMacros]);

  function updateMacro(event) {
    const { name, value } = event.target;

    const numbersOnly = value.replace(/\D/g, "");
    const withoutLeadingZeros = numbersOnly.replace(/^0+(?=\d)/, "");
    const limitedValue = withoutLeadingZeros.slice(0, 4);

    setTodayMacros((currentMacros) => ({
      ...currentMacros,
      [name]: limitedValue,
    }));

    setMessage("");
  }

  function coachMe() {
    const remainingCalories =
      macroGoals.calories - numericMacros.calories;

    const remainingProtein =
      macroGoals.protein - numericMacros.protein;

    const remainingCarbs =
      macroGoals.carbs - numericMacros.carbs;

    const remainingFat =
      macroGoals.fat - numericMacros.fat;

    let recommendation = "";

    if (restaurant === "Home") {
      recommendation =
        "Choose lean protein such as chicken, turkey, cottage cheese, or a protein shake. Add fruit, rice, potatoes, or vegetables if you still need carbohydrates.";
    } else if (restaurant === "Taco Amigo") {
      recommendation =
        "Start with 2 soft flour tacos. Add a small fry only when your remaining calories, carbohydrates, and fat allow it.";
    } else if (restaurant === "Costa Vida") {
      recommendation =
        "Choose a chicken protein bowl with extra chicken. Go light on cheese, dressing, tortilla strips, and creamy sauces.";
    } else if (restaurant === "Chick-fil-A") {
      recommendation =
        "Choose the grilled chicken sandwich with fruit. Add grilled nuggets when protein is still your biggest need.";
    } else if (restaurant === "Texas Roadhouse") {
      recommendation =
        "Choose an 8–11 oz sirloin with steamed vegetables or a plain sweet potato. Limit rolls and butter when fat is close to the goal.";
    } else if (restaurant === "R&R BBQ") {
      recommendation =
        "Choose turkey or chicken. Add vegetables or sweet potato fries only when your remaining fat allows it.";
    }

    setMessage(
      `You have ${remainingCalories} calories, ${remainingProtein}g protein, ${remainingCarbs}g carbs, and ${remainingFat}g fat remaining. ${recommendation}`
    );
  }

  return (
    <div className="app">
      <Header />

<MacroInputs
  todayMacros={todayMacros}
  updateMacro={updateMacro}
/>

<RestaurantPicker
  restaurant={restaurant}
  setRestaurant={setRestaurant}
  setMessage={setMessage}
/>

<MacroCard
        calories={numericMacros.calories}
        protein={numericMacros.protein}
        carbs={numericMacros.carbs}
        fat={numericMacros.fat}
        goals={macroGoals}
      />

      <button onClick={coachMe}>🍔 Coach Me</button>

      <CoachCard
  message={message}
  restaurant={restaurant}
/>
    </div>
  );
}

export default App;