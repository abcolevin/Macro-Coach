function CoachCard({ message, restaurant }) {
  if (!message || message.length === 0) {
    return null;
  }

  return (
    <div className="coach-message">
      <h2>🏆 Top Meal Recommendations</h2>

      <div className="coach-location">
        📍 {restaurant}
      </div>

      {message.map((meal, index) => (
        <div
          key={meal.name}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            marginTop: "12px",
          }}
        >
          <h3>
            {index === 0
              ? "🥇"
              : index === 1
              ? "🥈"
              : "🥉"}{" "}
            {meal.name}
          </h3>

          <p>
            <strong>{meal.calories}</strong> Calories
          </p>

          <p>
            💪 {meal.protein}g Protein &nbsp;|&nbsp;
            🌾 {meal.carbs}g Carbs &nbsp;|&nbsp;
            🥑 {meal.fat}g Fat
          </p>
        </div>
      ))}
    </div>
  );
}

export default CoachCard;