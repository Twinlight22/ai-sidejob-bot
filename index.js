// index.js
import 'dotenv/config';
import express from 'express';
import { Client, middleware } from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);
const app = express();

// 📌 handleEvent 関数はここで1回だけ定義！
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  if (event.message.text === '診断') {
    return client.replyMessage(event.replyToken, {
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
              label: '週に3日',
              text: '週に3日',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '土日だけ',
              text: '土日だけ',
            },
          },
        ],
      },
    });
  }

  return Promise.resolve(null);
}

// ✅ Webhookエンドポイント（LINE SDKのmiddlewareで署名検証）
app.post('/webhook', middleware(config), async (req, res) => {
  try {
    const results = await Promise.all(req.body.events.map(handleEvent));
    res.json(results);
  } catch (err) {
    console.error('❌ Error in /webhook handler:', err);
    res.status(500).end();
  }
});

// ✅ ポート指定（Renderでは PORT を使う）
const port = pr
