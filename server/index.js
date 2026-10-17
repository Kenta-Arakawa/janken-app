const express = require('express'); // express : サーバーを作る道具
const app = express(); // サーバーの本体を作る
const cors = require('cors'); // cors : 他のドメインからのアクセスを許可するためのミドルウェア
const db = require('./db'); // db.jsを読み込むことで、データベース操作が可能になる。"./"がつくものは自分で作ったファイル

app.use(cors());
app.use(express.json()); // JSONを受け取れるようにする


app.get('/', (req,res) => { res.send('Hello World!') });  // 動作確認用

app.post('/games', (req, res) => {    // 戦績を保存する
    const { user_hand, pc_hand, result } = req.body; // リクエストボディからデータを取得、played_atはサーバーから取得
    const played_at = new Date().toLocaleString("ja-JP"); // 現在の日時をISO形式で取得
    const stmt = db.prepare( 'INSERT INTO games (played_at, user_hand, pc_hand, result) VALUES (?, ?, ?, ?)').run(played_at, user_hand, pc_hand, result); // データベースに挿入
    res.status(201).json({ message: 'Game result saved', id: stmt.lastInsertRowid }); // 挿入後のIDを返す
});

app.get('/games', (req,res) => {  // 戦績を取り出す
    const games = db.prepare('SELECT * FROM games ORDER BY id DESC LIMIT 10').all();
    res.json(games);
});

app.listen(3000, () => { console.log('Server is running on port 3000') });
