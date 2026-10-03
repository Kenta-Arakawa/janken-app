console.log("読み込めた！");

const choices = ["グー", "チョキ", "パー"];
const pcChoice = choices[Math.floor(Math.random() * choices.length)];

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
    } else if ((user === "グー" && pc === "チョキ") || (user === "チョキ" && pc === "パー") || (user === "パー" && pc === "グー")) {
        console.log("あなたの勝ち！");
        document.getElementById("result").textContent = "あなたの勝ち！";
    } else {
        console.log("あなたの負け！");
        document.getElementById("result").textContent = "あなたの負け！";
    }
}