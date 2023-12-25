//  simple tic tac toe which will improve as time goes on into the best tic tac toe on the web!
const game_cells = document.querySelectorAll(".game-cell");
const reset_btn = document.querySelector("#reset-btn");
const status_msg = document.querySelector("#status");
const win_conditions = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    // vertical
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    // diagonal
    [0, 4, 8],
    [2, 4, 6]
];
let currentPlayer = "X";
let options = ["", "", "", "", "", "", "", "", ""];
let isrunning = false;

function Status(message) {
    status_msg.textContent = message;
};

window.addEventListener("load", () => {

    isrunning = true;

    game_cells.forEach((cell) => {
        cell.addEventListener("click", updateCellnPlayer);
    });
    reset_btn.addEventListener("click", restartGame);
    Status(`${currentPlayer}'s turn.`);

    function updateCellnPlayer() {

        const cell_index = this.getAttribute("cell-idx");
    
        if (options[cell_index] != "" || !isrunning) {
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
                    if ((i==0 || i==1 || i==2) || (i==3 || i==4|| i==5) || (i == 6 || i == 7)) {
                        game_cells.forEach((cell) => {
                            const idx = cell.getAttribute("cell-idx");
                            if (idx == win_conditions[i][0] || idx == win_conditions[i][1] || idx == win_conditions[i][2]) 
                            {
                                // if X won, color light blue.
                                // if O won, color light red.
                                cell.style.backgroundColor = (checkA == "X") ? "lightskyblue": "lightcoral";
                            }
                        });
                    }
                break;
            }
        }

        if (roundWon) {
            Status(`${currentPlayer} WON.`);
            isrunning = false;
        }
        else if (!options.includes("")){
            // no empty spaces
            Status("DRAW.");
            isrunning = false;
        }
        else {
            Switchplayer();
        }
    }

    function Switchplayer() {
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        Status(`${currentPlayer}'s turn.`);
    }
    
    function restartGame() {
        currentPlayer = "X";
        Status(`${currentPlayer}'s turn.`);

        options = ["", "", "", "", "", "", "", "", ""];
        game_cells.forEach((cell) => {
            cell.textContent = "";
            cell.style.backgroundColor = "white";
        });
        isrunning = true;
    }
});