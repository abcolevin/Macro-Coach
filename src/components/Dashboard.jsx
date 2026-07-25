function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Today's Progress</h2>

      <h3>Remaining Today</h3>

      <div className="recommendation-card">
        <h3>🍴 Eat Here Tonight</h3>

        <h2>Texas Roadhouse</h2>

        <p>11 oz Sirloin</p>
        <p>Sweet Potato</p>
        <p>Broccoli</p>

        <p>⭐⭐⭐⭐⭐ 97% Match</p>
      </div>

      <div className="other-choices">
        <h3>Other Great Choices</h3>

        <p>🥈 Costa Vida</p>

        <p>🥉 Chick-fil-A</p>
      </div>
    </div>
  );
}

export default Dashboard;