import React from "react";
import calculateWinner from "./calculateWinner.js";
import calculateLocation from "./calculateLocation.js";
import Board from "./Board.js";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                squareClicked: 0,
            }],
            stepNumber : 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                squareClicked: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {

        // history is an array
        const history = this.state.history;

        // go the to version where stepNumber value is
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // map the history version based on value(step) and index(move)
        // value is the content in the array, index is the pointer to array
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';

            // inside history value(step) has squares[] and squareClicked attribute
            const squareClicked = step.squareClicked;
            const [col, row] = calculateLocation([move, squareClicked]);

            // no location when no moves
            if (move === 0)
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button> &nbsp;
                    </li>
                )
            else
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button> &nbsp;
                        <label htmlFor="location">{col}, {row}</label>
                    </li>
                );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game