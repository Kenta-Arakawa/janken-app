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
| Step 4 | CSSで見た目を整える | 完了 |
| Step 5 | 動作確認、コミット | 完了 |
| Step 6 | GitHub公開(Pages) | 完了 |
| Step 7 | (発展) 機能追加(勝敗カウント、リセット)、記録の保存(localStorage) | 完了 |
| Step 8 | (発展) サーバーやDBの追加 | 進行中(Expressサーバー起動済) |

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

---

## Step 3.5: 最初のコミット

- `git add .` → `git commit -m "メッセージ"` で保存。`git log --oneline` で履歴を確認
- コミットは、その時点の状態を残すセーブポイント

---

## Step 4: CSSで見た目を整える

### やったこと

1. `<head>` の中に `<link rel="stylesheet" href="style.css">` を書いて読み込み、見出しの色が変わることで確認
2. `button` の見た目(背景色、文字色、文字サイズ、枠線、余白、カーソル)を指定
3. `margin` でボタン同士の間隔を空けた
4. `body` に `text-align: center;` を指定して全体を中央寄せ

### 完成コード(style.css)

```css
h1{
    color: blue;
    font-size: 24px;
    padding: 10px 20px;
}

button{
    background-color: green;
    color: white;
    font-size: 20px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    margin: 10px 10px;
}

body{
    text-align: center;
}
```

### 学んだこと

- CSSは `対象 { 項目: 値; }` の形で書く。対象を間違えると別の部品が変わる(`h1` と `button` など)
- `padding` は枠線の内側の余白、`margin` は外側の余白
- 値が2つなら「上下 左右」の順。1つなら全方向に同じ値
- `px` は画面上の長さの単位
- `body` に指定した `text-align` は、中の部品にまとめて効く
- CSSの読み込みは `<head>` の中、JSの読み込みは `</body>` の直前

---

## Step 5: 動作確認とテスト観点の考え方

### テスト観点の出し方(3ステップ)

1. **仕様を「入力・処理・出力」に分解する**
   - 入力: ボタン押下(グー・チョキ・パー)
   - 処理: PCの手をランダムに選ぶ / 勝敗を判定する
   - 出力: あなたの手 / PCの手 / 結果の表示
2. **切り口を当てはめる**

   | 切り口 | 問い | 例 |
   |---|---|---|
   | 正常系 | 想定どおりに使うと? | 各ボタンで3項目が表示される |
   | 組み合わせ | 入力の全パターンは? | 自分3通り × PC 3通り = 9通り |
   | 繰り返し | 連続で使うと? | 連打しても表示が更新される |
   | 異常系 | 想定外の操作は? | 素早い連打、リロード |
   | ランダム性 | 偏りはないか? | 20回押して3種類が出る |
   | 表示 | 見た目は正しいか? | 文字化けなし、レイアウト崩れなし |
   | 環境 | 違う環境でも動くか? | スマホ幅、別ブラウザ |
3. **期待結果を決めて表にする**(「何が起きれば合格か」を事前に書く)

### コツ

- 条件分岐のあるコードは、分岐の数だけテストが必要。まず9通りの組み合わせ表を作る
- ランダムは再現が難しい。将来はPCの手を固定してテストする方法を学ぶ
- `if / else if / else` の各分岐を必ず通すテストを用意する

### 動作確認の結果

- 見た目、表示、あいこ・勝ち・負けの判定ともに問題なし

---

## Step 6: GitHubに公開する

### やったこと

1. 公開前に、コミット履歴のメールアドレスを GitHub の noreply アドレスに書き換えた
   - `git config user.email "<ID>+<ユーザー名>@users.noreply.github.com"`
   - `git rebase --root --exec "git commit --amend --reset-author --no-edit"`
   - 書き換え前の履歴は `backup-before-rewrite` ブランチに退避し、確認後に削除した(本物のメールが残っているため)
2. GitHub で空のリポジトリ(Public、README等なし)を作成
3. `git remote add origin <URL>` で送り先を登録
4. `git push -u origin master` で GitHub に送信

### 学んだこと

