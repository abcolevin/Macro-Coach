function Header() {
  return (
    <header
      className="header"
      style={{
        textAlign: "center",
        paddingBottom: "20px",
        borderBottom: "1px solid #e2e8f0",
        marginBottom: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "8px",
          fontSize: "2rem",
        }}
      >
        🥩 Macro Coach
      </h1>

      <p
        className="version"
        style={{
          fontWeight: "700",
          color: "#2563eb",
          margin: "0 0 10px",
        }}
      >
        Version 2.3 Beta
      </p>

      <p
        className="subtitle"
        style={{
          color: "#64748b",
          maxWidth: "500px",
          margin: "0 auto",
          lineHeight: "1.5",
        }}
      >
        Your personal macro coach helping you choose the best meal based on your
        remaining calories, carbs, fat, and protein.
      </p>
    </header>
  );
}

export default Header;