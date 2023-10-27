const gameboard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")

const width = 8;

const startPieces = [
    rook,knight,bishop,queen,king,bishop,knight,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook,knight,bishop,queen,king,bishop,knight,rook
    
    

]

function createBoard(){
    startPieces.forEach((startPieces,i)=> {
     const square =  document.createElement('div');
     square.classList.add('square');

     square.setAttribute('square-id',i)
     square.classList.add('brown')
     square.innerHTML = startPieces;
     gameboard.append(square)


    })

}
createBoard()