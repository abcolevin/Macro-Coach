const meals = {
  Home: [
    {
      name: "8 oz Grilled Chicken + Rice + Vegetables",
      calories: 620,
      protein: 72,
      carbs: 55,
      fat: 10,
    },
    {
      name: "8 oz Grilled Chicken + Vegetables",
      calories: 390,
      protein: 70,
      carbs: 15,
      fat: 8,
    },
    {
      name: "6 oz Sirloin + Baked Potato + Vegetables",
      calories: 610,
      protein: 52,
      carbs: 55,
      fat: 19,
    },
    {
      name: "Turkey Sandwich + Fruit",
      calories: 520,
      protein: 39,
      carbs: 58,
      fat: 15,
    },
    {
      name: "Protein Shake + Banana",
      calories: 280,
      protein: 30,
      carbs: 34,
      fat: 3,
    },
    {
      name: "Rotisserie Chicken Breast, Skin Removed",
      calories: 300,
      protein: 55,
      carbs: 0,
      fat: 8,
    },
  ],

  "Chick-fil-A": [
    {
      name: "12-Count Grilled Nuggets",
      calories: 200,
      protein: 38,
      carbs: 2,
      fat: 4.5,
    },
    {
      name: "8-Count Grilled Nuggets",
      calories: 130,
      protein: 25,
      carbs: 1,
      fat: 3,
    },
    {
      name: "Grilled Chicken Sandwich",
      calories: 390,
      protein: 28,
      carbs: 45,
      fat: 11,
    },
    {
      name: "Grilled Chicken Sandwich + Fruit Cup",
      calories: 450,
      protein: 29,
      carbs: 60,
      fat: 11,
    },
    {
      name: "12-Count Nuggets",
      calories: 380,
      protein: 40,
      carbs: 16,
      fat: 17,
    },
  ],

  "Costa Vida": [
    {
      name: "Chicken Protein Bowl",
      calories: 610,
      protein: 52,
      carbs: 55,
      fat: 18,
    },
    {
      name: "Chicken Salad, Light Dressing",
      calories: 560,
      protein: 45,
      carbs: 47,
      fat: 21,
    },
    {
      name: "Chicken Baja Bowl, Light Cheese",
      calories: 650,
      protein: 48,
      carbs: 75,
      fat: 18,
    },
    {
      name: "Two Grilled Chicken Tacos",
      calories: 520,
      protein: 38,
      carbs: 48,
      fat: 20,
    },
  ],

  "Cafe Rio": [
    {
      name: "Double Chicken Protein Bowl",
      calories: 620,
      protein: 65,
      carbs: 52,
      fat: 17,
    },
    {
      name: "Chicken Salad, No Tortilla",
      calories: 540,
      protein: 45,
      carbs: 38,
      fat: 22,
    },
    {
      name: "Chicken Burrito Bowl, Light Cheese",
      calories: 680,
      protein: 48,
      carbs: 78,
      fat: 18,
    },
  ],

  "Taco Amigo": [
    {
      name: "2 Soft Flour Chicken Tacos",
      calories: 520,
      protein: 32,
      carbs: 50,
      fat: 22,
    },
    {
      name: "Chicken Burrito, No Sour Cream",
      calories: 620,
      protein: 38,
      carbs: 72,
      fat: 20,
    },
    {
      name: "Chicken Salad, Dressing on Side",
      calories: 470,
      protein: 38,
      carbs: 35,
      fat: 19,
    },
  ],

  "Jersey Mike's": [
    {
      name: "Regular Turkey and Provolone, No Mayo",
      calories: 690,
      protein: 44,
      carbs: 65,
      fat: 27,
    },
    {
      name: "Mini Turkey and Provolone, No Mayo",
      calories: 430,
      protein: 27,
      carbs: 42,
      fat: 16,
    },
    {
      name: "Turkey Sub in a Tub, Light Cheese",
      calories: 350,
      protein: 38,
      carbs: 12,
      fat: 17,
    },
    {
      name: "Grilled Chicken Sub in a Tub",
      calories: 390,
      protein: 49,
      carbs: 15,
      fat: 16,
    },
  ],

  "Jimmy John's": [
    {
      name: "Turkey Tom, No Mayo",
      calories: 480,
      protein: 30,
      carbs: 58,
      fat: 12,
    },
    {
      name: "Turkey Tom Unwich, No Mayo",
      calories: 230,
      protein: 27,
      carbs: 10,
      fat: 9,
    },
    {
      name: "Big John, No Mayo",
      calories: 500,
      protein: 32,
      carbs: 57,
      fat: 14,
    },
  ],

  "Texas Roadhouse": [
    {
      name: "8 oz Sirloin + Sweet Potato + Broccoli",
      calories: 690,
      protein: 58,
      carbs: 58,
      fat: 22,
    },
    {
      name: "8 oz Sirloin + Steamed Vegetables",
      calories: 470,
      protein: 56,
      carbs: 18,
      fat: 18,
    },
    {
      name: "6 oz Sirloin + Sweet Potato",
      calories: 520,
      protein: 46,
      carbs: 45,
      fat: 17,
    },
    {
      name: "Grilled Chicken + Sweet Potato",
      calories: 540,
      protein: 55,
      carbs: 46,
      fat: 14,
    },
  ],

  "Great Greek": [
    {
      name: "Two Chicken Skewers + Salad",
      calories: 580,
      protein: 58,
      carbs: 28,
      fat: 25,
    },
    {
      name: "Chicken Skewer Plate + Rice",
      calories: 710,
      protein: 55,
      carbs: 72,
      fat: 22,
    },
    {
      name: "Chicken Greek Salad, Dressing on Side",
      calories: 490,
      protein: 46,
      carbs: 24,
      fat: 24,
    },
  ],

  "Panda Express": [
    {
      name: "Grilled Teriyaki Chicken + Super Greens",
      calories: 390,
      protein: 41,
      carbs: 24,
      fat: 14,
    },
    {
      name: "Double Grilled Teriyaki Chicken + Super Greens",
      calories: 690,
      protein: 77,
      carbs: 40,
      fat: 27,
    },
    {
      name: "String Bean Chicken + Super Greens",
      calories: 280,
      protein: 18,
      carbs: 29,
      fat: 10,
    },
  ],

  "R&R BBQ": [
    {
      name: "Turkey + Chicken + Vegetables",
      calories: 610,
      protein: 72,
      carbs: 32,
      fat: 22,
    },
    {
      name: "Smoked Turkey + Sweet Potato Fries",
      calories: 650,
      protein: 48,
      carbs: 62,
      fat: 23,
    },
    {
      name: "Chicken + Side Salad",
      calories: 480,
      protein: 52,
      carbs: 24,
      fat: 20,
    },
  ],

  "El Pollo Loco": [
    {
      name: "Double Chicken Bowl, Light Sour Cream",
      calories: 650,
      protein: 59,
      carbs: 65,
      fat: 18,
    },
    {
      name: "Double Chicken Avocado Salad",
      calories: 570,
      protein: 55,
      carbs: 24,
      fat: 29,
    },
    {
      name: "Fire-Grilled Chicken Breast + Vegetables",
      calories: 330,
      protein: 48,
      carbs: 18,
      fat: 8,
    },
  ],

  "Burly Burger": [
    {
      name: "Classic Burger + Small Sweet Potato Fries",
      calories: 980,
      protein: 45,
      carbs: 94,
      fat: 47,
    },
    {
      name: "Burger, No Cheese + Side Salad",
      calories: 620,
      protein: 42,
      carbs: 38,
      fat: 32,
    },
  ],
};

export default meals;