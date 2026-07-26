function getMealReasons(meal) {
  const reasons = [];

  if (meal.protein >= 35) {
    reasons.push(`Excellent protein: ${meal.protein}g`);
  } else if (meal.protein >= 25) {
    reasons.push(`Good protein: ${meal.protein}g`);
  }

  if (meal.carbs <= 10) {
    reasons.push(`Very low carbs: ${meal.carbs}g`);
  } else if (meal.carbs <= 25) {
    reasons.push(`Moderate carbs: ${meal.carbs}g`);
  }

  if (meal.fat <= 6) {
    reasons.push(`Very low fat: ${meal.fat}g`);
  } else if (meal.fat <= 12) {
    reasons.push(`Moderate fat: ${meal.fat}g`);
  }

  if (meal.calories <= 250) {
    reasons.push(`Light calorie option: ${meal.calories} calories`);
  } else if (meal.calories <= 500) {
    reasons.push(`Reasonable calorie option: ${meal.calories} calories`);
  }

  if (reasons.length === 0) {
    reasons.push("One of the closest available matches");
  }

  return reasons;
}

function CoachCard({ message, restaurant }) {
  if (!message || message.length === 0) {
    return null;
  }

  return (
    <section className="coach-message">
      <h2>🏆 Top Meal Recommendations</h2>

      {restaurant && (
        <div className="coach-location">
          📍 {restaurant}
        </div>
      )}

      {message.map((meal, index) => {
        const reasons = getMealReasons(meal);

        return (
          <article
            key={`${meal.name}-${index}`}
            style={{
              border:
                index === 0
                  ? "2px solid #2563eb"
                  : "1px solid #d1d5db",
              borderRadius: "12px",
              padding: "16px",
              marginTop: "14px",
              backgroundColor:
                index === 0 ? "#eff6ff" : "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <h3 style={{ margin: 0 }}>
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : "🥉"}{" "}
                {meal.name}
              </h3>

              {index === 0 && (
                <span
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    borderRadius: "999px",
                    padding: "5px 10px",
                    fontSize: "13px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  }}
                >
                  Best Match
                </span>
              )}
            </div>

            <p style={{ marginBottom: "6px" }}>
              <strong>{meal.calories}</strong> Calories
            </p>

            <p style={{ marginTop: 0 }}>
              💪 {meal.protein}g Protein &nbsp;|&nbsp;
              🌾 {meal.carbs}g Carbs &nbsp;|&nbsp;
              🥑 {meal.fat}g Fat
            </p>

            {index === 0 && (
              <div
                style={{
                  marginTop: "14px",
                  paddingTop: "12px",
                  borderTop: "1px solid #bfdbfe",
                }}
              >
                <strong>Why this meal?</strong>

                <ul
                  style={{
                    marginTop: "8px",
                    marginBottom: 0,
                    paddingLeft: "22px",
                  }}
                >
                  {reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}

export default CoachCard;