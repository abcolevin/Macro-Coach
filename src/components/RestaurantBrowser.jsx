import { useMemo, useState } from "react";

function RestaurantBrowser({
  meals,
  selectedRestaurant,
  setSelectedRestaurant,
  toggleFavorite,
  isFavorite,
}) {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("recommended");

  const restaurantNames = Object.keys(meals)
    .filter((restaurantName) => restaurantName !== "Home")
    .sort((a, b) => a.localeCompare(b));

  const selectedMeals = selectedRestaurant
    ? meals[selectedRestaurant] || []
    : [];

  const displayedMeals = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    let filteredMeals = selectedMeals.filter((meal) =>
      meal.name.toLowerCase().includes(search)
    );

    if (sortOption === "protein") {
      filteredMeals = [...filteredMeals].sort(
        (a, b) => b.protein - a.protein
      );
    }

    if (sortOption === "calories") {
      filteredMeals = [...filteredMeals].sort(
        (a, b) => a.calories - b.calories
      );
    }

    if (sortOption === "fat") {
      filteredMeals = [...filteredMeals].sort(
        (a, b) => a.fat - b.fat
      );
    }

    if (sortOption === "favorites") {
      filteredMeals = [...filteredMeals].sort((a, b) => {
        const mealA = {
          ...a,
          restaurant: selectedRestaurant,
        };

        const mealB = {
          ...b,
          restaurant: selectedRestaurant,
        };

        return Number(isFavorite(mealB)) - Number(isFavorite(mealA));
      });
    }

    return filteredMeals;
  }, [
    selectedMeals,
    searchText,
    sortOption,
    selectedRestaurant,
    isFavorite,
  ]);

  function openRestaurant(restaurantName) {
    setSearchText("");
    setSortOption("recommended");
    setSelectedRestaurant(restaurantName);
  }

  function returnToRestaurants() {
    setSearchText("");
    setSortOption("recommended");
    setSelectedRestaurant("");
  }

  if (!selectedRestaurant) {
    return (
      <main className="dashboard">
        <section className="dashboard-section">
          <div style={{ marginBottom: "20px" }}>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#2563eb",
              }}
            >
              Browse Meals
            </p>

            <h2 style={{ margin: 0 }}>🍽 Restaurants</h2>

            <p
              style={{
                marginTop: "8px",
                marginBottom: 0,
                color: "#64748b",
              }}
            >
              Select a restaurant to view meals and nutrition information.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {restaurantNames.map((restaurantName) => {
              const mealCount = meals[restaurantName]?.length || 0;

              return (
                <button
                  type="button"
                  key={restaurantName}
                  onClick={() => openRestaurant(restaurantName)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: "1px solid #dbe2ea",
                    borderRadius: "14px",
                    backgroundColor: "#ffffff",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <strong
                        style={{
                          display: "block",
                          fontSize: "17px",
                          color: "#172033",
                        }}
                      >
                        🍴 {restaurantName}
                      </strong>

                      <span
                        style={{
                          display: "block",
                          marginTop: "5px",
                          fontSize: "14px",
                          color: "#64748b",
                        }}
                      >
                        {mealCount} {mealCount === 1 ? "meal" : "meals"}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: "22px",
                        color: "#2563eb",
                      }}
                    >
                      ›
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <section className="dashboard-section">
        <button
          type="button"
          onClick={returnToRestaurants}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "10px 14px",
            marginBottom: "18px",
            border: "1px solid #2563eb",
            borderRadius: "10px",
            backgroundColor: "#eff6ff",
            color: "#1d4ed8",
            fontSize: "15px",
            fontWeight: "800",
            cursor: "pointer",
          }}
        >
          ← Back to Restaurants
        </button>

        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              margin: "0 0 6px",
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#2563eb",
            }}
          >
            Restaurant Menu
          </p>

          <h2 style={{ margin: 0 }}>🍴 {selectedRestaurant}</h2>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#64748b",
            }}
          >
            {selectedMeals.length} meals available
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          <label
            style={{
              display: "grid",
              gap: "7px",
              fontWeight: "700",
              color: "#334155",
            }}
          >
            Search meals
            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search grilled, chicken, sandwich..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                color: "#172033",
                fontSize: "16px",
              }}
            />
          </label>

          <label
            style={{
              display: "grid",
              gap: "7px",
              fontWeight: "700",
              color: "#334155",
            }}
          >
            Sort meals
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                color: "#172033",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              <option value="recommended">Default order</option>
              <option value="protein">Highest protein</option>
              <option value="calories">Lowest calories</option>
              <option value="fat">Lowest fat</option>
              <option value="favorites">Favorites first</option>
            </select>
          </label>
        </div>

        {displayedMeals.length === 0 ? (
          <div
            style={{
              padding: "24px",
              border: "1px dashed #94a3b8",
              borderRadius: "12px",
              textAlign: "center",
              color: "#475569",
            }}
          >
            <strong>No matching meals found.</strong>

            <p style={{ marginBottom: 0 }}>
              Try a different search word.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "13px",
            }}
          >
            {displayedMeals.map((meal) => {
              const mealWithRestaurant = {
                ...meal,
                restaurant: selectedRestaurant,
              };

              const favorite = isFavorite(mealWithRestaurant);

              return (
                <article
                  key={`${selectedRestaurant}-${meal.name}`}
                  style={{
                    border: "1px solid #dbe2ea",
                    borderRadius: "14px",
                    padding: "16px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color: "#172033",
                        fontSize: "18px",
                        lineHeight: 1.3,
                      }}
                    >
                      {meal.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(mealWithRestaurant)}
                      aria-label={
                        favorite
                          ? `Remove ${meal.name} from favorites`
                          : `Add ${meal.name} to favorites`
                      }
                      title={
                        favorite
                          ? "Remove from Favorites"
                          : "Add to Favorites"
                      }
                      style={{
                        flexShrink: 0,
                        width: "42px",
                        height: "42px",
                        border: "1px solid #dbe2ea",
                        borderRadius: "50%",
                        backgroundColor: favorite
                          ? "#fff7d6"
                          : "#ffffff",
                        fontSize: "25px",
                        cursor: "pointer",
                        lineHeight: 1,
                      }}
                    >
                      {favorite ? "⭐" : "☆"}
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "14px",
                    }}
                  >
                    <span
                      style={{
                        padding: "7px 10px",
                        borderRadius: "999px",
                        backgroundColor: "#f1f5f9",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#334155",
                      }}
                    >
                      🔥 {meal.calories} cal
                    </span>

                    <span
                      style={{
                        padding: "7px 10px",
                        borderRadius: "999px",
                        backgroundColor: "#eff6ff",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#1d4ed8",
                      }}
                    >
                      🍞 {meal.carbs}g carbs
                    </span>

                    <span
                      style={{
                        padding: "7px 10px",
                        borderRadius: "999px",
                        backgroundColor: "#fff7ed",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#c2410c",
                      }}
                    >
                      🥑 {meal.fat}g fat
                    </span>

                    <span
                      style={{
                        padding: "7px 10px",
                        borderRadius: "999px",
                        backgroundColor: "#ecfdf5",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#047857",
                      }}
                    >
                      💪 {meal.protein}g protein
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default RestaurantBrowser;