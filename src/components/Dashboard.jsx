function Dashboard({
  recommendations,
  remainingMacros,
  todayMacros,
  updateMacro,
  macroGoals,
  toggleFavorite,
  isFavorite,
  eatingLocation,
  setEatingLocation,
}) {
  const dinnerRecommendations = recommendations?.slice(0, 3) || [];

  function FavoriteButton({ meal }) {
    const favorite = isFavorite?.(meal);

    return (
      <button
        type="button"
        onClick={() => toggleFavorite?.(meal)}
        aria-label={
          favorite
            ? `Remove ${meal.name} from favorites`
            : `Add ${meal.name} to favorites`
        }
        title={favorite ? "Remove from Favorites" : "Add to Favorites"}
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
    );
  }

  function formatRemaining(value, unit = "g") {
    const number = Number(value) || 0;

    if (number === 0) {
      return `0${unit}`;
    }

    if (number > 0) {
      return `${number}${unit} left`;
    }

    return `${Math.abs(number)}${unit} over`;
  }

  function getResultStyle(value) {
    const number = Number(value) || 0;
    const withinTen = Math.abs(number) <= 10;

    return {
      padding: "10px 8px",
      borderRadius: "10px",
      textAlign: "center",
      backgroundColor: withinTen ? "#ecfdf5" : "#f8fafc",
      border: withinTen
        ? "1px solid #86efac"
        : "1px solid #dbe2ea",
    };
  }

  function LocationButton({ value, label }) {
    const selected = eatingLocation === value;

    return (
      <button
        type="button"
        onClick={() => setEatingLocation(value)}
        style={{
          padding: "12px 8px",
          borderRadius: "10px",
          border: selected
            ? "2px solid #2563eb"
            : "1px solid #cbd5e1",
          backgroundColor: selected ? "#eff6ff" : "#ffffff",
          color: selected ? "#1d4ed8" : "#334155",
          fontWeight: "800",
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    );
  }

  function DinnerCard({ meal, index }) {
    const medals = ["🥇", "🥈", "🥉"];
    const titles = ["Best Fit", "Second Choice", "Third Choice"];
    const afterMeal = meal.afterMeal || {};

    return (
      <article
        style={{
          padding: index === 0 ? "20px" : "16px",
          borderRadius: "16px",
          border:
            index === 0
              ? "2px solid #2563eb"
              : "1px solid #dbe2ea",
          backgroundColor: "#ffffff",
          boxShadow:
            index === 0
              ? "0 8px 22px rgba(37, 99, 235, 0.12)"
              : "none",
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
            <p
              style={{
                margin: "0 0 6px",
                color: "#2563eb",
                fontWeight: "800",
              }}
            >
              {medals[index]} {titles[index]}
            </p>

            <strong
              style={{
                display: "block",
                fontSize: "1.15rem",
                color: "#172033",
              }}
            >
              {meal.restaurant}
            </strong>

            <h3
              style={{
                margin: "5px 0 0",
                color: "#172033",
                lineHeight: 1.35,
              }}
            >
              {meal.name}
            </h3>
          </div>

          <FavoriteButton meal={meal} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          <span style={getResultStyle(afterMeal.calories)}>
            <strong style={{ display: "block" }}>
              {formatRemaining(afterMeal.calories, " cal")}
            </strong>
            <small>Calories</small>
          </span>

          <span style={getResultStyle(afterMeal.carbs)}>
            <strong style={{ display: "block" }}>
              {formatRemaining(afterMeal.carbs)}
            </strong>
            <small>Carbs</small>
          </span>

          <span style={getResultStyle(afterMeal.fat)}>
            <strong style={{ display: "block" }}>
              {formatRemaining(afterMeal.fat)}
            </strong>
            <small>Fat</small>
          </span>

          <span style={getResultStyle(afterMeal.protein)}>
            <strong style={{ display: "block" }}>
              {formatRemaining(afterMeal.protein)}
            </strong>
            <small>Protein</small>
          </span>
        </div>

        {meal.withinTenGrams && (
          <p
            style={{
              margin: "14px 0 0",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: "#dcfce7",
              color: "#166534",
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            ✅ Finishes within 10 grams of every macro
          </p>
        )}

        <p
          style={{
            margin: "14px 0 0",
            color: "#64748b",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          Meal: {meal.calories} cal | {meal.carbs}g carbs |{" "}
          {meal.fat}g fat | {meal.protein}g protein
        </p>
      </article>
    );
  }

  return (
    <main className="dashboard">
      <section className="dashboard-section">
        <h2>Today's Progress</h2>

        <div className="macro-grid">
          <label>
            Calories
            <input
              type="text"
              inputMode="numeric"
              name="calories"
              value={todayMacros.calories}
              onChange={updateMacro}
              placeholder="0"
            />
            <span>of {macroGoals.calories}</span>
          </label>

          <label>
            Carbs
            <input
              type="text"
              inputMode="numeric"
              name="carbs"
              value={todayMacros.carbs}
              onChange={updateMacro}
              placeholder="0"
            />
            <span>of {macroGoals.carbs}g</span>
          </label>

          <label>
            Fat
            <input
              type="text"
              inputMode="numeric"
              name="fat"
              value={todayMacros.fat}
              onChange={updateMacro}
              placeholder="0"
            />
            <span>of {macroGoals.fat}g</span>
          </label>

          <label>
            Protein
            <input
              type="text"
              inputMode="numeric"
              name="protein"
              value={todayMacros.protein}
              onChange={updateMacro}
              placeholder="0"
            />
            <span>of {macroGoals.protein}g</span>
          </label>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Remaining Today</h2>

        <div className="remaining-grid">
          <div>
            <strong>{remainingMacros.calories}</strong>
            <span>Calories</span>
          </div>

          <div>
            <strong>{remainingMacros.carbs}g</strong>
            <span>Carbs</span>
          </div>

          <div>
            <strong>{remainingMacros.fat}g</strong>
            <span>Fat</span>
          </div>

          <div>
            <strong>{remainingMacros.protein}g</strong>
            <span>Protein</span>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              margin: "0 0 8px",
              color: "#475569",
              fontWeight: "800",
            }}
          >
            Where are you eating?
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
            }}
          >
            <LocationButton value="anywhere" label="🌎 Anywhere" />
            <LocationButton value="home" label="🏠 Home" />
            <LocationButton
              value="restaurant"
              label="🍽 Restaurant"
            />
          </div>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              margin: "0 0 6px",
              color: "#2563eb",
              fontWeight: "800",
            }}
          >
            🍽 Macro Coach
          </p>

          <h2 style={{ marginBottom: "8px" }}>
            Your 3 Best Dinner Choices
          </h2>

          <p style={{ margin: 0, color: "#64748b" }}>
            These meals are ranked by how closely they use your
            remaining macros.
          </p>
        </div>

        {dinnerRecommendations.length > 0 ? (
          <div style={{ display: "grid", gap: "14px" }}>
            {dinnerRecommendations.map((meal, index) => (
              <DinnerCard
                key={`${meal.restaurant}-${meal.name}`}
                meal={meal}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "24px",
              border: "1px dashed #94a3b8",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            No dinner choices are available for this selection.
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;