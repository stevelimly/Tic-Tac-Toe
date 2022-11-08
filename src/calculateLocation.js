function calculateLocation(props) {
    let col = null;
    let row = null;
    const move = props[0];
    const squareClicked = props[1];

    if (move === 0) {
        col = null;
        row = null;
    }
    else if (squareClicked < 3){
        col = squareClicked;
        row = 0;
    }
    else if (squareClicked < 6){
        col = squareClicked-3;
        row = 1;
    }
    else{
        col = squareClicked-6;
        row = 2;
    }

    return [col, row];
}

export default calculateLocation