- 公開/非公開: リポジトリはいつでも切り替え可。ただし無料プランの GitHub Pages は Public のときだけ使える。一度公開すると、コピーされた分は取り消せない
- noreply アドレス: GitHub が用意する公開用の代わりのメールアドレス。コミットに記録されるのはこちらで、本物は表に出ない
- `git rebase`: 過去のコミットを作り直す。公開前だから安全にできる(公開後の書き換えは避ける)
- `fetch` は GitHub → 手元に取ってくる向き、`push` は手元 → GitHub に送る向き
- `origin` は送り先に付けるあだ名(慣習)。名前が違うとエラーになる(`git remote rename` で直せる)
- エラー `'origin' does not appear to be a git repository` は、その名前の送り先が登録されていないという意味。`git remote -v` で確認する

### GitHub Pages で Web 公開

- 公開URL: https://kenta-arakawa.github.io/janken-app/
- 設定: リポジトリの Settings → Pages → Source を「Deploy from a branch」、Branch を `master` / `/ (root)` にして Save
- 公開まで1〜2分かかる
- 以後、`master` に push すると、自動でサイトにも反映される

### 次の候補

- B. 機能追加(連勝数、戦績カウント、「もう一回」ボタンなど)
- C. サーバーとDB(戦績をサーバーに保存する)

---

## Step 7: 機能追加(勝ち数カウント)

### やったこと

1. HTMLに `<p>勝ち数：<span id="winCount">0</span></p>` を追加
2. `script.js` に `let userWinCount = 0;` を追加(後から値を変える変数は `let`)
3. `judge` の「勝ち」分岐で `userWinCount++;` し、画面に書き込んだ
4. 勝ったときだけ数が増え、負け・あいこでは増えないことを確認

### 躓いたところ(重要)

- `getElementById("...")` の名前と、HTMLの `id="..."` が一致しないと、部品が見つからず `null` エラーになる(`winCount` と `win_count` など)
- 直したら、**ファイルを保存してからブラウザをリロード**する
- エラーが出たら `F12` のコンソールで赤い文字を読む

### 学んだこと

- `const` は後から変えられない、`let` は変えられる
- `x++` は `x = x + 1` と同じ(1増やす)
- 状態(勝ち数)を覚えておくには、関数の外に変数を置く
- 関数が値を返すには `return` を使う。受け取る側は `const x = 関数();`

### 今後の課題

- 負け数、あいこ数のカウント
- リセットボタン
- 連勝数の表示

### 負け数・あいこ数のカウント

- 勝ち数と同じ3点セットを繰り返した
  1. HTMLに数字を入れる `<span id="...">` を追加
  2. `script.js` に `let` で数える変数を追加
  3. `judge` の該当の分岐で `++` して画面に書き込む
- 動作確認: 勝ち・負け・あいこで該当する数だけが増え、3つの合計が押した回数と一致することを確認
- 気づき: リロードすると数字が0に戻る(記録を保存していないため)。将来の課題

### リセットボタン

- HTMLに `<button onclick="resetGame()">リセット</button>` を追加
- `resetGame()` で、カウント用の変数を0に戻し、画面の数字・手・結果の表示も初期化した
- 「変数」と「画面表示」の両方を戻すのがポイント。変数だけ戻すと画面が古いまま、画面だけ戻すと次の1回目が前の続きの数になる
- 動作確認: リセット後に1から数え直されることを確認

---

## Step 8: 記録の保存(localStorage)

### localStorage とは

ブラウザの中に「名前と値のペア」を保存する小さな保管庫。リロードやブラウザを閉じても残る。

| 命令 | 意味 |
|---|---|
| `localStorage.setItem("名前", 値)` | 保存する |
| `localStorage.getItem("名前")` | 読み出す |
| `localStorage.removeItem("名前")` | 1つ消す |

### やったこと

1. コンソールで `setItem` / `getItem` を試し、リロード後も値が残ることを確認
2. 勝ったとき `localStorage.setItem("userWinCount", totalWinCount)` で累計勝ち数を保存
3. ページを開いたとき `Number(localStorage.getItem("userWinCount"))` で読み出し、画面に反映
4. 「今回の勝ち数」(保存しない)と「これまでの勝ち数」(保存する)を別の表示にした

