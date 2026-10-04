console.log("読み込めた！");

const choices = ["グー", "チョキ", "パー"];
const pcChoice = choices[Math.floor(Math.random() * choices.length)];
let userWinCount = 0;
let userLoseCount = 0;
let userDrawCount = 0;
let totalWinCount = Number(localStorage.getItem("userWinCount"));
let resultForDB = "";
document.getElementById("totalWins").textContent = totalWinCount;

function playGame(str){
    console.log(str+"を選んだ！");
    document.getElementById("user_hand").textContent = str;
    const pcH = pcHand(choices);
    judge(str, pcH);
}

function pcHand(choices){
    const pcChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log(pcChoice+"が出された！");
    document.getElementById("pc_hand").textContent = pcChoice;
    return pcChoice;
}

function judge(user, pc){
    if (user === pc) {
        console.log("あいこ！");
        document.getElementById("result").textContent = "あいこ！";
        userDrawCount++;
        document.getElementById("drawCount").textContent = userDrawCount;
    } else if ((user === "グー" && pc === "チョキ") || (user === "チョキ" && pc === "パー") || (user === "パー" && pc === "グー")) {
        console.log("あなたの勝ち！");
        document.getElementById("result").textContent = "あなたの勝ち！";
        userWinCount++;
        document.getElementById("winCount").textContent = userWinCount;
        totalWinCount++;
        document.getElementById("totalWins").textContent = totalWinCount;
        localStorage.setItem("userWinCount", totalWinCount);
    } else {
        console.log("あなたの負け！");
        document.getElementById("result").textContent = "あなたの負け！";
        userLoseCount++;
        document.getElementById("loseCount").textContent = userLoseCount;
    }
    if (document.getElementById("result").textContent === "あなたの勝ち！") {
        resultForDB = "勝ち";
    } else if (document.getElementById("result").textContent === "あなたの負け！") {
        resultForDB = "負け";
    } else {
        resultForDB = "引き分け";
    }
    saveGameResult(user, pc, resultForDB);
}

function resetGame() {
    userWinCount = 0;
    userLoseCount = 0;
    userDrawCount = 0;
    document.getElementById("winCount").textContent = userWinCount;
    document.getElementById("loseCount").textContent = userLoseCount;
    document.getElementById("drawCount").textContent = userDrawCount;
    document.getElementById("user_hand").textContent = "";
    document.getElementById("pc_hand").textContent = "";
    document.getElementById("result").textContent = "";
    console.log("ゲームをリセットしました。");
}

function resetTotalWins() {
    if (confirm("本当に総勝利数をリセットしますか？")) {
        totalWinCount = 0;
        document.getElementById("totalWins").textContent = totalWinCount;
        localStorage.setItem("userWinCount", totalWinCount);
        console.log("総勝利数をリセットしました。");
    }
}


function saveGameResult(user_hand, pc_hand, result) {
    fetch("http://localhost:3000/games",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_hand: user_hand, pc_hand: pc_hand, result: result })
    });
}