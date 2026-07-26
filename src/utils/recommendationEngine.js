function numberOrZero(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

const dinnerAddOns = [
  {
    name: "1 cup cooked rice",
    calories: 205,
    carbs: 45,
    fat: 0,
    protein: 4,
  },
  {
    name: "Medium baked potato",
    calories: 165,
    carbs: 37,
    fat: 0,
    protein: 4,
  },
  {
    name: "Medium sweet potato",
    calories: 115,
    carbs: 27,
    fat: 0,
    protein: 2,
  },
  {
    name: "Banana",
    calories: 105,
    carbs: 27,
    fat: 0,
    protein: 1,
  },
  {
    name: "Apple",
    calories: 95,
    carbs: 25,
    fat: 0,
    protein: 0,
  },
  {
    name: "Fruit cup",
    calories: 80,
    carbs: 20,
    fat: 0,
    protein: 1,
  },
  {
    name: "6 oz grilled chicken breast",
    calories: 280,
    carbs: 0,
    fat: 6,
    protein: 52,
  },
  {
    name: "Protein shake",
    calories: 160,
    carbs: 5,
    fat: 3,
    protein: 30,
  },
  {
    name: "Garden salad, light dressing",
    calories: 120,
    carbs: 12,
    fat: 6,
    protein: 4,
  },
  {
    name: "Steamed vegetables",
    calories: 70,
    carbs: 14,
    fat: 0,
    protein: 4,
  },
];

function flattenMeals(meals) {
  if (Array.isArray(meals)) {
    return meals;
  }

  if (!meals || typeof meals !== "object") {
    return [];
  }

  return Object.entries(meals).flatMap(
    ([restaurant, restaurantMeals]) => {
      if (!Array.isArray(restaurantMeals)) {
        return [];
      }

      return restaurantMeals.map((meal) => ({
        ...meal,
        restaurant,
      }));
    }
  );
}

function totalMealAndAddOns(baseMeal, addOns) {
  const totals = addOns.reduce(
    (currentTotals, addOn) => ({
      calories:
        currentTotals.calories +
        numberOrZero(addOn.calories),

      carbs:
        currentTotals.carbs +
        numberOrZero(addOn.carbs),

      fat:
        currentTotals.fat +
        numberOrZero(addOn.fat),

      protein:
        currentTotals.protein +
        numberOrZero(addOn.protein),
    }),
    {
      calories: numberOrZero(baseMeal.calories),
      carbs: numberOrZero(baseMeal.carbs),
      fat: numberOrZero(baseMeal.fat),
      protein: numberOrZero(baseMeal.protein),
    }
  );

  const addOnNames = addOns.map((addOn) => addOn.name);

  return {
    ...baseMeal,
    name:
      addOnNames.length === 0
        ? baseMeal.name
        : `${baseMeal.name} + ${addOnNames.join(" + ")}`,
    calories: totals.calories,
    carbs: totals.carbs,
    fat: totals.fat,
    protein: totals.protein,
    addOns: addOnNames,
  };
}

function buildDinnerOptions(baseMeal) {
  const options = [];

  options.push(totalMealAndAddOns(baseMeal, []));

  dinnerAddOns.forEach((firstAddOn, firstIndex) => {
    options.push(
      totalMealAndAddOns(baseMeal, [firstAddOn])
    );

    dinnerAddOns.forEach((secondAddOn, secondIndex) => {
      if (secondIndex <= firstIndex) {
        return;
      }

      options.push(
        totalMealAndAddOns(baseMeal, [
          firstAddOn,
          secondAddOn,
        ])
      );
    });
  });

  return options;
}

function calculateMealScore(meal, remainingMacros) {
  const caloriesLeft =
    numberOrZero(remainingMacros.calories) -
    numberOrZero(meal.calories);

  const carbsLeft =
    numberOrZero(remainingMacros.carbs) -
    numberOrZero(meal.carbs);

  const fatLeft =
    numberOrZero(remainingMacros.fat) -
    numberOrZero(meal.fat);

  const proteinLeft =
    numberOrZero(remainingMacros.protein) -
    numberOrZero(meal.protein);

  let score = 10000;

  /*
   * Strongly penalize unused macros.
   * This encourages the app to build a complete dinner
   * rather than recommending a meal that leaves a lot behind.
   */
  score -= Math.abs(caloriesLeft) * 1.2;
  score -= Math.abs(carbsLeft) * 12;
  score -= Math.abs(fatLeft) * 20;
  score -= Math.abs(proteinLeft) * 15;

  /*
   * Extra penalty for leaving large amounts unused.
   */
  if (caloriesLeft > 200) {
    score -= caloriesLeft * 2;
  }

  if (carbsLeft > 10) {
    score -= carbsLeft * 10;
  }

  if (fatLeft > 10) {
    score -= fatLeft * 14;
  }

  if (proteinLeft > 10) {
    score -= proteinLeft * 12;
  }

  /*
   * Going over by more than 10 grams is also penalized.
   * Fat receives the strongest penalty.
   */
  if (carbsLeft < -10) {
    score -= Math.abs(carbsLeft) * 18;
  }

  if (fatLeft < -10) {
    score -= Math.abs(fatLeft) * 30;
  }

  if (proteinLeft < -10) {
    score -= Math.abs(proteinLeft) * 10;
  }

  /*
   * Reward every macro that finishes within ±10 grams.
   */
  if (Math.abs(carbsLeft) <= 10) {
    score += 500;
  }

  if (Math.abs(fatLeft) <= 10) {
    score += 500;
  }

  if (Math.abs(proteinLeft) <= 10) {
    score += 500;
  }

  /*
   * Reward dinners that use nearly all remaining calories.
   */
  if (Math.abs(caloriesLeft) <= 100) {
    score += 400;
  }

  /*
   * Large bonus when all three gram-based macros
   * finish within the user's preferred ±10-gram range.
   */
  const withinTenGrams =
    Math.abs(carbsLeft) <= 10 &&
    Math.abs(fatLeft) <= 10 &&
    Math.abs(proteinLeft) <= 10;

  if (withinTenGrams) {
    score += 2000;
  }

  return {
    score,
    afterMeal: {
      calories: caloriesLeft,
      carbs: carbsLeft,
      fat: fatLeft,
      protein: proteinLeft,
    },
    withinTenGrams,
  };
}

export function getTopMealRecommendations(
  meals,
  remainingMacros,
  limit = 3
) {
  const flattenedMeals = flattenMeals(meals);

  const dinnerOptions = flattenedMeals.flatMap(
    (meal) => buildDinnerOptions(meal)
  );

  return dinnerOptions
    .map((meal) => {
      const results = calculateMealScore(
        meal,
        remainingMacros
      );

      return {
        ...meal,
        score: results.score,
        afterMeal: results.afterMeal,
        withinTenGrams: results.withinTenGrams,
      };
    })
    .sort(
      (firstMeal, secondMeal) =>
        secondMeal.score - firstMeal.score
    )
    .filter((meal, index, allMeals) => {
      return (
        index ===
        allMeals.findIndex(
          (otherMeal) => otherMeal.name === meal.name
        )
      );
    })
    .slice(0, limit);
}