### 学んだこと

- `localStorage` から読み出した値は**文字列**になる。数字として使うなら `Number()` で変換する
- 何も保存されていないとき `getItem` は `null` を返し、`Number(null)` は `0` になる
- 保存した値は、開発者ツールの Application タブ → Local Storage で確認できる(タブが隠れているときは「≫」を押す)
- 「今回だけの値」と「ずっと残す値」は、別の変数と別の表示に分けると整理しやすい
- 保存はブラウザごと。別のPCやスマホとは共有されない(それはサーバーとDBの役割)

### 累計の勝ち数のリセット

- 「累計をリセット」ボタンと `resetTotalWins()` を追加。変数・画面・保存値の3つを 0 に戻す
- 記録が消える操作なので、`if (confirm("...")) { ... }` で確認画面を挟んだ。`OK` で `true`、キャンセルで `false` が返る
- 保存範囲の決定: 累計を保存するのは勝ち数のみ。負け数・あいこ数はリロードで 0 に戻る仕様のままとした

---

## Step 8: サーバーとDBの追加(進行中)

### 方針

- サーバー: Node.js + Express(JavaScriptのまま書ける)
- DB: SQLite(ファイル1つで動く。学習向き)
- まずは手元のPC(`localhost`)だけで動かし、公開は動いてから別段階で扱う
- GitHub Pages は静的サイト専用で、サーバー側のプログラムを動かせない。画面はPagesのまま、サーバーとDBは別の置き場所を用意する想定

### Node.js とは

- ブラウザの外でJavaScriptを動かす実行環境。同じ言語でも、動く場所で使える命令が違う
  - ブラウザ: `document`、`localStorage` など(画面の操作)
  - Node.js: ファイルの読み書き、サーバーの起動、DBの操作など
- `npm` はNode.jsに付いてくるライブラリ管理ツール。Expressはサーバーを簡単に作るためのライブラリ

### やったこと

1. `server` フォルダを作り、`npm init -y` で `package.json`(プロジェクトの設計書)を作成
   - `npm init -y` は、npmをインストールするのではなく、`package.json` を作るコマンド。`-y` は質問に全部デフォルトで答える指定
2. `npm install express` で Express を導入(`node_modules` フォルダができ、`package.json` の `dependencies` に追記される)
3. `server/index.js` で Hello World サーバーを作成
   ```js
   const express = require('express');
   const app = express();
   app.get('/', (req,res) => { res.send('Hello World!') });
   app.listen(3000, () => { console.log('Server is running on port 3000') });
   ```
4. `node index.js` で起動し、`http://localhost:3000` で表示を確認。止めるのは `Ctrl + C`

### 学んだこと

- `require('express')`: ライブラリを取り込む
- `app.get('/', (req, res) => { ... })`: GETリクエストが来たときの動きを登録。`req` は依頼の情報、`res` は返事を作る道具
- `app.listen(3000, ...)`: 3000番ポートで待ち受け開始。ポートは1台のPCの中の窓口の番号
- GET は「情報をください」、POST は「情報を送ります」の種類のリクエスト(戦績の保存にPOSTを使う予定)

### 注意(コミット前にやること)

- `node_modules` はGitに入れない。`.gitignore` ファイルに `node_modules` と書いて除外する

### http と https(localhostでhttpを使う理由)

- `fetch("https://localhost:3000/")` は `ERR_SSL_PROTOCOL_ERROR` で失敗した。今のExpressサーバーはhttpのみ対応のため。正しくは `http://localhost:3000/`
- httpは通信が暗号化されない。他人の機器(Wi-Fi、プロバイダ)を経由すると盗み見・改ざんのリスクがある
- `localhost` は自分のPC自身を指す。通信がPCの外に出ないので、開発中はhttpで問題ない
- 公開するときはhttpsが必須。GitHub Pages(https)から http のサーバーへ通信すると、ブラウザが「混在コンテンツ」としてブロックする
- 多くのホスティングサービス(Render、Railwayなど)はhttpsを自動で用意してくれる。公開(デプロイ)の段階で改めて扱う

