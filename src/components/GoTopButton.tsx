function GoTopButton() {
  return (
    <button
      className="go-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      top
    </button>
  );
}

export default GoTopButton;
