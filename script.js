function main(){
    const board = document.body.querySelector("#board");
    const score = document.body.querySelector("#score");
    let boolTurn;

    let table;
    let allButtons; 

    addEventListeners(); 
    
    function buttonClickHandler(event) {
        const [i,j] = event.target.className.split('-');
        table[i][j] = boolTurn ? 'x':'o';
        event.target.innerHTML = table[i][j];

        event.target.disabled = true;
        event.target.style.pointerEvents = 'none';
        event.target.removeEventListener("click", buttonClickHandler);

        const gameEnd = checker() || dotCount();
        if(gameEnd){
            console.log("Game is over!");
            addScore();
            clearAll();
            addEventListeners();
            return;
        }
        boolTurn = !boolTurn;
        console.table(table);
    }

    function checker() {
        const char = boolTurn ? 'x':'o';

        let mainDiag = 0;
        let secondDiag = 0;

        for(let i = 0; i < 3; i++){
            let row=0
            let col = 0;

            for(let j = 0; j < 3; j++){
                if(table[i][j] === char){
                    row++;
                }
                if (table[j][i] === char){
                    col++;
                }
            }
            if(row === 3 || col === 3) return true;
            
            if(table[i][i] === char) mainDiag++;
            if(table[i][2-i] === char) secondDiag++;
        }
        return (mainDiag === 3 || secondDiag === 3);
    }

    function fillTable(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                table[i][j] = '.';
            }
        }
    }

    function dotCount(){
        let count = 0;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++)
                if(table[i][j]==='.')
                    count++;
        }
        return count === 0;
    }

    function clearAll(){
        allButtons.forEach(button => {
        button.innerHTML = '';
        button.disabled = false;
        button.removeEventListener("click", buttonClickHandler)}); 
    }

    function addEventListeners(){
        allButtons = board.querySelectorAll("button"); 
        allButtons.forEach(button => {
            button.addEventListener("click", buttonClickHandler)
            button.style.pointerEvents = 'auto';});

        table = [[],[],[]];
        fillTable();

        boolTurn = true;
    }

    function addScore(){
        const leftDots = dotCount();
        const winner = checker();
        let win;

        if(leftDots && winner === false)
            win = score.querySelector(".ties");
         
        else{
            const tagOfWinner = boolTurn ? ".playerScore" : ".computerScore";
            win = score.querySelector(tagOfWinner);
        }

        win.innerHTML = Number(win.innerHTML) + 1;
    }
};
main();