### CORS(画面とサーバーが別のオリジンのとき)

- **オリジン** = `http://` + ホスト名 + ポート番号。違うオリジンへの通信は、ブラウザがデフォルトで制限する
- `file:///` で開いた画面のオリジンは `null`。`http://localhost:3000` の画面からなら同じオリジンなので成功した
- エラー文の読み方
  - `blocked by CORS policy`: ブラウザが止めた
  - `No 'Access-Control-Allow-Origin' header`: サーバーの返事に許可の印がない
  - `ERR_FAILED 200 (OK)`: サーバーは正常に返事していた。止めたのはブラウザ
- 直すのは**サーバー側**。`npm install cors` → `app.use(cors());`
- **コードの順番が重要**: Expressは書かれた順に処理する。`app.use(cors())` は `app.get(...)` より**前**に書く。`require` も使う前に書く
- **サーバーのコードを変えたら、`Ctrl + C` で止めて `node index.js` で起動し直す**(保存しただけでは反映されない)
- `cors()` は全オリジンを許可する設定。公開時は `cors({ origin: "https://kenta-arakawa.github.io" })` のように絞る

### CORSは何を守る仕組みか

- 守る対象は「利用者のデータ」。悪いサイトの画面が、別のサイト(銀行など)のデータを、利用者の権限で勝手に読むことを防ぐ
- CORSは証明書ではない。許可の印は、サーバーの持ち主が自分のサーバーの返事に自由に書ける
- 悪意ある開発者が悪いサイトを作ること自体は、CORSでは防げない。それは、https の証明書、ブラウザの警告(セーフブラウジング)など、別の仕組みの担当
- 自分のサーバーで許可を書いても、他人のサーバーのデータは読めない。許可を書けるのは自分のサーバーの返事だけ

---

## 付録: これまで使ったコマンド一覧(自分用の辞書)

### 1. シェルの基本操作(PowerShell)

| コマンド | 意味 | 使った場面 |
|---|---|---|
| `cd フォルダ名` | フォルダに移動する | `cd server` でサーバー用フォルダへ移動 |
| `cd ..` | 1つ上のフォルダに戻る | `server` から `janken-app` へ戻る |
| `ls` / `dir` | 今いるフォルダの中身を表示する | ファイルがあるか確認 |
| `Ctrl + C` | 実行中のプログラムを止める | サーバーを止めて起動し直す |

- **今どこにいるかはプロンプトで確認する**(`PS C:\...\janken-app>` の部分)。相対パス `./db` は「今いるフォルダ」基準なので、場所が違うと `Cannot find module` になる
- PowerShell の `curl` は `Invoke-WebRequest` の別名。本物の curl は `curl.exe` と書く

### 2. Git(バージョン管理)

| コマンド | 意味 | 使った場面 |
|---|---|---|
| `git init` | このフォルダを履歴管理の対象にする | 最初のセットアップ |
| `git config user.name / user.email` | コミットに残る作者情報を設定する | noreplyアドレスの設定 |
| `git status` | 変更されたファイルを確認する | コミット前の確認 |
| `git add .` | 変更を保存対象(ステージ)に追加する | コミット前 |
| `git commit -m "メッセージ"` | 履歴として保存する(セーブポイント) | 機能ごと |
| `git log --oneline` | コミット履歴を1行ずつ表示する | 履歴の確認 |
| `git branch` | ブランチの一覧を表示する / 作る / 消す(`-d`) | バックアップブランチの作成、削除 |
| `git rebase --root --exec "..."` | 過去のコミットを作り直す | 作者メールの書き換え(公開前だけ) |
| `git remote add origin URL` | 送り先(GitHub)に名前を付けて登録する | 初回のGitHub接続 |
| `git remote -v` | 登録済みの送り先を表示する | `origin` の確認 |
| `git remote rename 旧 新` | 送り先の名前を変える | `janken` → `origin` |
| `git push -u origin master` | GitHubに送る(`-u` で次回から省略可) | 初回push。以降は `git push` |

