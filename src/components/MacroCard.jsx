function MacroRow({ label, current, goal, unit = "" }) {
  const percent = (current / goal) * 100;
  const barWidth = Math.min(percent, 100);

  let statusClass = "progress-green";

  if (percent > 100) {
    statusClass = "progress-red";
  } else if (percent >= 90) {
    statusClass = "progress-orange";
  }

  return (
    <div className="macro-row">
      <div className="macro-row-top">
        <span>{label}</span>

        <span>
          {current} / {goal}
          {unit}
        </span>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${statusClass}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

function MacroCard({ calories, protein, carbs, fat, goals }) {
const remainingCalories = goals.calories - calories;
const remainingProtein = goals.protein - protein;
const remainingCarbs = goals.carbs - carbs;
const remainingFat = goals.fat - fat;

  return (
    <section className="macro-card">
      <h2>Today's Macros</h2>

      <MacroRow
        label="Calories"
        current={calories}
goal={goals.calories}
      />

      <MacroRow
        label="Protein"
        current={protein}
goal={goals.protein}
        unit="g"
      />

      <MacroRow
        label="Carbs"
        current={carbs}
goal={goals.carbs}
        unit="g"
      />

      <MacroRow
        label="Fat"
        current={fat}
goal={goals.fat}
        unit="g"
      />

           <hr />

      <h3>Remaining Today</h3>

      <div className="remaining-card">
        <div className="remaining-row">
          <span>🔥 Calories</span>
          <strong>{remainingCalories}</strong>
        </div>

        <div className="remaining-row">
          <span>💪 Protein</span>
          <strong>{remainingProtein}g</strong>
        </div>

        <div className="remaining-row">
          <span>🍞 Carbs</span>
          <strong>{remainingCarbs}g</strong>
        </div>

        <div className="remaining-row">
          <span>🥑 Fat</span>
          <strong>{remainingFat}g</strong>
        </div>
      </div>
    </section>
  );
}export default MacroCard;