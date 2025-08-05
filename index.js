// index.js
require('dotenv').config();
const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);
const app = express();

// 🚫 middleware(config)より前に app.use(express.json()) を絶対に書かない！

// ✅ Webhookエンドポイント（署名検証込み）
app.post('/webhook', middleware(config), async (req, res) => {
  try {
    const results = await Promise.all(req.body.events.map(async (event) => {
      if (event.type === 'message' && event.message.type === 'text') {
        if (event.message.text === '診断') {
          await client.replyMessage(event.replyToken, {
            type: 'text',
            text: '診断を開始します！',
          });
        }
      }
      return Promise.resolve(null);
//     }));
//     res.json(results);
//   } catch (err) {
//     console.error('❌ Webhook Error:', err);
//     res.status(500).end();
//   }
// });

// // ✅ ポート指定（Render環境では PORT を使う）
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`✅ 副業Bot起動完了 on port ${port}`);
// });





// index.js
require('dotenv').config();
const express = require('express');

const app = express();

// 署名検証なし。JSONボディパースだけ有効にする（LINEからは application/json で送られる）
app.use(express.json());

// 🚨 Webhookの中で環境変数をコンソールに出力して即200返す
app.post('/webhook', (req, res) => {
  console.log('✅ Webhook受信！');
  console.log('👉 LINE_CHANNEL_SECRET:', process.env.LINE_CHANNEL_SECRET || 'undefined');
  console.log('👉 LINE_CHANNEL_ACCESS_TOKEN:', process.env.LINE_CHANNEL_ACCESS_TOKEN || 'undefined');
  res.sendStatus(200); // とにかく成功を返す
});

// 通常の確認用GETルート（ブラウザで確認可）
app.get('/env-test', (req, res) => {
  res.json({
    LINE_CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET || 'undefined',
    LINE_CHANNEL_ACCESS_TOKEN: process.env.LINE_CHANNEL_ACCESS_TOKEN || 'undefined',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ 環境変数テストBot起動 on port ${port}`);
});
