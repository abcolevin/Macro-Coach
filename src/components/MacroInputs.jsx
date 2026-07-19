function MacroInputs({ todayMacros, updateMacro }) {
  return (
    <div className="macro-input-card">
      <h2>Enter Today&apos;s Macros</h2>

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
    </div>
  );
}

export default MacroInputs;