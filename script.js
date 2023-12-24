//  simple tic tac toe which will improve as time goes on into the best tic tac toe on the web!
const game_cells = document.querySelectorAll(".game-cell");
const reset_btn = document.querySelector("#reset-btn");
const status_msg = document.querySelector("#status");

let currentPlayer = "X";

let win_conditions = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 

    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 

    [0, 4, 8],
    [2, 4, 6]

];


// placeholders
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;


window.addEventListener("load", (e) => {
    running = true;
    game_cells.forEach((cell) => {
        cell.addEventListener("click", updateCellnPlayer);
    });
    reset_btn.addEventListener("click", restartGame);
    status_msg.textContent = `${currentPlayer}'s turn.`;

    function updateCellnPlayer() {

        const cell_index = this.getAttribute("cell-idx");
    
        if (options[cell_index] != "" || !running) {
            return;
        }
    
        options[cell_index] = currentPlayer;
    
        this.textContent = currentPlayer;

        checkwinner();
    }


    function checkwinner() {
        let roundWon = false;

        // iterating through the win conditons

        for (i = 0; i < win_conditions.length; i++) {
            const condition = win_conditions[i];
            const checkA = options[condition[0]];
            const checkB = options[condition[1]];
            const checkC = options[condition[2]];


            if (checkA == "" || checkB == "" || checkC == "") {
                continue;
            }

            if (checkA == checkB && checkB == checkC) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            status_msg.textContent = `${currentPlayer} WON.`;
            running = false;
        }
        else if (!options.includes("")){
            // no empty spaces
            status_msg.textContent = "DRAW.";
            running = false;
        }
        else {
            Switchplayer();
        }
    }

    function Switchplayer() {
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        status_msg.textContent = `${currentPlayer}'s turn.`;
    }
    
    function restartGame() {
        currentPlayer = "X";
        status_msg.textContent = `${currentPlayer}'s turn.`;
        options = ["", "", "", "", "", "", "", "", ""];
        game_cells.forEach((cell) => {
            cell.textContent = "";
        });
        running = true;
    }
});