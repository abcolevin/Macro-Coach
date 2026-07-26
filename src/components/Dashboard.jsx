function Dashboard({
  recommendations,
  remainingMacros,
  todayMacros,
  updateMacro,
  macroGoals,
  toggleFavorite,
  isFavorite,
}) {
  const topRecommendation = recommendations?.[0];
  const otherRecommendations = recommendations?.slice(1, 3) || [];

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

      <section className="recommendation-card">
        <p className="eyebrow">🍴 Best Choice Right Now</p>

        {topRecommendation ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <div>
                <h2 style={{ marginBottom: "6px" }}>
                  🥇 {topRecommendation.restaurant}
                </h2>
                <h3 style={{ marginTop: 0 }}>
                  {topRecommendation.name}
                </h3>
              </div>

              <FavoriteButton meal={topRecommendation} />
            </div>

            <div className="meal-macros">
              <span>{topRecommendation.calories} cal</span>
              <span>{topRecommendation.carbs}g carbs</span>
              <span>{topRecommendation.fat}g fat</span>
              <span>{topRecommendation.protein}g protein</span>
            </div>
          </>
        ) : (
          <p>Add today's macros to see your best meal recommendation.</p>
        )}
      </section>

      {otherRecommendations.length > 0 && (
        <section className="dashboard-section">
          <h2>Other Great Choices</h2>

          <div className="other-recommendations">
            {otherRecommendations.map((meal, index) => (
              <article
                key={`${meal.restaurant}-${meal.name}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gap: "4px",
                  }}
                >
                  <strong>
                    {index === 0 ? "🥈" : "🥉"} {meal.restaurant}
                  </strong>
                  <span>{meal.name}</span>
                </div>

                <FavoriteButton meal={meal} />
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Dashboard;