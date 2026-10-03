# じゃんけんアプリ 開発議事録

後から手順を見返すための記録。ステップごとに追記していく。

## 決定事項

- **形**: ブラウザだけで動くシンプルなWebページ。あとでサーバーやDBを追加する
- **言語**: HTML / CSS / JavaScript
- **環境**: VSCode / Chrome / Git
- **スコープ(第1版)**: ユーザーがボタンでグー・チョキ・パーを選ぶ → PCがランダムに手を出す
- **進め方**: まずヒントだけ出す。「答えを教えて」と言ったら説明付きの完成コードを提示する
- **粒度**: 1回のやりとりで進めるのは1つの小さな作業だけ(スモールステップ)

## ロードマップ

| ステップ | 内容 | 状態 |
|---|---|---|
| Step 1 | Gitの初期設定とリポジトリ作成 | 完了 |
| Step 2 | HTMLで画面の骨組みを作る | 完了 |
| Step 3 | JavaScriptでじゃんけんのロジックを実装 | 完了 |
| Step 4 | CSSで見た目を整える | 未着手 |
| Step 5 | 動作確認、コミット | 未着手 |
| Step 6 | (発展) GitHub公開、サーバーやDBの追加 | 未着手 |

## 最終的なファイル構成

```
janken-app/
├── index.html   画面の構造
├── style.css    見た目
├── script.js    動き(じゃんけんのロジック)
└── NOTES.md     この議事録
```

---

## Step 1: Gitのセットアップ

### やったこと

VSCodeのターミナル(`Ctrl + @`)で実行する。

```bash
cd C:\Users\Dell14\projects\janken-app
git init
git config user.name "あなたの名前"
git config user.email "メールアドレス"
```

### 学んだこと

- `git init`: このフォルダを履歴管理の対象にする(`.git` フォルダができる)
- `git config`: コミットに残る作者情報を設定する。`user.name` と `user.email` はこのリポジトリだけに効く

### 確認事項

- 空のフォルダに `index.html` / `style.css` / `script.js` を作成する

### 状態

- [x] `git init` 実行
- [x] `git config` 実行
- [x] 3ファイル作成

---

## Step 2: HTMLで画面の骨組みを作る

### やったこと

1. `<h1>` で見出しを表示し、Chromeで `index.html` を開いて確認
2. HTMLの骨組み(`<!DOCTYPE html>` / `<head>` / `<body>`)を用意。`<meta charset="UTF-8">`、`<title>`、`lang="ja"` を設定
3. `<button>` でグー・チョキ・パーの3ボタンを配置
4. 結果表示用の `<p>` を3行作り、中に空の `<span>` を置いて `id` を付けた

### 完成コード(body部分)

```html
<h1>じゃんけんアプリ</h1>
<button>グー</button>
<button>チョキ</button>
<button>パー</button>

<p>あなたの手：<span id="user_hand"></span></p>
<p>コンピュータの手：<span id="pc_hand"></span></p>
<p>結果：<span id="result"></span></p>
```

### 学んだこと

- HTMLは `<タグ>中身</タグ>` の形で書く
- `<meta charset="UTF-8">` がないと日本語が文字化けすることがある
- `<title>` はブラウザのタブに表示される
- `id` は、JavaScriptが「どの場所か」を見つけるための目印。ページ内で重複させない
- `<span>` は文字を入れるための小さな入れ物(見た目は変わらない)
- このアプリのid: `user_hand` / `pc_hand` / `result`

---

## Step 3: JavaScriptでじゃんけんのロジックを実装

※ 進行の都合でCSSより先にJavaScriptを実施した。ロードマップ上はStep 3=JS、Step 4=CSSに入れ替え。

### やったこと

1. `<script src="script.js"></script>` を `</body>` の直前に置いて読み込み、`console.log` で確認
2. ボタンに `onclick="playGame('グー')"` を設定し、押した手を引数で渡した
3. `document.getElementById("user_hand").textContent = str;` で押した手を画面に表示
4. PCの手を `Math.floor(Math.random() * choices.length)` でランダムに選んで表示
5. `judge(user, pc)` で `if / else if / else` により勝ち・負け・あいこを判定し表示

### 完成コード(script.js)

```js
const choices = ["グー", "チョキ", "パー"];

function playGame(str){
    document.getElementById("user_hand").textContent = str;
    pcHand(choices);
    judge(str, document.getElementById("pc_hand").textContent);
}

function pcHand(choices){
    const pcChoice = choices[Math.floor(Math.random() * choices.length)];
    document.getElementById("pc_hand").textContent = pcChoice;
}

function judge(user, pc){
    if (user === pc) {
        document.getElementById("result").textContent = "あいこ！";
    } else if ((user === "グー" && pc === "チョキ") || (user === "チョキ" && pc === "パー") || (user === "パー" && pc === "グー")) {
        document.getElementById("result").textContent = "あなたの勝ち！";
    } else {
        document.getElementById("result").textContent = "あなたの負け！";
    }
}
```

### 学んだこと

- `document.getElementById("id")` は、id を目印にページの部品を取り出す。`.textContent` で中の文字を書き換えられる
- `function 名前(引数) { ... }` で処理をまとめ、`onclick` から呼べる
- 配列 `[...]` は番号(0始まり)で要素を取り出す。`.length` は要素数
- `Math.random()` は0以上1未満の小数。`Math.floor` で切り捨てて整数にする
- 比較は `===`、かつは `&&`、または は `||`
- 改善の余地: `pcHand` が手を `return` で返す形にすると、画面から読み戻さずに済む
