console.log("読み込めた！");

const choices = ["グー", "チョキ", "パー"];
const pcChoice = choices[Math.floor(Math.random() * choices.length)];
let userWinCount = 0;
let userLoseCount = 0;
let userDrawCount = 0;
let totalWinCount = Number(localStorage.getItem("userWinCount"));
let resultForDB = "";
const API_BASE_URL = location.hostname === "" || location.hostname === "localhost" ? "http://localhost:3000" : "https://example.com"; // 本番環境のURLに置き換える
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
    fetch(API_BASE_URL + "/games",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_hand: user_hand, pc_hand: pc_hand, result: result })
    })
    .then(() => loadHistory())
    .catch(error => console.error("戦績の保存に失敗しました:", error));
}

function loadHistory(){
    fetch(API_BASE_URL + "/games", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(games => {
        const list = document.getElementById("historyList");
        list.innerHTML = ""; // <ul>の中身を空にする
        games.forEach(game => {
            const li = document.createElement("li"); // 配列の中身をひとつひとつgameという名前で取り出して{}の中を繰り返す
            li.textContent = `${new Date(game.played_at).toLocaleString("ja-JP")} - あなた: ${game.user_hand}, PC: ${game.pc_hand}, 結果: ${game.result}`;
            list.appendChild(li);
        });
    })
    .catch(error => {
        console.error("履歴の取得に失敗しました:", error);
        document.getElementById("historyList").innerHTML = "<li>履歴の取得に失敗しました</li>";
    });
}

loadHistory(); // ページ読み込み時に履歴を表示する