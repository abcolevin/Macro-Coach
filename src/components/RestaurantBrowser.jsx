function RestaurantBrowser({
  meals,
  selectedRestaurant,
  setSelectedRestaurant,
  toggleFavorite,
  isFavorite,
}) {
  const restaurantNames = Object.keys(meals).filter(
    (restaurantName) => restaurantName !== "Home"
  );

  const selectedMeals = selectedRestaurant
    ? meals[selectedRestaurant] || []
    : [];

  if (!selectedRestaurant) {
    return (
      <main className="dashboard">
        <section className="dashboard-section">
          <h2>🍽 Restaurants</h2>

          <p>Select a restaurant to view its available meals.</p>

          <div
            style={{
              display: "grid",
              gap: "10px",
              marginTop: "18px",
            }}
          >
            {restaurantNames.map((restaurantName) => (
              <button
                type="button"
                key={restaurantName}
                onClick={() => setSelectedRestaurant(restaurantName)}
                style={{
                  padding: "14px",
                  border: "1px solid #dbe2ea",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                🍴 {restaurantName}
              </button>
            ))}
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
          onClick={() => setSelectedRestaurant("")}
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            marginBottom: "14px",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          ← Back to Restaurants
        </button>

        <h2>🍴 {selectedRestaurant}</h2>

        <p>{selectedMeals.length} meals available</p>

        <div
          style={{
            display: "grid",
            gap: "12px",
            marginTop: "18px",
          }}
        >
          {selectedMeals.map((meal) => {
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
                  borderRadius: "12px",
                  padding: "16px",
                  backgroundColor: "#ffffff",
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
                  <div>
                    <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
                      {meal.name}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      <span>{meal.calories} cal</span>
                      <span>{meal.carbs}g carbs</span>
                      <span>{meal.fat}g fat</span>
                      <span>{meal.protein}g protein</span>
                    </div>
                  </div>

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
                      border: "none",
                      background: "transparent",
                      fontSize: "26px",
                      cursor: "pointer",
                      padding: "4px",
                      lineHeight: 1,
                    }}
                  >
                    {favorite ? "⭐" : "☆"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default RestaurantBrowser;