function ProgressBar({ index, questionNum, points, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress max={questionNum} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {questionNum}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}{" "}
      </p>
    </header>
  );
}

export default ProgressBar;
