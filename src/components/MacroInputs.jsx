function MacroInputs({ todayMacros, updateMacro }) {
  return (
    <div className="macro-inputs">
      <h2>Today's Progress</h2>

      <label>
        Calories
        <input
          type="text"
          inputMode="numeric"
          name="calories"
          placeholder="0"
          value={todayMacros.calories}
          onChange={updateMacro}
        />
      </label>

      <label>
        Carbs
        <input
          type="text"
          inputMode="numeric"
          name="carbs"
          placeholder="0"
          value={todayMacros.carbs}
          onChange={updateMacro}
        />
      </label>

      <label>
        Fat
        <input
          type="text"
          inputMode="numeric"
          name="fat"
          placeholder="0"
          value={todayMacros.fat}
          onChange={updateMacro}
        />
      </label>

      <label>
        Protein
        <input
          type="text"
          inputMode="numeric"
          name="protein"
          placeholder="0"
          value={todayMacros.protein}
          onChange={updateMacro}
        />
      </label>
   <div className="remaining-today">
  <h2>Remaining Today</h2>

  <p>Calories remaining will appear here.</p>
  <p>Carbs remaining will appear here.</p>
  <p>Fat remaining will appear here.</p>
  <p>Protein remaining will appear here.</p>
</div>
 </div>
  );
}

export default MacroInputs;