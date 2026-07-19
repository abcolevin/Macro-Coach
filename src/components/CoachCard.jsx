function CoachCard({ message, restaurant }) {
  if (message === "") {
    return null;
  }

  return (
    <div className="coach-message">
      <h2>🍔 Coach Recommendation</h2>

      <div className="coach-location">
        📍 {restaurant}
      </div>

      <p>{message}</p>
    </div>
  );
}

export default CoachCard;