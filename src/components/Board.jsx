/* eslint-disable */
import Square from "./Square";

function Board(props) {
    return (
        <div className="board">
                        {props.icons.map((elem, ind) => {
                return props.icons[ind].map((subElem, subInd) => {
                    return <Square class={props.flippedArr.includes(`${ind}-${subInd}`) ? 'flipped' : 'square'} key={`${ind}-${subInd}`} id={`${ind}-${subInd}`} iconNo={subElem} updateSquare={props.handleClick} />
                })
            })}
        </div>
    )
}

export default Board;
