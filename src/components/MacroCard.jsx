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

function MacroCard(props) {
  const remainingCalories = 1860 - props.calories;
  const remainingProtein = 150 - props.protein;
  const remainingCarbs = 180 - props.carbs;
  const remainingFat = 60 - props.fat;

  return (
    <section className="macro-card">
      <h2>Today's Macros</h2>

      <MacroRow
        label="Calories"
        current={props.calories}
        goal={1860}
      />

      <MacroRow
        label="Protein"
        current={props.protein}
        goal={150}
        unit="g"
      />

      <MacroRow
        label="Carbs"
        current={props.carbs}
        goal={180}
        unit="g"
      />

      <MacroRow
        label="Fat"
        current={props.fat}
        goal={60}
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