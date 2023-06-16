import { useState } from 'react'
import Board from './components/Board'
import Alert from './components/Alert'
import { calculateWinningSeq } from './utils'
import './App.css'

const SQUARE_BOARD_DIMENS = 9

const App = () => {
  const [isAlertVisible, setAlertVisibility] = useState(false)
  const [alertMsg, setAlertMsg] = useState('This is an alert message')
  const [squares, setSquares] = useState(Array(SQUARE_BOARD_DIMENS).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)
  const winningSeq = calculateWinningSeq(squares)
  const winner = (winningSeq => {
    if(winningSeq === -1) return null
    return squares[winningSeq[0]]
  })(winningSeq)
  const wasATie = (() => {
    return (!winner && squares.reduce((prev, cur) => {
      return (prev && (cur === 'X' || cur === 'O'))
    }, true))
  })()
  const gameStatusMsg = (() => {
    if(winner) return (
      <>Player 
        <span 
          className={winner === 'X' ? 'text-green' : 'text-red'}
        > {`'${winner}'`}
        </span> Won!
      </>
    )
    else if(wasATie) return (<>It Was A Tie</>)
    else return (
      <>Player 
        <span 
          className={isXTurn ? 'text-green' : 'text-red'}
        > {`'${isXTurn ? 'X': 'O'}'`}
        </span> Turn
      </>
    )
  })()
  const handleGameReset = () => {
    setSquares(() => {
      return Array(SQUARE_BOARD_DIMENS).fill(null)
    })

    setIsXTurn(true)
  }
  const handleSquareClick = (clickedPosition) => {
    //Check if there is a winner or was a tie
    if(winner || wasATie) {
      setAlertMsg('Game Over! Start new game.')
      setAlertVisibility(true)
      return
    }

    //Check if the target square is empty
    if(squares[clickedPosition]) {
      setAlertMsg('That position is already filled!')
      setAlertVisibility(true)
      return
    }
  
    //Update board with the current player move
    setSquares(prevSquares => {
        return prevSquares.map((squareVal, pos) => {
            if(clickedPosition === pos) return isXTurn ? 'X' : 'O'
            return squareVal;
        })
    })

    //Update the player
    setIsXTurn(!isXTurn);   
  }

  return (
    <>
      <div className='circle-1'></div>
      <div className='circle-2'></div>
      <div className='app'>
        <h1>Tic <span style={{ 
          backgroundColor: '#f70a61', 
          color: '#333',
          padding: '0.2em'
        }}>Tac</span> Toe</h1>
        <h2>{gameStatusMsg}</h2>
        <Board 
          squares={squares} 
          onSquareClick={handleSquareClick}
          winningSeq={winningSeq}
        />
        <button 
          className='btn-reset' 
          onClick={handleGameReset}>Reset Game
        </button>
      </div>
      <Alert 
        onClose={() => { setAlertVisibility(false) }}
        message={alertMsg}
        isVisible={isAlertVisible}
      />
    </>
  )
}

export default App
