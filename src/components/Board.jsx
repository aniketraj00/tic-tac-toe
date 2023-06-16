import Square from './Square'
import './Board.css'


const Board = ({squares, onSquareClick, winningSeq}) => {
    //Generate single square component
    const renderSquare = (position) => {
        return (
            <Square 
                value={squares[position]} 
                position={position}
                winningSeq={winningSeq}
                onClick={() => {onSquareClick(position)}}
                key={position}
            />
        )
    }

    //Generates nxn square board using the board array of length = n*n
    const renderSquareBoard = () => {
        const columns = Math.floor(Math.sqrt(squares.length))
        const board = []
        if(columns * columns == squares.length) {
            for(let i = 0; i < columns; i++) {
                let boardRow = []; 
                for(let j = 0; j < columns; j++) {
                    boardRow.push(renderSquare(i * columns + j))
                }
                board.push(<div className='board-row' key={`i-${i}`}>{boardRow}</div>)
            }
            return board
        } else {
            return (
                <div>Error occured while generating game board!</div>
            )
        }
    }

    return (
        <div className='board'>
            {renderSquareBoard()}
        </div>
    )
}   

export default Board