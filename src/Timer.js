import { useEffect } from "react"

function Timer ({dispatch, remainingSeconds}){

    useEffect(function (){
        setInterval(
            function (){
                dispatch({type: "tickTimer"})
                
            }, 1000
        )
    }, [dispatch])
    return (
        <div className="timer">{remainingSeconds}</div>
    )
}

export default Timer