export function getTopMealRecommendations(
  restaurantMeals,
  remainingMacros,
  limit = 3
) {
  if (!restaurantMeals || restaurantMeals.length === 0) {
    return [];
  }

  const {
    calories: remainingCalories,
    protein: remainingProtein,
    carbs: remainingCarbs,
    fat: remainingFat,
  } = remainingMacros;

  return restaurantMeals
    .map((meal) => {
      const score =
        Math.abs(remainingCalories - meal.calories) +
        Math.abs(remainingProtein - meal.protein) * 10 +
        Math.abs(remainingCarbs - meal.carbs) * 4 +
        Math.abs(remainingFat - meal.fat) * 9;

      return {
        ...meal,
        score,
      };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, limit);
}