const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db'); // db.jsを読み込むことで、データベース操作が可能になる

app.use(cors());
app.use(express.json()); // JSONを受け取れるようにする


app.get('/', (req,res) => { res.send('Hello World!') });

app.post('/games', (req, res) => {
    const { user_hand, pc_hand, result } = req.body; // リクエストボディからデータを取得、played_atはサーバーから取得
    const played_at = new Date().toISOString(); // 現在の日時をISO形式で取得
    const stmt = db.prepare( 'INSERT INTO games (played_at, user_hand, pc_hand, result) VALUES (?, ?, ?, ?)').run(played_at, user_hand, pc_hand, result); // データベースに挿入
    res.status(201).json({ message: 'Game result saved', id: stmt.lastInsertRowid }); // 挿入後のIDを返す
});

app.listen(3000, () => { console.log('Server is running on port 3000') });

