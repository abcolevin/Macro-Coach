import Dashboard from "./components/Dashboard";
import { getTopMealRecommendations } from "./utils/recommendationEngine";
import meals from "./data/meals";
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
const remainingMacros = {
  calories: Math.max(0, macroGoals.calories - numericMacros.calories),
  carbs: Math.max(0, macroGoals.carbs - numericMacros.carbs),
  fat: Math.max(0, macroGoals.fat - numericMacros.fat),
  protein: Math.max(0, macroGoals.protein - numericMacros.protein),
};

const allMeals = Object.entries(meals).flatMap(
  ([restaurantName, restaurantMeals]) =>
    restaurantMeals.map((meal) => ({
      ...meal,
      restaurant: restaurantName,
    }))
);

const dashboardRecommendations = getTopMealRecommendations(
  allMeals,
  remainingMacros,
  3
);
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
  const remainingProtein = 150 - Number(todayMacros.protein);
  const remainingCarbs = 180 - Number(todayMacros.carbs);
  const remainingFat = 60 - Number(todayMacros.fat);

  const restaurantMeals = meals[restaurant] || [];

 const remainingMacros = {
  calories: remainingCalories,
  protein: remainingProtein,
  carbs: remainingCarbs,
  fat: remainingFat,
};

const recommendations = getTopMealRecommendations(
  restaurantMeals,
  remainingMacros,
  3
);

setMessage(recommendations);
}

  return (
    <div className="app">
      <Header />
      <Dashboard />

<MacroInputs
  todayMacros={todayMacros}
  updateMacro={updateMacro}
  macroGoals={macroGoals}
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