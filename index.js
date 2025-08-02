import express from "express";
import { config } from "dotenv";
import { middleware, Client } from "@line/bot-sdk";
import { OpenAI } from "openai";

config();

const app = express();

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const lineClient = new Client(lineConfig);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/webhook", middleware(lineConfig), async (req, res) => {
  const events = req.body.events;

  for (const event of events) {
    if (event.type === "message" && event.message.type === "text") {
      const userMessage = event.message.text;

      try {
        const chatResponse = await openai.chat.completions.create({
          model: "gpt-4", // or "gpt-3.5-turbo"
          messages: [{ role: "user", content: userMessage }],
        });

        const replyText = chatResponse.choices[0].message.content;

        await lineClient.replyMessage(event.replyToken, {
          type: "text",
          text: replyText,
        });
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
