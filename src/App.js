import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartSnippet from "./StartSnippet";
import Question from "./Question";
import NextButton from "./Button";
import ProgressBar from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "Finish":
      return {
        ...state, status: "finished", highscore: state.points > state.highscore? state.points: state.highscore
      }
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ status, questions, index, answer, points, highscore }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const questionNum = questions.length;
  const totalPoints = questions.reduce(
    (value, curValue) => value + curValue.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartSnippet questionNum={questionNum} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              points={points}
              questionNum={questionNum}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <NextButton dispatch={dispatch} answer={answer} questionNum={questionNum} index={index} />
          </>
        )}

        {status === "finished" && (
          <FinishScreen points={points} totalPoints={totalPoints} highscore={highscore} />
        )}
      </Main>
    </div>
  );
}

export default App;
