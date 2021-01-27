const numEnd = 30;
const numStep = 3;
const BestNum = [2, 6, 10, 14, 18, 22, 26, 30];
var currentNum, winner;
var firstPlayer;

var mess1 = document.getElementById("mess1"); // ==> Text only
var mess2 = document.getElementById("mess2"); // ==> Number only
var mess3 = document.getElementById("mess3"); // ==> Text only
var mess4 = document.getElementById("mess4"); // ==> Button only

initialGame();
function initialGame() {
    firstPlayer = "I";
    ShowMessage("initial");
}

async function NumberSelect(OpponentNumber) {
    var Status = await CheckFinish(OpponentNumber, "You");
    if (!Status) {
        ShowMessage("stop");
    } else {
        var Choose;
        if (BestNum.indexOf(OpponentNumber) === -1) {
            for (let i = 1; i <= numStep; i++) {
                if (BestNum.indexOf(OpponentNumber + i) === -1) {
                } else {
                    Choose = OpponentNumber + i;
                    break;
                }
            }
        } else {
            var j = Math.ceil(Math.random() * numStep);
            Choose = OpponentNumber + j;
        }

        Status = await CheckFinish(Choose, "I");
        if (!Status) {
            ShowMessage("stop");
        } else {
            currentNum = Choose;
            ShowMessage("");
        }
    }
}

function OpponentOptions() {
    var Options = [];
    for (let i = 1; i <= numStep; i++) {
        if (currentNum + i <= numEnd) {
            Options.push(currentNum + i);
        } else {
            break;
        }
    }
    return Options;
}

function CheckFinish(Number, Player) {
    if (Number >= numEnd) {
        winner = Player;
        if (Player === "I") {
            firstPlayer = "You";
        } else {
            firstPlayer = "I";
        }
        return false;
    } else {
        return true;
    }
}

function userSelect(Message) {
    switch (Message) {
        case "How to play":
            ShowMessage("tutorial");
            break;
        case "OK, let's start":
            ShowMessage("start");
            break;
        default:
            NumberSelect(Message);
            break;
    }
}

async function ShowMessage(option) {
    RemoveCurrentMessage();
    var P1, P2, P3, P4;
    switch (option) {
        case "initial":
            P1 =
                "Hi my fiend, let's play a small game of number summing. Final number will be " +
                numEnd +
                ", and step will be " +
                numStep +
                ".";
            P2 = "";
            P3 = "";
            P4 = ["OK, let's start", "How to play"];
            break;
        case "tutorial":
            P1 =
                "We'll take turn to call a number, for example I call [1], then you'll call a number, which must be smaller than my number plus the step number. For example, if step = 3, so you have three options to call [2, 3, 4]. Then my next number will be based on your choice, plus step 3. Who call the final number, for example [30], will be the one who win.";
            P2 = "";
            P3 = "";
            P4 = ["OK, let's start"];
            break;
        case "start":
            winner = "";
            if (firstPlayer === "I") {
                NumberSelect(0);
            } else {
                firstPlayer === "You";
                currentNum = 0;
                P1 = "You first!";
                P2 = "";
                P3 = "";
                P4 = await OpponentOptions();
            }
            break;
        case "stop":
            if (winner === "I") {
                P1 = "Yeah, my number is ";
                P2 = currentNum;
            } else {
                P1 = "Congratulation, you win! Let's play another game. ";
                P2 = "";
            }
            P3 = "";
            P4 = ["OK, let's start", "How to play"];
            break;
        default:
            P1 = "My number is ";
            P2 = currentNum;
            P3 = ", now your turn.";
            P4 = await OpponentOptions();
            break;
    }

    mess1.textContent = P1;
    mess2.textContent = P2;
    mess3.textContent = P3;
    for (let i = 0; i < P4.length; i++) {
        CreateButton(P4[i]);
    }
}

function RemoveCurrentMessage() {
    mess1.innerHTML = "";
    mess2.innerHTML = "";
    mess3.innerHTML = "";
    mess4.innerHTML = "";
}

function CreateButton(content) {
    // 1. Create the button
    var button = document.createElement("button");
    button.innerHTML = content;

    // 2. Append somewhere
    document.getElementById("mess4").appendChild(button);

    // 3. Add event handler
    button.addEventListener("click", () => {
        userSelect(content);
    });
}
