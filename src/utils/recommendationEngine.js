function numberOrZero(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
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

  let score = 100;

  if (remainingProtein > 0) {
    const proteinCoverage = Math.min(mealProtein / remainingProtein, 1);
    score += proteinCoverage * 45;
  }

  if (mealCalories > remainingCalories) {
    score -= (mealCalories - remainingCalories) * 0.18;
  } else {
    score += 12;
  }

  if (remainingCarbs <= 0) {
    score -= mealCarbs * 1.25;
  } else if (mealCarbs > remainingCarbs) {
    score -= (mealCarbs - remainingCarbs) * 1.1;
  } else {
    score += 8;
  }

  if (remainingFat <= 0) {
    score -= mealFat * 2.2;
  } else if (mealFat > remainingFat) {
    score -= (mealFat - remainingFat) * 2;
  } else {
    score += 8;
  }

  if (mealProtein >= 25 && mealFat <= 12) {
    score += 22;
  }

  if (mealProtein >= 30 && mealCarbs <= 20) {
    score += 18;
  }

  if (mealCalories >= 500 && mealProtein < 25) {
    score -= 25;
  }

  return score;
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
    .map((meal) => ({
      ...meal,
      score: calculateMealScore(meal, remainingMacros),
    }))
    .sort((firstMeal, secondMeal) => secondMeal.score - firstMeal.score)
    .slice(0, limit);
}