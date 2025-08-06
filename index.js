// // index.js
// require('dotenv').config();
// const express = require('express');
// const { Client, middleware } = require('@line/bot-sdk');

// const config = {
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.LINE_CHANNEL_SECRET,
// };

// const client = new Client(config);
// const app = express();

// // 🚫 middleware(config)より前に app.use(express.json()) を絶対に書かない！

// // ✅ Webhookエンドポイント（署名検証込み）
// app.post('/webhook', middleware(config), async (req, res) => {
//   try {
//     const results = await Promise.all(req.body.events.map(async (event) => {
//       if (event.type === 'message' && event.message.type === 'text') {
//         if (event.message.text === '診断') {
//           await client.replyMessage(event.replyToken, {
//             type: 'text',
//             text: '診断を開始します！',
//           });
//         }
//       }
//       return Promise.resolve(null);
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





// // index.js
// require('dotenv').config();
// const express = require('express');
// const { Client, middleware } = require('@line/bot-sdk');

// const config = {
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.LINE_CHANNEL_SECRET,
// };

// const client = new Client(config);
// const app = express();

// async function handleEvent(event) {
//   if (event.type !== 'message' || event.message.type !== 'text') {
//     return Promise.resolve(null);
//   }

//   if (event.message.text === '診断') {
//     try {
//       await client.replyMessage(event.replyToken, {
//         type: 'text',
//         text: 'Q1：副業に使える時間はどのくらい？',
//         quickReply: {
//           items: [
//             {
//               type: 'action',
//               action: {
//                 type: 'message',
//                 label: '毎日1時間',
//                 text: '毎日1時間'
//               }
//             },
//             {
//               type: 'action',
//               action: {
//                 type: 'message',
//                 label: '週2〜3回',
//                 text: '週2〜3回'
//               }
//             }
//           ]
//         }
//       });
//     } catch (err) {
//       console.error('❌ replyMessageでエラー:', err.originalError || err.message || err);
//     }

//     return Promise.resolve(null);
//   }

//   return Promise.resolve(null);
// }

// app.post('/webhook', middleware(config), async (req, res) => {
//   try {
//     const results = await Promise.all(req.body.events.map(handleEvent));
//     res.json(results);
//   } catch (err) {
//     console.error('❌ Webhook handler error:', err.message || err);
//     res.status(500).end();
//   }
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`✅ 本番Bot起動完了 on port ${port}`);
// });





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

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const userMessage = event.message.text;
  console.log('📩 ユーザーの入力:', userMessage);

  // Q1の出題
  if (userMessage === '診断') {
    try {
      await client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Q1：副業に使える時間はどのくらい？',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'message',
                label: '毎日1時間',
                text: '毎日1時間',
              },
            },
            {
              type: 'action',
              action: {
                type: 'message',
                label: '週2〜3回',
                text: '週2〜3回',
              },
            },
          ],
        },
      });
    } catch (err) {
      console.error('❌ Q1返信エラー:', err.originalError || err.message || err);
    }
    return Promise.resolve(null);
  }

  // Q1の回答受信 → Q2へ進む
  if (userMessage === '毎日1時間' || userMessage === '週2〜3回') {
    console.log('✅ Q1の回答を受信:', userMessage);

    try {
      await client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Q2：あなたの専門知識を教えてください（複数選択可）',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'message',
                label: 'ライティング',
                text: 'ライティング',
              },
            },
            {
              type: 'action',
              action: {
                type: 'message',
                label: 'デザイン',
                text: 'デザイン',
              },
            },
            {
              type: 'action',
              action: {
                type: 'message',
                label: 'プログラミング',
                text: 'プログラミング',
              },
            },
          ],
        },
      });
    } catch (err) {
      console.error('❌ Q2返信エラー:', err.originalError || err.message || err);
    }

    return Promise.resolve(null);
  }

  // その他の入力（未対応）
  return Promise.resolve(null);
}

app.post('/webhook', middleware(config), async (req, res) => {
  try {
    const results = await Promise.all(req.body.events.map(handleEvent));
    res.json(results);
  } catch (err) {
    console.error('❌ Webhook handler error:', err.message || err);
    res.status(500).end();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ 本番Bot起動完了 on port ${port}`);
});