### 3. npm(パッケージ管理)

| コマンド | 意味 | 使った場面 |
|---|---|---|
| `npm --version` | npmのバージョン確認 | 環境確認 |
| `npm init -y` | `package.json`(設計書)を作る。npm自体のインストールではない | `server` の初期化 |
| `npm install ライブラリ名` | ライブラリを導入する | `express`、`cors` |

### 4. Node.js(実行環境)

| コマンド | 意味 | 使った場面 |
|---|---|---|
| `node --version` | Node.jsのバージョン確認 | 環境確認 |
| `node ファイル名` | JavaScriptファイルを実行する | `node index.js`(サーバー起動)、`node db.js`(DB作成) |
| `node -e "コード"` | 1行のコードをその場で実行する | DBの中身の確認 |

- サーバーのコードを変えたら、`Ctrl + C` で止めて `node index.js` で起動し直す

### 5. HTTP通信の確認

| コマンド | 意味 | 使った場面 |
|---|---|---|
| `curl.exe -X POST URL -H "..." -d '...'` | POSTリクエストを送る。`-X` はメソッド、`-H` はヘッダー、`-d` は送るデータ | `/games` に戦績を送る |

- PowerShellでは、JSON内の `"` の前に `\` を付ける(`\"`)

### 補足

- 学ぶ順番の目安: シェルの基本 → Git → HTTP → SQL → npm / Node.js
- 全部覚えなくてよい。よく使う10個程度で、ほとんどの作業が回る

### SQLインジェクションと `?`(プレースホルダ)

- **SQLインジェクション**: 入力された文字が、データではなくSQLの命令として実行されてしまう攻撃
  - 危険な例: `"... VALUES ('" + user_hand + "')"` と文字をつなげると、`'); DROP TABLE games; --` のような入力でテーブルが消される
- **対策**: `db.prepare('INSERT ... VALUES (?)').run(値)` のように、命令と値を別々にDBへ渡す
  - `prepare`: 命令の形だけを先にDBに解釈させる(`?` の場所にはデータが入ると決まる)
  - `run(値)`: 後から値だけを渡す。どんな文字でも、ただのデータとして扱われる
- 基本ルール: 値をSQLの文字につなげず、必ず `?` に渡す

### DBの導入と、画面からの戦績保存

- 保存するデータは「1回ごとの履歴」(集計ではなく履歴を残すと、集計・連勝数などを後から計算できる)
- SQLite は Node.js v24 に標準で入っている(`require('node:sqlite')`)。DB全体がファイル1つ(`server/janken.db`)
- `server/db.js` で `CREATE TABLE IF NOT EXISTS games (...)` を実行(列: id / played_at / user_hand / pc_hand / result)
- `server/index.js` に `POST /games` を追加。`played_at` はサーバー側で付ける(画面から送ると偽れるため)
- 画面の `script.js` に `saveGameResult()` を追加し、`fetch` の POST で送る
  - `method: "POST"`、`headers: {"Content-Type": "application/json"}`、`body: JSON.stringify({...})`
- 保存する `result` は `勝ち` / `負け` / `引き分け` の3種類に統一(画面の表示文字とは別に持つ)
- 確認: `cd server` → `node -e "const db=require('./db'); console.log(db.prepare('SELECT * FROM games ORDER BY id DESC LIMIT 5').all())"`

### 躓いたところ

- `node -e "..."` はターミナルのコマンド。Chromeのコンソールに入れると `Unexpected string` になる(`VM○○:1:9` のように `VM` が付くのはブラウザのコンソールで実行した印)
- 相対パス `./db` は今いるフォルダ基準。`server` フォルダで実行する
- `janken.db` は個人データ。`.gitignore` に `*.db` を書いて、Gitに入れない

### 改善の余地

- `resultForDB` は `let` で宣言し、各分岐の中で値を入れるのが安全
- 動作確認で入ったテストデータ(200件前後)は、本物の戦績ではない
