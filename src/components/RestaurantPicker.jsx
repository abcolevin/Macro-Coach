function RestaurantPicker({
  restaurant,
  setRestaurant,
  setMessage,
}) {
  return (
    <div className="restaurant-card">
      <h2>Where Are You Eating?</h2>

      <select
        value={restaurant}
        onChange={(event) => {
          setRestaurant(event.target.value);
          setMessage("");
        }}
      >
        <option>Home</option>
        <option>Taco Amigo</option>
        <option>Costa Vida</option>
        <option>Chick-fil-A</option>
        <option>Texas Roadhouse</option>
        <option>R&R BBQ</option>
      </select>
    </div>
  );
}

export default RestaurantPicker;