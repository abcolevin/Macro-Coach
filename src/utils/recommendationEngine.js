function numberOrZero(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function calculateDifference(mealValue, remainingValue) {
  return remainingValue - mealValue;
}

function calculateMealScore(meal, remainingMacros) {
  const mealCalories = numberOrZero(meal.calories);
  const mealCarbs = numberOrZero(meal.carbs);
  const mealFat = numberOrZero(meal.fat);
  const mealProtein = numberOrZero(meal.protein);

  const remainingCalories = numberOrZero(remainingMacros.calories);
  const remainingCarbs = numberOrZero(remainingMacros.carbs);
  const remainingFat = numberOrZero(remainingMacros.fat);
  const remainingProtein = numberOrZero(remainingMacros.protein);

  const caloriesLeft = calculateDifference(
    mealCalories,
    remainingCalories
  );

  const carbsLeft = calculateDifference(
    mealCarbs,
    remainingCarbs
  );

  const fatLeft = calculateDifference(
    mealFat,
    remainingFat
  );

  const proteinLeft = calculateDifference(
    mealProtein,
    remainingProtein
  );

  let score = 1000;

  score -= Math.abs(caloriesLeft) * 0.2;
  score -= Math.abs(carbsLeft) * 3;
  score -= Math.abs(fatLeft) * 8;
  score -= Math.abs(proteinLeft) * 4;

  if (Math.abs(carbsLeft) <= 10) {
    score += 100;
  }

  if (Math.abs(fatLeft) <= 10) {
    score += 100;
  }

  if (Math.abs(proteinLeft) <= 10) {
    score += 100;
  }

  if (
    Math.abs(carbsLeft) <= 10 &&
    Math.abs(fatLeft) <= 10 &&
    Math.abs(proteinLeft) <= 10
  ) {
    score += 250;
  }

  if (carbsLeft < -10) {
    score -= Math.abs(carbsLeft) * 5;
  }

  if (fatLeft < -10) {
    score -= Math.abs(fatLeft) * 12;
  }

  if (proteinLeft < -10) {
    score -= Math.abs(proteinLeft) * 2;
  }

  return {
    score,
    afterMeal: {
      calories: caloriesLeft,
      carbs: carbsLeft,
      fat: fatLeft,
      protein: proteinLeft,
    },
    withinTenGrams:
      Math.abs(carbsLeft) <= 10 &&
      Math.abs(fatLeft) <= 10 &&
      Math.abs(proteinLeft) <= 10,
  };
}

export function getTopMealRecommendations(
  meals,
  remainingMacros,
  limit = 3
) {
  if (!Array.isArray(meals)) {
    return [];
  }

  return meals
    .map((meal) => {
      const results = calculateMealScore(meal, remainingMacros);

      return {
        ...meal,
        score: results.score,
        afterMeal: results.afterMeal,
        withinTenGrams: results.withinTenGrams,
      };
    })
    .sort((firstMeal, secondMeal) => {
      return secondMeal.score - firstMeal.score;
    })
    .slice(0, limit);
}