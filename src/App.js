
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartSnippet from "./StartSnippet";

const initialState = {
  questions: [],
  status: 'Loading'
}

function reducer(state, action){
    switch(action.type){
      case 'dataReceived':
        return {
          ...state, 
          questions: action.payload,
          status: "ready"
        }
      case 'dataFailed':
        return {
          ...state, status: "error"
        }
      default:
        throw new Error ("Action unknown")
    }


}

function App() {
 const[{status, questions}, dispatch] = useReducer(reducer, initialState)

 useEffect( function (){
    fetch("http://localhost:9000/questions")
    .then((response) => response.json())
    .then((data) =>   dispatch({type: 'dataReceived', payload: data}))
    .catch((error) => dispatch({type: 'dataFailed'}))
 
 }, [])

  return (
    <div className="App">
     <Header/>
     <Main>
      {
        status === "Loading" && <Loader/>
      }
      {
         status === "error" && <Error/>
      }
       {
         status === "ready" && <StartSnippet/>
      }
     </Main>
      
    </div>
  );
}

export default App;
