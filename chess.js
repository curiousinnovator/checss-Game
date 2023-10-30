const gameboard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")

const width = 8;
let playerGo = "black"
playerDisplay.textContent = "black"

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

     
     //square.classList.add('blue')
     square.innerHTML = startPieces;
     square.firstChild?.setAttribute('draggable', true)
     square.setAttribute('square-id',i)

     const row = Math.floor((63 - i )/8)+1
     if(row %2== 0){
        square.classList.add(i%2==0? "blue": "white")
     } else{
        square.classList.add(i%2==0? "white": "blue")
     }
     if(i <= 15){
        square.firstChild.firstChild.classList.add("black")
    }

    if(i >= 48){
       square.firstChild.firstChild.classList.add("white")
    }
     
     
     gameboard.append(square)


    })

}
createBoard()


const allSquares = document.querySelectorAll("#gameboard .square")
allSquares.forEach(square => {
    square.addEventListener("dragstart", dragStart)
    square.addEventListener("dragover",dragOver)
    square.addEventListener("drop" ,dragOver)
})
  
let startPositionId;
let draggedElement;

function dragStart(e){
    startPositionId = console.log(e.target.parentNode.getAttribute("square-id"))
     draggedElement = e.target;
}

function dragOver(e){
    e.preventDefault()
}

function dragDrop(e){
 e.stopPropagation()
   //console.log("playerGO",playerGo)
   
  //console.log("e.target", e.target)
  const correctGo = draggedElement.firstChild.classList.contains(playerGo)
 const taken = e.target.classList.contains("pieces")
 const valid = checkIfValid(e.target)

 const opponentGO = playerGo === "white" ? "black" :"white"
 //console.log("opponentGO", opponentGO)
 const takenByOpponent = e.target.firstChild?.classList.contains(opponentGO)

 if(correctGO){
    // must check this first
    if(takenByOpponent && valid){
        e.target.parentNode.append(draggedElement)
        e.target.remove()
        changePlayer()
        return
    }
    // then check this
    if(taken && !takenByOpponent){
        infoDisplay.textContent = "you cannot go here!"
        setTimeout( () => infoDisplay.textContent = "",2000)
        return 
    }
    if(valid){
        e.target.append(draggedElement)
        changePlayer()
        return 
    }

 }
 //e.target.parentNode.append(draggedElement)
 //e.target.remove()

 changePlayer()
}




function checkIfValid(target){
 console.log(target)
 const targetId = Number(target.getAttribute("sqaure-id")) || Number(target.parentNode.getAttribute("square-id"))
 const  startId = Number(startPositionId)
 const piece = draggedElement.id
 console.log("targetId", targetId)
 console.log("startId", startId)
 console.log("piece", piece)


 switch(piece){
    case "pawn" :
        const starterRow = [ 8,9,10,111,12,13,14,15]
        if(starterRow.includes(startId) && startId + width * 2 === targetId
        || startId + width === targetId 
        || startId + width -1 === targetId
        )
        {
            return true
        }
 }
}

function changePlayer(){
    if(playerGo === "black"){
        playerGo= "white"
        playerDisplay.textContent = "white"
    }else{
        revetId()
        playerGo  ="black"
        playerDisplay.textContent = "black"
    }
}

function reverseIds(){
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => 
    square.setAttribute('square-id', (width * width -1) -i ))
}

// function reverseIds(){
//     const allSquares = document.querySelectorAll('.square');
//     allSquares.forEach((eachBoardSquare, index)=>{
//     eachBoardSquare.setAttribute("square-id", ());
//     });
// }

function revetId(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute("square-id",i))
}