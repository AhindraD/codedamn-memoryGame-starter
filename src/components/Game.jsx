/* eslint-disable */
import Board from "./Board";
import { useState, useEffect, useRef } from "react";

function Game() {

    let [iconArr, SetIconArr] = useState([[1, 2, 3, 4], [5, 6, 7, 8], [1, 2, 3, 4], [5, 6, 7, 8]]);
    let [time, setTime] = useState(0);
    let [move, setMove] = useState(0);
    let [score, setScore] = useState(0);
    let [flippedArr, setFlippedArr] = useState([]);
    let [won, setWon] = useState(false);

    let selectTwo = useRef('');

    let intervalID = useRef();
    let timeOutID = useRef();

    useEffect(() => {
        createRandom();

        return () => {
            clearInterval(intervalID.current);
        };
    }, [])

    function createRandom() {

    }

    function handleClick(id) {

    }

    return (
        <div className="container">
            <p className="heading">Memory Game</p>
            <div className="stats">
                <p className="time">Time: <b>{time}</b>s</p>
                <p className="moves"><b>{move}</b> Moves</p>
                <p className="score">Score: <b>{score}</b></p>
                <button onClick={createRandom} className="restart">Restart</button>
            </div>
            {won ? <h2 className="won-text">🏆Congratulations🏆
                <br />
                <br />
                🏅You won in <b>{move} moves</b>🏅
                <br />
                <br />
                🔰You took <b>{time} seconds</b>🔰
            </h2>
                : <Board flippedArr={flippedArr} icons={iconArr} handleClick={handleClick} />}
        </div>
    )
}

export default Game;
