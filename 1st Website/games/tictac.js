let boxes = document.querySelectorAll('.Boxes');
let reset = document.querySelector('.rst-btn');
// let winnername = document.querySelector('.winnername');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let counter = 0;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

let playX = true;

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// function dispalywinner(name){
//   msg.innerText = `Congratulations, Winner is ${name}`;
// }

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const resetgame = () => {
  playX = true;
  counter = 0;
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
  msg.innerText = "";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => 
    {
      if (box.innerText === "") {
        // console.log("clicked")
        // ;
        if (playX) {
            box.innerText = "X";
            playX = false;
        } else {
            box.innerText = "O";
            playX = true;
        }
        box.disabled = true;
        counter++;
        
        let gameWon = checkWinner();
        
        if (counter === 9 && !gameWon) {
          msg.innerText = "It's a draw!";
        }
      }
    });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  // dispalywinner(pos1Val);
  return false;
};  

reset.addEventListener("click", resetgame);