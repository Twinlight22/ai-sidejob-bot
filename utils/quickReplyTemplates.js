// utils/quickReplyTemplates.js

const quickReplies = {
  Q1: {
    text: "Q1：副業に使える時間はどのくらい？",
    items: [
      { label: "1時間以内", data: "time_1h" },
      { label: "1〜3時間", data: "time_1to3h" },
      { label: "3時間以上", data: "time_3hplus" },
      { label: "週末だけ", data: "time_weekend" },
    ],
  },

  Q2_1: {
    text: "Q2-1：どんな専門知識がある？",
    items: [
      { label: "ライティング", data: "know_writing" },
      { label: "デザイン", data: "know_design" },
      { label: "プログラミング", data: "know_programming" },
      { label: "動画編集", data: "know_movie" },
      { label: "翻訳", data: "know_translate" },
    ],
  },

  Q2_2: {
    text: "Q2-2：使ったことのあるAIツールは？",
    items: [
      { label: "ChatGPT", data: "tool_chatgpt" },
      { label: "Claude", data: "tool_claude" },
      { label: "Gemini", data: "tool_gemini" },
      { label: "Fello", data: "tool_fello" },
      { label: "Brew", data: "tool_brew" },
      { label: "Midjourney", data: "tool_midjourney" },
      { label: "RunwayML", data: "tool_runway" },
      { label: "D-ID", data: "tool_did" },
      { label: "Heygen", data: "tool_heygen" },
      { label: "Kaiber", data: "tool_kaiber" },
      { label: "Pika", data: "tool_pika" },
      { label: "Synthesia", data: "tool_synthesia" },
      { label: "Leonardo.Ai", data: "tool_leonardo" },
      { label: "Canva", data: "tool_canva" },
      { label: "NotionAI", data: "tool_notionai" },
      { label: "Microsoft Copilot", data: "tool_copilot" },
      { label: "Perplexity", data: "tool_perplexity" },
      { label: "Suno", data: "tool_suno" },
      { label: "ElevenLabs", data: "tool_elevenlabs" },
      { label: "Luma", data: "tool_luma" },
    ],
  },

  Q3: {
    text: "Q3：過去にやったことのある副業は？",
    items: [
      { label: "ライター", data: "job_writer" },
      { label: "動画編集", data: "job_editor" },
      { label: "デザイン", data: "job_design" },
      { label: "データ入力", data: "job_data" },
      { label: "アンケート", data: "job_survey" },
      { label: "営業代行", data: "job_sales" },
      { label: "接客/販売", data: "job_shop" },
      { label: "EC出品/転売", data: "job_ec" },
      { label: "オンライン講師", data: "job_teacher" },
      { label: "翻訳/通訳", data: "job_translate" },
      { label: "占い/鑑定", data: "job_fortune" },
      { label: "SNS運用代行", data: "job_sns" },
      { label: "写真販売", data: "job_photo" },
      { label: "アフィリエイト", data: "job_affiliate" },
      { label: "その他", data: "job_other" },
    ],
  },

  Q4: {
    text: "Q4：どんな働き方が理想？",
    items: [
      { label: "在宅ワーク", data: "work_home" },
      { label: "出勤あり", data: "work_office" },
      { label: "平日日中", data: "work_weekday" },
      { label: "平日夜間", data: "work_night" },
      { label: "土日メイン", data: "work_weekend" },
    ],
  },

  Q5: {
    text: "Q5：あなたの適性は？",
    items: [
      { label: "クリエイティブ系", data: "apt_creative" },
      { label: "コツコツ作業系", data: "apt_steady" },
      { label: "技術系", data: "apt_tech" },
      { label: "コミュニケーション系", data: "apt_com" },
      { label: "その他・未定", data: "apt_other" },
    ],
  },

  Q6_1: {
    text: "Q6-1：パソコンを持っていますか？",
    items: [
      { label: "はい", data: "pc_have" },
      { label: "いいえ", data: "pc_none" },
    ],
  },

  Q6_2: {
    text: "Q6-2：パソコンのスキルはどのくらい？",
    items: [
      { label: "使える", data: "pc_skill_yes" },
      { label: "少し自信がない", data: "pc_skill_some" },
      { label: "使えない", data: "pc_skill_no" },
    ],
  },
};

module.exports = quickReplies;
