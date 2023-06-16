export function calculateWinningSeq (board) {
    const rows = Math.floor(Math.sqrt(board.length))
    if(rows ** 2 !== board.length) return -1
    let winningCombination = {
        row: [],
        column: [],
        diag: []
    };

    for(let i = 0; i < rows; i++) {
        //Check along the rows
        winningCombination.row.push(i * rows);
        for(let j = 1; j < rows; j++) {
            const lastEl = board[winningCombination['row'][winningCombination['row'].length - 1]]
            if(lastEl && lastEl === board[i * rows + j]) {
                winningCombination.row.push(i * rows + j)
            } else {
                winningCombination.row = []
                break
            }
        }
        if(winningCombination.row.length !== 0) return winningCombination.row

        //Check along the columns
        winningCombination.column.push(i);
        for(let j = 1; j < rows; j++) {
            const lastEl = board[winningCombination['column'][winningCombination['column'].length - 1]]
            if(lastEl && lastEl === board[i + j * rows]) {
                winningCombination.column.push(i + j * rows)
            } else {
                winningCombination.column = []
                break
            }
        }
        if(winningCombination.column.length !== 0) return winningCombination.column
    }

    //Check along the primary diagonal
    winningCombination.diag.push(0);
    for(let i = rows + 1; i < board.length; i = i + (rows + 1)) {
        const lastEl = board[winningCombination['diag'][winningCombination['diag'].length - 1]]
        if(lastEl && lastEl === board[i]) {
            winningCombination.diag.push(i)
        } else {
            winningCombination.diag = []
            break
        }
    }
    if(winningCombination.diag.length !== 0) return winningCombination.diag

    //Check along the secondary diagonal
    const offset = rows - 1
    winningCombination.diag.push(offset)
    for(let i = 2 * offset; i < (board.length - offset); i += offset) {
        const lastEl = board[winningCombination['diag'][winningCombination['diag'].length - 1]]
        if(lastEl && lastEl === board[i]) {
            winningCombination.diag.push(i)
        } else {
            winningCombination.diag = []
            break
        }
    }
    if(winningCombination.diag.length !== 0) return winningCombination.diag
    
    return -1
}