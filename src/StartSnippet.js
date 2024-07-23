function StartSnippet({ questionNum, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>{questionNum} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets's start
      </button>
    </div>
  );
}

export default StartSnippet;
