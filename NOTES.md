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
| Step 7 | (発展) 機能追加、サーバーやDBの追加 | 未着手 |

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
