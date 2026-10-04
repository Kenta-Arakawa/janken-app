const { DatabaseSync } = require('node:sqlite'); // require：外部のファイルやライブラリを読み込むための関数
const db = new DatabaseSync('janken.db'); // DatabaseSync：SQLiteのデータベースを同期的に操作するためのクラス, 
// Node.jsの標準ライブラリであるsqliteモジュールから提供される


// dbを作成：データとしてはid, played_at, user_hand, pc_hand, resultの5つのカラムを持つテーブルを作成する
db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    played_at TEXT NOT NULL,
    user_hand TEXT NOT NULL,
    pc_hand TEXT NOT NULL,
    result TEXT NOT NULL
  )
`);


module.exports = db; // module.exports：このファイルで定義されたdbオブジェクトを他のファイルから利用できるようにするための仕組み
