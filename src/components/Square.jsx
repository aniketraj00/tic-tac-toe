import './Square.css'

let Square = ({value, onClick, position, winningSeq}) => {
    const animateSquareClassName = (() => {
        if(winningSeq !== -1 && winningSeq.indexOf(position) !== -1) return 'square-animate'
        return ''
    })()
    return (
        <button 
            className={`square ${value === 'X' ? 'text-green-dark' : 'text-red-dark'}`} 
            onClick={onClick}
        ><span className={animateSquareClassName}>{value}</span></button>
    )
}

export default Square;