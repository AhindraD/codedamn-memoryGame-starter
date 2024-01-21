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
                //to clear the previous interval reference
        clearInterval(intervalID.current);

        //to start a fresh new timer, that will be used to keep track of time
        intervalID.current = setInterval(function () {
            setTime((time) => time + 1);
        }, 1000)


        //to keep track of icons we are assigning, every value  will be 2  as we  can only assign one icon twice  (8 pairs of icons)
        let iconsObj = {
            '1': 2,
            '2': 2,
            '3': 2,
            '4': 2,
            '5': 2,
            '6': 2,
            '7': 2,
            '8': 2,
        }

        //creating a 4x4 2D array
        let newArr = new Array(4).fill(0).map((elm) => new Array(4).fill(0));

        //assigning icons randomly
        for (let i = 0; i < newArr.length; i++) {
            for (let j = 0; j < newArr[i].length; j++) {

                //random number between 1 and 8  (to choose any from 8 icons)
                let randomNum = Math.ceil(Math.random() * 8);

                //to ensure that the same icon is not assigned more than twice
                while (iconsObj[randomNum] <= 0) {
                    //incase the same icon is assigned more than twice we  re assigning another random number
                    randomNum = Math.ceil(Math.random() * 8);
                }

                //to assign the icon
                newArr[i][j] = randomNum;

                //to decrease the number of times, a  specific icon is assigned
                iconsObj[randomNum]--;
            }
        }

        //inititalizing the state of game
        SetIconArr(newArr);
        setTime(0);
        setMove(0);
        setScore(0);
        setWon(false);

        //no  tiles is  still flipped
        setFlippedArr([]);
        selectTwo.current = '';
    }

function handleClick(id) {
        //in "id" props  passed  from Square.jsx, we  have  row and column
        let row = Number(id[0]);
        let col = Number(id[2]);
        console.log([row, col]);

        //incase we have flipped one tile already
        if (selectTwo.current.length === 0) {
            //to keep track of the tile clicked
            selectTwo.current = (iconArr[row][col]).toString();

            //we are passing the id(row and column) of the tile clicked, to keep it in "flipped" state
            setFlippedArr((arr) => arr.concat([id]));
            console.log(selectTwo);
        }

        //incase we have flipped two tiles already
        else if (selectTwo.current.length === 1) {
            //it will count as a move
            setMove((prev) => prev + 1);
            //storing the second tile clicked, to evaluate if they are same
            selectTwo.current += (iconArr[row][col]).toString();
            //keeping it in "flipped" state
            setFlippedArr((arr) => arr.concat([id]));
            console.log(selectTwo);


            // checking if they are same or not, and act accordingly after 700ms. We are giving 700ms delay to user , so that they can see the 2 tiles selected
            timeOutID.current = setTimeout(function () {
                if (selectTwo.current[0] === selectTwo.current[1]) {
                    //if same we will add 1 to score
                    setScore((score) => score + 1);
                }
                else {
                    //if not same we will flip them back to "unflipped" state
                    setFlippedArr((arr) => arr.slice(0, -2));
                }

                //if  all tiles are flipped we will end the game, as we  have won
                if (flippedArr.length >= 15) {
                    clearInterval(intervalID.current);
                    setWon(true);
                }

                //resetting the  reference to lastly clicked tile/tiles
                selectTwo.current = '';
            }, 700)
        }
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
