/* eslint-disable */
import Icon from "../assets/Icon";

function Square(props) {
    //''#60dd8e' (lg),'#f6fcb4' (y), '#0c3939' (dg)
    return (
        <div className={props.class} onClick={() => { props.updateSquare(props.id) }}>
            <Icon className="icon" svgNo={Number(props.iconNo)} />
        </div >
    )
}

export default Square;
