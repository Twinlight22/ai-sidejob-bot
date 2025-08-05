// import express from "express";
// import { config } from "dotenv";
// import { middleware, Client } from "@line/bot-sdk";
// import { OpenAI } from "openai";

// config();

// const app = express();

// const lineConfig = {
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.LINE_CHANNEL_SECRET,
// };

// const lineClient = new Client(lineConfig);
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// app.post("/webhook", middleware(lineConfig), async (req, res) => {
//   const events = req.body.events;

//   for (const event of events) {
//     if (event.type === "message" && event.message.type === "text") {
//       const userMessage = event.message.text;

//       try {
//         const chatResponse = await openai.chat.completions.create({
//           model: "gpt-4", // or "gpt-3.5-turbo"
//           messages: [{ role: "user", content: userMessage }],
//         });

//         const replyText = chatResponse.choices[0].message.content;

//         await lineClient.replyMessage(event.replyToken, {
//           type: "text",
//           text: replyText,
//         });
//       } catch (err) {
//         console.error("Error:", err);
//       }
//     }
//   }

//   res.sendStatus(200);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });





const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');
require('dotenv').config();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);
const app = express();

app.post('/webhook', middleware(config), async (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return;

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
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`LINE bot is running on port ${port}`);
});


