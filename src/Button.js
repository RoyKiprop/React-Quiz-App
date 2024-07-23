function NextButton({ dispatch, answer, index, questionNum }) {
  if (answer === null) return;
  if (index < questionNum - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
   if (index === questionNum - 1)
        return (
            <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "Finish" })}
            >
            Finish
            </button>
        );
    }

export default NextButton;
