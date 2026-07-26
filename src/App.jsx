import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { getTopMealRecommendations } from "./utils/recommendationEngine";
import meals from "./data/meals";
import "./App.css";
import RestaurantBrowser from "./components/RestaurantBrowser";

const macroGoals = {
  calories: 1959,
  carbs: 205,
  fat: 60,
  protein: 150,
};

const emptyMacros = {
  calories: "",
  carbs: "",
  fat: "",
  protein: "",
};

function getMealId(meal) {
  return `${meal.restaurant}-${meal.name}`;
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [todayMacros, setTodayMacros] = useState(() => {
    try {
      const savedMacros = localStorage.getItem("todayMacros");
      return savedMacros ? JSON.parse(savedMacros) : emptyMacros;
    } catch {
      return emptyMacros;
    }
  });

  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favoriteMeals");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  const numericMacros = {
    calories: Number(todayMacros.calories) || 0,
    carbs: Number(todayMacros.carbs) || 0,
    fat: Number(todayMacros.fat) || 0,
    protein: Number(todayMacros.protein) || 0,
  };

  const remainingMacros = {
    calories: Math.max(
      0,
      macroGoals.calories - numericMacros.calories
    ),
    carbs: Math.max(0, macroGoals.carbs - numericMacros.carbs),
    fat: Math.max(0, macroGoals.fat - numericMacros.fat),
    protein: Math.max(
      0,
      macroGoals.protein - numericMacros.protein
    ),
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

  const favoriteMeals = allMeals.filter((meal) =>
    favoriteIds.includes(getMealId(meal))
  );

  useEffect(() => {
    localStorage.setItem(
      "todayMacros",
      JSON.stringify(todayMacros)
    );
  }, [todayMacros]);

  useEffect(() => {
    localStorage.setItem(
      "favoriteMeals",
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds]);

  function updateMacro(event) {
    const { name, value } = event.target;

    const numbersOnly = value.replace(/\D/g, "");
    const withoutLeadingZeros = numbersOnly.replace(
      /^0+(?=\d)/,
      ""
    );
    const limitedValue = withoutLeadingZeros.slice(0, 4);

    setTodayMacros((currentMacros) => ({
      ...currentMacros,
      [name]: limitedValue,
    }));
  }

  function toggleFavorite(meal) {
    const mealId = getMealId(meal);

    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(mealId)) {
        return currentFavorites.filter((id) => id !== mealId);
      }

      return [...currentFavorites, mealId];
    });
  }

  function isFavorite(meal) {
    return favoriteIds.includes(getMealId(meal));
  }

  return (
    <div className="app">
      <Header />

      <nav
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          margin: "20px 0",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("dashboard")}
          style={{
            padding: "12px 8px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            fontWeight: "700",
            cursor: "pointer",
            backgroundColor:
              activeTab === "dashboard" ? "#2563eb" : "#ffffff",
            color:
              activeTab === "dashboard" ? "#ffffff" : "#1e293b",
          }}
        >
          🏠 Dashboard
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("restaurants")}
          style={{
            padding: "12px 8px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            fontWeight: "700",
            cursor: "pointer",
            backgroundColor:
              activeTab === "restaurants"
                ? "#2563eb"
                : "#ffffff",
            color:
              activeTab === "restaurants"
                ? "#ffffff"
                : "#1e293b",
          }}
        >
          🍽 Restaurants
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("favorites")}
          style={{
            padding: "12px 8px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            fontWeight: "700",
            cursor: "pointer",
            backgroundColor:
              activeTab === "favorites" ? "#2563eb" : "#ffffff",
            color:
              activeTab === "favorites" ? "#ffffff" : "#1e293b",
          }}
        >
          ⭐ Favorites
        </button>
      </nav>

      {activeTab === "dashboard" && (
        <Dashboard
          recommendations={dashboardRecommendations}
          remainingMacros={remainingMacros}
          todayMacros={todayMacros}
          updateMacro={updateMacro}
          macroGoals={macroGoals}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}

     {activeTab === "restaurants" && (
  <RestaurantBrowser
    meals={meals}
    selectedRestaurant={selectedRestaurant}
    setSelectedRestaurant={setSelectedRestaurant}
    toggleFavorite={toggleFavorite}
    isFavorite={isFavorite}
  />
)}




      {activeTab === "favorites" && (
        <main className="dashboard">
          <section className="dashboard-section">
            <h2>⭐ Favorite Meals</h2>

            {favoriteMeals.length === 0 ? (
              <div
                style={{
                  padding: "24px",
                  marginTop: "18px",
                  border: "1px dashed #94a3b8",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <strong>No favorites saved yet.</strong>

                <p style={{ marginBottom: 0 }}>
                  Tap the star beside a recommendation to save it.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "12px",
                  marginTop: "18px",
                }}
              >
                {favoriteMeals.map((meal) => (
                  <article
                    key={getMealId(meal)}
                    style={{
                      border: "1px solid #dbe2ea",
                      borderRadius: "12px",
                      padding: "16px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <strong>{meal.restaurant}</strong>
                        <h3 style={{ margin: "6px 0" }}>
                          {meal.name}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(meal)}
                        aria-label={`Remove ${meal.name} from favorites`}
                        style={{
                          border: "none",
                          background: "transparent",
                          fontSize: "24px",
                          cursor: "pointer",
                        }}
                      >
                        ⭐
                      </button>
                    </div>

                    <p style={{ marginBottom: 0 }}>
                      {meal.calories} cal | {meal.carbs}g carbs |{" "}
                      {meal.fat}g fat | {meal.protein}g protein
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
}

export default App;