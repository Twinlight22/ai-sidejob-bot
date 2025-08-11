
// // 必要なモジュールをインポート
// const express = require('express');
// const { Client } = require('@line/bot-sdk');

// const app = express();

// // LINE Bot設定
// const config = {
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.LINE_CHANNEL_SECRET,
// };
// const client = new Client(config);

// // JSONボディを使えるように（middleware削除中なので必要）
// app.use(express.json());

// // ===========================================
// // 副業診断システム - 完全版
// // ===========================================

// // 診断データ構造
// const CAREERS = {
//   '物販': { name: '物販', difficulty: '★★☆', earning: '★★★', description: 'Amazon、メルカリなどでの商品販売' },
//   'ライティング': { name: 'ライティング', difficulty: '★☆☆', earning: '★★☆', description: '記事執筆・コンテンツ作成' },
//   'ブログ運営': { name: 'ブログ運営', difficulty: '★★☆', earning: '★★☆', description: '個人ブログでの収益化' },
//   'SNS運用': { name: 'SNS運用代行', difficulty: '★★☆', earning: '★★★', description: '企業のSNSアカウント運用' },
//   'スキル販売': { name: 'スキル販売', difficulty: '★☆☆', earning: '★★☆', description: 'ココナラ等でのスキル提供' },
//   'デザイン': { name: 'デザイン', difficulty: '★★★', earning: '★★★', description: 'ロゴ・バナー等のデザイン制作' },
//   'サムネイル・バナー制作': { name: 'サムネイル・バナー制作', difficulty: '★★☆', earning: '★★☆', description: 'YouTube等のサムネイル制作' },
//   '画像生成': { name: '画像生成', difficulty: '★★☆', earning: '★★☆', description: 'AIを使った画像制作・販売' },
//   '動画編集': { name: '動画編集', difficulty: '★★★', earning: '★★★', description: 'YouTube・企業動画の編集' },
//   '顔出し動画作成': { name: '顔出し動画作成', difficulty: '★★★', earning: '★★★', description: '教育・エンタメ動画の制作' },
//   '音声編集': { name: '音声編集', difficulty: '★★☆', earning: '★★☆', description: 'ポッドキャスト・音声コンテンツ制作' },
//   'Web制作': { name: 'HTML/CSS', difficulty: '★★★', earning: '★★★', description: 'ウェブサイト制作・コーディング' },
//   'プログラミング': { name: 'プログラミング', difficulty: '★★★★', earning: '★★★★', description: 'アプリ・システム開発' }
// };

// // 質問データ
// const DIAGNOSIS_QUESTIONS = [
//   {
//     id: 'Q1',
//     text: '副業に使える時間は？',
//     type: 'single',
//     options: [
//       { text: '1時間未満', value: 'less_1h' },
//       { text: '1〜2時間', value: '1_2h' },
//       { text: '3〜4時間', value: '3_4h' },
//       { text: '5時間以上', value: 'more_5h' }
//     ]
//   },
//   {
//     id: 'Q2_1',
//     text: '専門知識はありますか？',
//     type: 'single',
//     options: [
//       { text: 'ライティング', value: 'writing' },
//       { text: 'デザイン', value: 'design' },
//       { text: 'プログラミング', value: 'programming' },
//       { text: 'SNSマーケティング', value: 'sns_marketing' },
//       { text: '動画編集', value: 'video_editing' },
//       { text: '音声編集', value: 'audio_editing' },
//       { text: '英語（翻訳など）', value: 'english' },
//       { text: '経理', value: 'accounting' },
//       { text: 'これから勉強したい', value: 'learn_new' }
//     ]
//   },
//   {
//     id: 'Q2_2',
//     text: '使ったことのあるAIツールは？（複数選択可）',
//     type: 'multiple',
//     options: [
//       { text: 'ChatGPT', value: 'chatgpt' },
//       { text: 'Claude', value: 'claude' },
//       { text: 'Google Gemini', value: 'gemini' },
//       { text: 'Perplexity', value: 'perplexity' },
//       { text: 'Midjourney', value: 'midjourney' },
//       { text: 'DALL·E 3', value: 'dalle3' },
//       { text: 'Adobe Firefly', value: 'firefly' },
//       { text: 'Leonardo', value: 'leonardo' },
//       { text: 'Runway', value: 'runway' },
//       { text: 'Whisper', value: 'whisper' },
//       { text: 'Brew', value: 'brew' },
//       { text: 'Canva', value: 'canva' },
//       { text: '使ったことない', value: 'none' }
//     ]
//   },
//   {
//     id: 'Q3',
//     text: '業務経験はありますか？（複数選択可）',
//     type: 'multiple',
//     options: [
//       { text: '物販', value: 'sales' },
//       { text: 'ライティング', value: 'writing' },
//       { text: 'デザイン', value: 'design' },
//       { text: '動画編集', value: 'video' },
//       { text: 'SNS運用', value: 'sns' },
//       { text: 'note販売', value: 'note' },
//       { text: 'スキル販売', value: 'skill_sales' },
//       { text: 'ブログ運営', value: 'blog' },
//       { text: 'プログラミング', value: 'programming' },
//       { text: 'HTML/CSS', value: 'html_css' },
//       { text: '素材販売', value: 'material_sales' },
//       { text: '未経験', value: 'none' }
//     ]
//   },
//   {
//     id: 'Q4',
//     text: '副業できる時間帯・場所は？（複数選択可）',
//     type: 'multiple',
//     options: [
//       { text: '平日昼', value: 'weekday_daytime' },
//       { text: '平日夜', value: 'weekday_night' },
//       { text: '土日祝', value: 'weekend_holiday' },
//       { text: '在宅', value: 'home' },
//       { text: '出勤', value: 'office' }
//     ]
//   },
//   {
//     id: 'Q5',
//     text: 'どんな作業が得意ですか？',
//     type: 'single',
//     options: [
//       { text: 'コツコツ進める作業', value: 'steady_work' },
//       { text: 'アイデアや企画の発想', value: 'creative_ideas' },
//       { text: '表現・創作系', value: 'creative_expression' },
//       { text: '人とのやり取り', value: 'communication' },
//       { text: '機械やツール操作', value: 'technical_skills' }
//     ]
//   },
//   {
//     id: 'Q6_1',
//     text: 'PCは持っていますか？',
//     type: 'single',
//     options: [
//       { text: 'はい', value: 'yes' },
//       { text: 'いいえ', value: 'no' }
//     ]
//   },
//   {
//     id: 'Q6_2',
//     text: 'PCスキルはどの程度ですか？',
//     type: 'single',
//     options: [
//       { text: '自信あり', value: 'confident' },
//       { text: '普通', value: 'normal' },
//       { text: '自信なし', value: 'not_confident' }
//     ]
//   }
// ];

// // セッション管理
// const diagnosisSessions = new Map();

// // 配点計算ロジック（AIツール配点強化版！）
// function calculateCareerScores(answers) {
//   let scores = {};
  
//   // 全職業のスコアを0で初期化
//   Object.keys(CAREERS).forEach(career => {
//     scores[career] = 0;
//   });

//   // Q1: 時間による配点
//   if (answers.Q1) {
//     switch (answers.Q1) {
//       case 'less_1h':
//         scores['ライティング'] += 10;
//         scores['SNS運用'] += 5;
//         scores['物販'] += 20;
//         break;
//       case '1_2h':
//         scores['ライティング'] += 20;
//         scores['SNS運用'] += 15;
//         scores['動画編集'] += 10;
//         scores['Web制作'] += 10;
//         scores['プログラミング'] += 5;
//         scores['物販'] += 20;
//         break;
//       case '3_4h':
//         scores['ライティング'] += 30;
//         scores['SNS運用'] += 25;
//         scores['動画編集'] += 25;
//         scores['Web制作'] += 30;
//         scores['プログラミング'] += 30;
//         scores['物販'] += 20;
//         break;
//       case 'more_5h':
//         Object.keys(scores).forEach(career => scores[career] += 20);
//         break;
//     }
//   }

//   // Q2-1: 専門知識
//   if (answers.Q2_1) {
//     switch (answers.Q2_1) {
//       case 'writing': scores['ライティング'] += 100; break;
//       case 'design': scores['デザイン'] += 100; break;
//       case 'programming': scores['プログラミング'] += 100; break;
//       case 'sns_marketing': scores['SNS運用'] += 100; break;
//       case 'video_editing': scores['動画編集'] += 100; break;
//       case 'audio_editing': scores['音声編集'] += 100; break;
//       case 'english': scores['ライティング'] += 100; break;
//       case 'accounting': scores['スキル販売'] += 100; break;
//       case 'learn_new':
//         Object.keys(scores).forEach(career => scores[career] += 5);
//         break;
//     }
//   }

//   // Q2-2: AIツール経験（配点大幅UP！稼ぎに直結🔥）
//   if (answers.Q2_2 && Array.isArray(answers.Q2_2)) {
//     answers.Q2_2.forEach(tool => {
//       switch (tool) {
//         case 'chatgpt':
//         case 'claude':
//           scores['ライティング'] += 30;
//           scores['ブログ運営'] += 25;
//           scores['スキル販売'] += 25;
//           scores['プログラミング'] += 15;
//           break;
//         case 'gemini':
//           scores['ブログ運営'] += 25;
//           scores['ライティング'] += 25;
//           scores['プログラミング'] += 15;
//           break;
//         case 'perplexity':
//           scores['ブログ運営'] += 20;
//           scores['ライティング'] += 15;
//           break;
//         case 'midjourney':
//         case 'dalle3':
//         case 'leonardo':
//           scores['画像生成'] += 35;
//           break;
//         case 'firefly':
//           scores['デザイン'] += 25;
//           scores['画像生成'] += 30;
//           break;
//         case 'runway':
//         case 'brew':
//           scores['動画編集'] += 30;
//           break;
//         case 'did':
//           scores['顔出し動画作成'] += 35;
//           break;
//         case 'whisper':
//           scores['音声編集'] += 25;
//           break;
//         case 'canva':
//           scores['デザイン'] += 20;
//           scores['サムネイル・バナー制作'] += 25;
//           scores['SNS運用'] += 15;
//           break;
//       }
//     });
//   }

//   // Q3: 業務経験（複数選択対応）
//   if (answers.Q3 && Array.isArray(answers.Q3)) {
//     answers.Q3.forEach(experience => {
//       switch (experience) {
//         case 'sales': scores['物販'] += 100; break;
//         case 'writing': scores['ライティング'] += 100; break;
//         case 'design': scores['デザイン'] += 100; break;
//         case 'video': scores['動画編集'] += 100; break;
//         case 'sns': scores['SNS運用'] += 100; break;
//         case 'note': scores['ブログ運営'] += 100; break;
//         case 'skill_sales': scores['スキル販売'] += 100; break;
//         case 'blog': scores['ブログ運営'] += 100; break;
//         case 'programming': scores['プログラミング'] += 100; break;
//         case 'html_css': scores['Web制作'] += 100; break;
//         case 'material_sales': scores['画像生成'] += 100; break;
//       }
//     });
//   }

//   // Q4: 時間帯・場所制限（修正版）
//   if (answers.Q4) {
//     if (!answers.Q4.includes('home')) {
//       // 在宅が選ばれていない場合、全てのスコアを0に
//       Object.keys(scores).forEach(career => scores[career] = 0);
//     }
//     if (answers.Q4.includes('office') && !answers.Q4.includes('home')) {
//       // 出勤のみで在宅なしの場合、物販以外を0に
//       Object.keys(scores).forEach(career => {
//         if (career !== '物販') scores[career] = 0;
//       });
//     }
//     // SNS運用は時間帯制限なし（いつでもOK！）
//   }

//   // Q5: 適性（単一選択に変更）
//   if (answers.Q5) {
//     switch (answers.Q5) {
//       case 'steady_work':
//         scores['ライティング'] += 10;
//         scores['ブログ運営'] += 10;
//         scores['Web制作'] += 10;
//         scores['物販'] += 10;
//         break;
//       case 'creative_ideas':
//         scores['スキル販売'] += 10;
//         scores['SNS運用'] += 10;
//         scores['ブログ運営'] += 10;
//         scores['画像生成'] += 10;
//         break;
//       case 'creative_expression':
//         scores['デザイン'] += 10;
//         scores['サムネイル・バナー制作'] += 10;
//         scores['画像生成'] += 10;
//         scores['顔出し動画作成'] += 10;
//         break;
//       case 'communication':
//         scores['SNS運用'] += 10;
//         scores['スキル販売'] += 10;
//         scores['音声編集'] += 10;
//         break;
//       case 'technical_skills':
//         scores['プログラミング'] += 10;
//         scores['動画編集'] += 10;
//         scores['Web制作'] += 10;
//         scores['音声編集'] += 10;
//         break;
//     }
//   }

//   // Q6-1 & Q6-2: PC関連
//   if (answers.Q6_1 === 'no') {
//     Object.keys(scores).forEach(career => {
//       if (career !== '物販') scores[career] = 0;
//     });
//     scores['物販'] += 10;
//   } else if (answers.Q6_2) {
//     switch (answers.Q6_2) {
//       case 'confident':
//         scores['プログラミング'] += 10;
//         scores['Web制作'] += 10;
//         scores['動画編集'] += 10;
//         scores['音声編集'] += 10;
//         break;
//       case 'normal':
//         scores['ライティング'] += 10;
//         scores['ブログ運営'] += 10;
//         scores['スキル販売'] += 10;
//         break;
//     }
//   }

//   return scores;
// }

// // トップ3の職業を取得
// function getTop3Careers(scores) {
//   return Object.entries(scores)
//     .sort(([,a], [,b]) => b - a)
//     .slice(0, 3)
//     .map(([career, score]) => ({
//       ...CAREERS[career],
//       score
//     }));
// }

// // 診断開始
// function startCareerDiagnosis(userId) {
//   diagnosisSessions.set(userId, {
//     currentQuestion: 0,
//     answers: {}
//   });
  
//   return createDiagnosisQuestionMessage(0, userId);
// }

// // FlexMessage形式の質問メッセージ（選択状態見える化対応！）
// function createDiagnosisQuestionMessage(questionIndex, userId) {
//   const question = DIAGNOSIS_QUESTIONS[questionIndex];
//   const session = diagnosisSessions.get(userId);
  
//   // 複数選択の場合は最初からQuick Replyで表示
//   if (question.type === 'multiple') {
//     const selectedOptions = session?.answers[question.id] || [];
//     const selectedText = selectedOptions.length > 0 
//       ? question.options.filter(opt => selectedOptions.includes(opt.value)).map(opt => opt.text).join(', ')
//       : 'まだ選択されていません';

//     const remainingOptions = question.options.filter(opt => 
//       !selectedOptions.includes(opt.value)
//     );

//     const quickReplyItems = [
//       ...remainingOptions.map(opt => ({
//         type: 'action',
//         action: {
//           type: 'postback',
//           label: opt.text,
//           data: `dq=${questionIndex}&da=${opt.value}&multi=true`
//         }
//       })),
//       {
//         type: 'action',
//         action: {
//           type: 'postback',
//           label: '次の質問へ →',
//           data: `dnext=${questionIndex}`
//         }
//       }
//     ];

//     return {
//       type: 'text',
//       text: `🎯 質問${questionIndex + 1}/8\n${question.text}\n\n✅ 選択済み: ${selectedText}\n\n下から選択するか「次の質問へ」を押してください`,
//       quickReply: {
//         items: quickReplyItems
//       }
//     };
//   }
  
//   // 単一選択の場合は従来通りFlexMessage
//   const contents = {
//     type: 'bubble',
//     size: 'giga',
//     header: {
//       type: 'box',
//       layout: 'vertical',
//       contents: [
//         {
//           type: 'text',
//           text: `🎯 質問${questionIndex + 1}/8`,
//           weight: 'bold',
//           size: 'lg',
//           color: '#ffffff',
//           align: 'center'
//         }
//       ],
//       backgroundColor: '#1563f8',
//       paddingAll: 'lg'
//     },
//     body: {
//       type: 'box',
//       layout: 'vertical',
//       contents: [
//         {
//           type: 'text',
//           text: question.text,
//           weight: 'bold',
//           size: 'md',
//           wrap: true,
//           color: '#333333'
//         },
//         {
//           type: 'separator',
//           margin: 'lg'
//         },
//         {
//           type: 'box',
//           layout: 'vertical',
//           contents: question.options.map((option, index) => ({
//             type: 'button',
//             action: {
//               type: 'postback',
//               label: option.text,
//               data: `dq=${questionIndex}&da=${option.value}`
//             },
//             style: 'primary',
//             color: '#00bfff',
//             margin: 'sm',
//             height: 'sm'
//           })),
//           margin: 'lg',
//           spacing: 'sm'
//         }
//       ],
//       paddingAll: 'lg'
//     }
//   };

//   return {
//     type: 'flex',
//     altText: question.text,
//     contents
//   };
// }

// // 結果表示メッセージ作成（色統一版！）
// function createCareerResultMessage(top3Careers) {
//   const contents = {
//     type: 'bubble',
//     size: 'giga',
//     header: {
//       type: 'box',
//       layout: 'vertical',
//       contents: [
//         {
//           type: 'text',
//           text: '🎉 適職診断結果',
//           weight: 'bold',
//           size: 'xl',
//           color: '#ffffff',
//           align: 'center'
//         },
//         {
//           type: 'text',
//           text: 'あなたにピッタリの副業TOP3',
//           size: 'md',
//           color: '#ffffff',
//           align: 'center',
//           margin: 'sm'
//         }
//       ],
//       backgroundColor: '#1563f8', // 質問と同じ青に統一！
//       paddingAll: 'lg'
//     },
//     body: {
//       type: 'box',
//       layout: 'vertical',
//       contents: top3Careers.map((career, index) => ({
//         type: 'box',
//         layout: 'vertical',
//         contents: [
//           {
//             type: 'box',
//             layout: 'baseline',
//             contents: [
//               {
//                 type: 'text',
//                 text: ['🥇', '🥈', '🥉'][index],
//                 size: 'lg',
//                 flex: 1
//               },
//               {
//                 type: 'text',
//                 text: career.name,
//                 weight: 'bold',
//                 size: 'lg',
//                 color: '#333333',
//                 flex: 6
//               },
//               {
//                 type: 'text',
//                 text: `${career.score}pt`,
//                 size: 'sm',
//                 color: '#ff6b35',
//                 weight: 'bold',
//                 align: 'end',
//                 flex: 2
//               }
//             ]
//           },
//           {
//             type: 'text',
//             text: career.description,
//             size: 'sm',
//             color: '#666666',
//             wrap: true,
//             margin: 'sm'
//           },
//           {
//             type: 'box',
//             layout: 'baseline',
//             contents: [
//               {
//                 type: 'text',
//                 text: '難易度',
//                 size: 'xs',
//                 color: '#888888',
//                 flex: 2
//               },
//               {
//                 type: 'text',
//                 text: career.difficulty,
//                 size: 'xs',
//                 color: '#333333',
//                 flex: 3
//               }
//             ],
//             margin: 'sm'
//           },
//           {
//             type: 'box',
//             layout: 'baseline',
//             contents: [
//               {
//                 type: 'text',
//                 text: '稼げる度',
//                 size: 'xs',
//                 color: '#888888',
//                 flex: 2
//               },
//               {
//                 type: 'text',
//                 text: career.earning,
//                 size: 'xs',
//                 color: '#333333',
//                 flex: 3
//               }
//             ],
//             margin: 'xs'
//           }
//         ],
//         paddingAll: 'md',
//         backgroundColor: index === 0 ? '#fff3f0' : '#f8f9fa',
//         cornerRadius: 'md',
//         margin: index > 0 ? 'lg' : 'none'
//       })),
//       paddingAll: 'lg'
//     },
//     footer: {
//       type: 'box',
//       layout: 'vertical',
//       contents: [
//         {
//           type: 'button',
//           action: {
//             type: 'postback',
//             label: '🔄 もう一度診断する',
//             data: 'diagnosis_restart'
//           },
//           style: 'primary',
//           height: 'sm'
//         }
//       ],
//       paddingAll: 'lg'
//     }
//   };

//   return {
//     type: 'flex',
//     altText: '適職診断結果',
//     contents
//   };
// }

// // ✅ Webhook受信確認用エンドポイント（選択済みボタン対応完全版！）
// app.post('/webhook', async (req, res) => {
//   console.log('📩 Webhookリクエストが届きました！');
//   console.log('🧾 リクエストボディ:', JSON.stringify(req.body, null, 2));

//   // 簡易応答
//   res.sendStatus(200);

//   // イベント処理
//   if (Array.isArray(req.body.events)) {
//     for (const event of req.body.events) {
//       const userId = event.source.userId;
      
//       // 診断開始
//       if (event.type === 'message' && event.message.type === 'text') {
//         const userMessage = event.message.text;
//         console.log('💬 ユーザーの入力:', userMessage);

//         if (userMessage === '診断' || userMessage === '副業診断' || userMessage === '適職診断') {
//           const message = startCareerDiagnosis(userId);
//           await client.replyMessage(event.replyToken, message);
//           continue;
//         }
//       }

//       // 診断再開
//       if (event.type === 'postback' && event.postback.data === 'diagnosis_restart') {
//         const message = startCareerDiagnosis(userId);
//         await client.replyMessage(event.replyToken, message);
//         continue;
//       }

//       // 診断の回答処理
//       if (event.type === 'postback' && event.postback.data.startsWith('dq=')) {
//         const data = new URLSearchParams(event.postback.data);
//         const questionIndex = parseInt(data.get('dq'));
//         const answer = data.get('da');
//         const isMultiple = data.get('multi') === 'true';

//         const session = diagnosisSessions.get(userId);
//         if (!session) {
//           console.log('⚠️ セッションが見つかりません。userId:', userId);
//           await client.replyMessage(event.replyToken, {
//             type: 'text',
//             text: '診断を開始するには「診断」と入力してください。'
//           });
//           continue;
//         }

//         console.log('✅ セッション確認OK:', session);

//         const question = DIAGNOSIS_QUESTIONS[questionIndex];
        
//         if (isMultiple) {
//           // 複数選択の場合
//           if (!session.answers[question.id]) {
//             session.answers[question.id] = [];
//           }
          
//           if (session.answers[question.id].includes(answer)) {
//             session.answers[question.id] = session.answers[question.id].filter(a => a !== answer);
//           } else {
//             session.answers[question.id].push(answer);
//           }

//           // 選択済み項目の表示
//           const selectedOptions = question.options.filter(opt => 
//             session.answers[question.id].includes(opt.value)
//           );
//           const selectedText = selectedOptions.length > 0 
//             ? selectedOptions.map(opt => opt.text).join(', ') 
//             : 'まだ選択されていません';

//           // 未選択の項目でQuick Reply作成
//           const remainingOptions = question.options.filter(opt => 
//             !session.answers[question.id].includes(opt.value)
//           );

//           const quickReplyItems = [
//             // 未選択の選択肢
//             ...remainingOptions.map(opt => ({
//               type: 'action',
//               action: {
//                 type: 'postback',
//                 label: opt.text,
//                 data: `dq=${questionIndex}&da=${opt.value}&multi=true`
//               }
//             })),
//             // 次の質問へボタン
//             {
//               type: 'action',
//               action: {
//                 type: 'postback',
//                 label: '次の質問へ →',
//                 data: `dnext=${questionIndex}`
//               }
//             }
//           ];

//           const continueMessage = {
//             type: 'text',
//             text: `✅ 選択済み: ${selectedText}\n\n下から追加で選択するか「次の質問へ」を押してください`,
//             quickReply: {
//               items: quickReplyItems
//             }
//           };

//           await client.replyMessage(event.replyToken, continueMessage);
//           continue;
//         } else {
//           // 単一選択の場合
//           session.answers[question.id] = answer;
          
//           const nextQuestionIndex = questionIndex + 1;
          
//           if (nextQuestionIndex < DIAGNOSIS_QUESTIONS.length) {
//             const nextMessage = createDiagnosisQuestionMessage(nextQuestionIndex, userId);
//             await client.replyMessage(event.replyToken, nextMessage);
//             continue;
//           } else {
//             // 診断完了 - 結果表示
//             const scores = calculateCareerScores(session.answers);
//             const top3Careers = getTop3Careers(scores);
//             const resultMessage = createCareerResultMessage(top3Careers);
            
//             diagnosisSessions.delete(userId);
            
//             await client.replyMessage(event.replyToken, resultMessage);
//             continue;
//           }
//         }
//       }

//       // 「次の質問へ」の処理
//       if (event.type === 'postback' && event.postback.data.startsWith('dnext=')) {
//         const questionIndex = parseInt(event.postback.data.replace('dnext=', ''));
//         const nextQuestionIndex = questionIndex + 1;
        
//         if (nextQuestionIndex < DIAGNOSIS_QUESTIONS.length) {
//           const nextMessage = createDiagnosisQuestionMessage(nextQuestionIndex, userId);
//           await client.replyMessage(event.replyToken, nextMessage);
//         } else {
//           const session = diagnosisSessions.get(userId);
//           const scores = calculateCareerScores(session.answers);
//           const top3Careers = getTop3Careers(scores);
//           const resultMessage = createCareerResultMessage(top3Careers);
          
//           diagnosisSessions.delete(userId);
          
//           await client.replyMessage(event.replyToken, resultMessage);
//         }
//         continue;
//       }
//     }
//   }
// });

// // ポート指定
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`✅ 本番Bot起動完了 on port ${port}`);
// });




// // 必要なモジュールをインポート
// const express = require('express');
// const { Client } = require('@line/bot-sdk');

// const app = express();

// // LINE Bot設定
// const config = {
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.LINE_CHANNEL_SECRET,
// };
// const client = new Client(config);

// // JSONボディを使えるように（middleware削除中なので必要）
// app.use(express.json());

// // ===========================================
// // 副業診断システム - 完全版
// // ===========================================

// // 診断データ構造
// const CAREERS = {
//   '物販': { name: '物販', difficulty: '★★☆', earning: '★★★', description: 'Amazon、メルカリなどでの商品販売' },
//   'ライティング': { name: 'ライティング', difficulty: '★☆☆', earning: '★★☆', description: '記事執筆・コンテンツ作成' },
//   'ブログ運営': { name: 'ブログ運営', difficulty: '★★☆', earning: '★★☆', description: '個人ブログでの収益化' },
//   'SNS運用': { name: 'SNS運用代行', difficulty: '★★☆', earning: '★★★', description: '企業のSNSアカウント運用' },
//   'スキル販売': { name: 'スキル販売', difficulty: '★☆☆', earning: '★★☆', description: 'ココナラ等でのスキル提供' },
//   'デザイン': { name: 'デザイン', difficulty: '★★★', earning: '★★★', description: 'ロゴ・バナー等のデザイン制作' },
//   'サムネイル・バナー制作': { name: 'サムネイル・バナー制作', difficulty: '★★☆', earning: '★★☆', description: 'YouTube等のサムネイル制作' },
//   '画像生成': { name: '画像生成', difficulty: '★★☆', earning: '★★☆', description: 'AIを使った画像制作・販売' },
//   '動画編集': { name: '動画編集', difficulty: '★★★', earning: '★★★', description: 'YouTube・企業動画の編集' },
//   '顔出し動画作成': { name: '顔出し動画作成', difficulty: '★★★', earning: '★★★', description: '教育・エンタメ動画の制作' },
//   '音声編集': { name: '音声編集', difficulty: '★★☆', earning: '★★☆', description: 'ポッドキャスト・音声コンテンツ制作' },
//   'Web制作': { name: 'HTML/CSS', difficulty: '★★★', earning: '★★★', description: 'ウェブサイト制作・コーディング' },
//   'プログラミング': { name: 'プログラミング', difficulty: '★★★★', earning: '★★★★', description: 'アプリ・システム開発' }
// };

// // 質問データ
// const DIAGNOSIS_QUESTIONS = [
//   {
//     id: 'Q1',
//     text: '副業に使える時間は？',
//     type: 'single',
//     options: [
//       { text: '1時間未満', value: 'less_1h' },
//       { text: '1〜2時間', value: '1_2h' },
//       { text: '3〜4時間', value: '3_4h' },
//       { text: '5時間以上', value: 'more_5h' }
//     ]
//   },
//   {
//     id: 'Q2_1',
//     text: '専門知識はありますか？',
//     type: 'single',
//     options: [
//       { text: 'ライティング', value: 'writing' },
//       { text: 'デザイン', value: 'design' },
//       { text: 'プログラミング', value: 'programming' },
//       { text: 'SNSマーケティング', value: 'sns_marketing' },
//       { text: '動画編集', value: 'video_editing' },
//       { text: '音声編集', value: 'audio_editing' },
//       { text: '英語（翻訳など）', value: 'english' },
//       { text: '経理', value: 'accounting' },
//       { text: 'これから勉強したい', value: 'learn_new' }
//     ]
//   },
//   {
//     id: 'Q2_2',
//     text: '使ったことのあるAIツールは？（複数選択可）',
//     type: 'multiple',
//     options: [
//       { text: 'ChatGPT', value: 'chatgpt' },
//       { text: 'Claude', value: 'claude' },
//       { text: 'Google Gemini', value: 'gemini' },
//       { text: 'Perplexity', value: 'perplexity' },
//       { text: 'Midjourney', value: 'midjourney' },
//       { text: 'DALL·E 3', value: 'dalle3' },
//       { text: 'Adobe Firefly', value: 'firefly' },
//       { text: 'Leonardo', value: 'leonardo' },
//       { text: 'Runway', value: 'runway' },
//       { text: 'Whisper', value: 'whisper' },
//       { text: 'Brew', value: 'brew' },
//       { text: 'Canva', value: 'canva' },
//       { text: '使ったことない', value: 'none' }
//     ]
//   },
//   {
//     id: 'Q3',
//     text: '業務経験はありますか？（複数選択可）',
//     type: 'multiple',
//     options: [
//       { text: '物販', value: 'sales' },
//       { text: 'ライティング', value: 'writing' },
//       { text: 'デザイン', value: 'design' },
//       { text: '動画編集', value: 'video' },
//       { text: 'SNS運用', value: 'sns' },
//       { text: 'note販売', value: 'note' },
//       { text: 'スキル販売', value: 'skill_sales' },
//       { text: 'ブログ運営', value: 'blog' },
//       { text: 'プログラミング', value: 'programming' },
//       { text: 'HTML/CSS', value: 'html_css' },
//       { text: '素材販売', value: 'material_sales' },
//       { text: '未経験', value: 'none' }
//     ]
//   },
//   {
//     id: 'Q4',
//     text: '副業できる時間帯・場所は？（複数選択可）',
//     type: 'multiple',
//     options: [
//       { text: '平日昼', value: 'weekday_daytime' },
//       { text: '平日夜', value: 'weekday_night' },
//       { text: '土日祝', value: 'weekend_holiday' },
//       { text: '在宅', value: 'home' },
//       { text: '出勤', value: 'office' }
//     ]
//   },
//   {
//     id: 'Q5',
//     text: 'どんな作業が得意ですか？',
//     type: 'single',
//     options: [
//       { text: 'コツコツ進める作業', value: 'steady_work' },
//       { text: 'アイデアや企画の発想', value: 'creative_ideas' },
//       { text: '表現・創作系', value: 'creative_expression' },
//       { text: '人とのやり取り', value: 'communication' },
//       { text: '機械やツール操作', value: 'technical_skills' }
//     ]
//   },
//   {
//     id: 'Q6_1',
//     text: 'PCは持っていますか？',
//     type: 'single',
//     options: [
//       { text: 'はい', value: 'yes' },
//       { text: 'いいえ', value: 'no' }
//     ]
//   },
//   {
//     id: 'Q6_2',
//     text: 'PCスキルはどの程度ですか？',
//     type: 'single',
//     options: [
//       { text: '自信あり', value: 'confident' },
//       { text: '普通', value: 'normal' },
//       { text: '自信なし', value: 'not_confident' }
//     ]
//   }
// ];

// // セッション管理
// const diagnosisSessions = new Map();

// // 配点計算ロジック（AIツール配点強化版！）
// function calculateCareerScores(answers) {
//   let scores = {};
  
//   // 全職業のスコアを0で初期化
//   Object.keys(CAREERS).forEach(career => {
//     scores[career] = 0;
//   });

//   // Q1: 時間による配点
//   if (answers.Q1) {
//     switch (answers.Q1) {
//       case 'less_1h':
//         scores['ライティング'] += 10;
//         scores['SNS運用'] += 5;
//         scores['物販'] += 20;
//         break;
//       case '1_2h':
//         scores['ライティング'] += 20;
//         scores['SNS運用'] += 15;
//         scores['動画編集'] += 10;
//         scores['Web制作'] += 10;
//         scores['プログラミング'] += 5;
//         scores['物販'] += 20;
//         break;
//       case '3_4h':
//         scores['ライティング'] += 30;
//         scores['SNS運用'] += 25;
//         scores['動画編集'] += 25;
//         scores['Web制作'] += 30;
//         scores['プログラミング'] += 30;
//         scores['物販'] += 20;
//         break;
//       case 'more_5h':
//         Object.keys(scores).forEach(career => scores[career] += 20);
//         break;
//     }
//   }

//   // Q2-1: 専門知識
//   if (answers.Q2_1) {
//     switch (answers.Q2_1) {
//       case 'writing': scores['ライティング'] += 100; break;
//       case 'design': scores['デザイン'] += 100; break;
//       case 'programming': scores['プログラミング'] += 100; break;
//       case 'sns_marketing': scores['SNS運用'] += 100; break;
//       case 'video_editing': scores['動画編集'] += 100; break;
//       case 'audio_editing': scores['音声編集'] += 100; break;
//       case 'english': scores['ライティング'] += 100; break;
//       case 'accounting': scores['スキル販売'] += 100; break;
//       case 'learn_new':
//         Object.keys(scores).forEach(career => scores[career] += 5);
//         break;
//     }
//   }

//   // Q2-2: AIツール経験（配点大幅UP！稼ぎに直結🔥）
//   if (answers.Q2_2 && Array.isArray(answers.Q2_2)) {
//     answers.Q2_2.forEach(tool => {
//       switch (tool) {
//         case 'chatgpt':
//         case 'claude':
//           scores['ライティング'] += 30;
//           scores['ブログ運営'] += 25;
//           scores['スキル販売'] += 25;
//           scores['プログラミング'] += 15;
//           break;
//         case 'gemini':
//           scores['ブログ運営'] += 25;
//           scores['ライティング'] += 25;
//           scores['プログラミング'] += 15;
//           break;
//         case 'perplexity':
//           scores['ブログ運営'] += 20;
//           scores['ライティング'] += 15;
//           break;
//         case 'midjourney':
//         case 'dalle3':
//         case 'leonardo':
//           scores['画像生成'] += 35;
//           break;
//         case 'firefly':
//           scores['デザイン'] += 25;
//           scores['画像生成'] += 30;
//           break;
//         case 'runway':
//         case 'brew':
//           scores['動画編集'] += 30;
//           break;
//         case 'did':
//           scores['顔出し動画作成'] += 35;
//           break;
//         case 'whisper':
//           scores['音声編集'] += 25;
//           break;
//         case 'canva':
//           scores['デザイン'] += 20;
//           scores['サムネイル・バナー制作'] += 25;
//           scores['SNS運用'] += 15;
//           break;
//       }
//     });
//   }

//   // Q3: 業務経験（複数選択対応）
//   if (answers.Q3 && Array.isArray(answers.Q3)) {
//     answers.Q3.forEach(experience => {
//       switch (experience) {
//         case 'sales': scores['物販'] += 100; break;
//         case 'writing': scores['ライティング'] += 100; break;
//         case 'design': scores['デザイン'] += 100; break;
//         case 'video': scores['動画編集'] += 100; break;
//         case 'sns': scores['SNS運用'] += 100; break;
//         case 'note': scores['ブログ運営'] += 100; break;
//         case 'skill_sales': scores['スキル販売'] += 100; break;
//         case 'blog': scores['ブログ運営'] += 100; break;
//         case 'programming': scores['プログラミング'] += 100; break;
//         case 'html_css': scores['Web制作'] += 100; break;
//         case 'material_sales': scores['画像生成'] += 100; break;
//       }
//     });
//   }

//   // Q4: 時間帯・場所制限（修正版）
//   if (answers.Q4) {
//     if (!answers.Q4.includes('home')) {
//       // 在宅が選ばれていない場合、全てのスコアを0に
//       Object.keys(scores).forEach(career => scores[career] = 0);
//     }
//     if (answers.Q4.includes('office') && !answers.Q4.includes('home')) {
//       // 出勤のみで在宅なしの場合、物販以外を0に
//       Object.keys(scores).forEach(career => {
//         if (career !== '物販') scores[career] = 0;
//       });
//     }
//     // SNS運用は時間帯制限なし（いつでもOK！）
//   }

//   // Q5: 適性（単一選択に変更）
//   if (answers.Q5) {
//     switch (answers.Q5) {
//       case 'steady_work':
//         scores['ライティング'] += 10;
//         scores['ブログ運営'] += 10;
//         scores['Web制作'] += 10;
//         scores['物販'] += 10;
//         break;
//       case 'creative_ideas':
//         scores['スキル販売'] += 10;
//         scores['SNS運用'] += 10;
//         scores['ブログ運営'] += 10;
//         scores['画像生成'] += 10;
//         break;
//       case 'creative_expression':
//         scores['デザイン'] += 10;
//         scores['サムネイル・バナー制作'] += 10;
//         scores['画像生成'] += 10;
//         scores['顔出し動画作成'] += 10;
//         break;
//       case 'communication':
//         scores['SNS運用'] += 10;
//         scores['スキル販売'] += 10;
//         scores['音声編集'] += 10;
//         break;
//       case 'technical_skills':
//         scores['プログラミング'] += 10;
//         scores['動画編集'] += 10;
//         scores['Web制作'] += 10;
//         scores['音声編集'] += 10;
//         break;
//     }
//   }

//   // Q6-1 & Q6-2: PC関連
//   if (answers.Q6_1 === 'no') {
//     Object.keys(scores).forEach(career => {
//       if (career !== '物販') scores[career] = 0;
//     });
//     scores['物販'] += 10;
//   } else if (answers.Q6_2) {
//     switch (answers.Q6_2) {
//       case 'confident':
//         scores['プログラミング'] += 10;
//         scores['Web制作'] += 10;
//         scores['動画編集'] += 10;
//         scores['音声編集'] += 10;
//         break;
//       case 'normal':
//         scores['ライティング'] += 10;
//         scores['ブログ運営'] += 10;
//         scores['スキル販売'] += 10;
//         break;
//     }
//   }

//   return scores;
// }

// // トップ3の職業を取得
// function getTop3Careers(scores) {
//   return Object.entries(scores)
//     .sort(([,a], [,b]) => b - a)
//     .slice(0, 3)
//     .map(([career, score]) => ({
//       ...CAREERS[career],
//       score
//     }));
// }

// // 診断開始
// function startCareerDiagnosis(userId) {
//   diagnosisSessions.set(userId, {
//     currentQuestion: 0,
//     answers: {}
//   });
  
//   return createDiagnosisQuestionMessage(0, userId);
// }

// // FlexMessage形式の質問メッセージ（選択状態見える化対応！）
// function createDiagnosisQuestionMessage(questionIndex, userId) {
//   const question = DIAGNOSIS_QUESTIONS[questionIndex];
//   const session = diagnosisSessions.get(userId);
  
//   console.log(`🔍 質問${questionIndex + 1}: type=${question.type}, id=${question.id}`);
  
//   // 複数選択の場合は最初からQuick Replyで表示
//   if (question.type === 'multiple') {
//     const selectedOptions = session?.answers[question.id] || [];
//     const selectedText = selectedOptions.length > 0 
//       ? question.options.filter(opt => selectedOptions.includes(opt.value)).map(opt => opt.text).join(', ')
//       : 'まだ選択されていません';

//     const remainingOptions = question.options.filter(opt => 
//       !selectedOptions.includes(opt.value)
//     );

//     const quickReplyItems = [
//       ...remainingOptions.slice(0, 12).map(opt => ({
//         type: 'action',
//         action: {
//           type: 'postback',
//           label: opt.text,
//           data: `dq=${questionIndex}&da=${opt.value}&multi=true`
//         }
//       })),
//       {
//         type: 'action',
//         action: {
//           type: 'postback',
//           label: '次の質問へ →',
//           data: `dnext=${questionIndex}`
//         }
//       }
//     ];

//     return {
//       type: 'text',
//       text: `🎯 質問${questionIndex + 1}/8\n${question.text}\n\n✅ 選択済み: ${selectedText}\n\n下から選択するか「次の質問へ」を押してください`,
//       quickReply: {
//         items: quickReplyItems
//       }
//     };
//   }
  
//   // 単一選択の場合は従来通りFlexMessage
//   const contents = {
//     type: 'bubble',
//     size: 'giga',
//     header: {
//       type: 'box',
//       layout: 'vertical',
//       contents: [
//         {
//           type: 'text',
//           text: `🎯 質問${questionIndex + 1}/8`,
//           weight: 'bold',
//           size: 'lg',
//           color: '#ffffff',
//           align: 'center'
//         }
//       ],
//       backgroundColor: '#1563f8',
//       paddingAll: 'lg'
//     },
//     body: {
//       type: 'box',
//       layout: 'vertical',
//       contents: [
//         {
//           type: 'text',
//           text: question.text,
//           weight: 'bold',
//           size: 'md',
//           wrap: true,
//           color: '#333333'
//         },
//         {
//           type: 'separator',
//           margin: 'lg'
//         },
//         {
//           type: 'box',
//           layout: 'vertical',
//           contents: question.options.map((option) => ({
//             type: 'button',
//             action: {
//               type: 'postback',
//               label: option.text,
//               data: `dq=${questionIndex}&da=${option.value}`
//             },
//             style: 'primary',
//             color: '#00bfff',
//             margin: 'sm',
//             height: 'sm'
//           })),
//           margin: 'lg',
//           spacing: 'sm'
//         }
//       ],
//       paddingAll: 'lg'
//     }
//   };

//   return {
//     type: 'flex',
//     altText: question.text,
//     contents
//   };
// }

// // 結果表示メッセージ作成（色統一版！）
// function createCareerResultMessage(top3Careers) {
//   const contents = {
//     type: 'bubble',
//     size: 'giga',
//     header: {
//       type: 'box',
//       layout: 'vertical',
//       contents: [
//         {
//           type: 'text',
//           text: '🎉 適職診断結果',
//           weight: 'bold',
//           size: 'xl',
//           color: '#ffffff',
//           align: 'center'
//         },
//         {
//           type: 'text',
//           text: 'あなたにピッタリの副業TOP3',
//           size: 'md',
//           color: '#ffffff',
//           align: 'center',
//           margin: 'sm'
//         }
//       ],
//       backgroundColor: '#1563f8', // 質問と同じ青に統一！
//       paddingAll: 'lg'
//     },
//     body: {
//       type: 'box',
//       layout: 'vertical',
//       contents: top3Careers.map((career, index) => ({
//         type: 'box',
//         layout: 'vertical',
//         contents: [
//           {
//             type: 'box',
//             layout: 'baseline',
//             contents: [
//               {
//                 type: 'text',
//                 text: ['🥇', '🥈', '🥉'][index],
//                 size: 'lg',
//                 flex: 1
//               },
//               {
//                 type: 'text',
//                 text: career.name,
//                 weight: 'bold',
//                 size: 'lg',
//                 color: '#333333',
//                 flex: 6
//               },
//               {
//                 type: 'text',
//                 text: `${career.score}pt`,
//                 size: 'sm',
//                 color: '#ff6b35',
//                 weight: 'bold',
//                 align: 'end',
//                 flex: 2
//               }
//             ]
//           },
//           {
//             type: 'text',
//             text: career.description,
//             size: 'sm',
//             color: '#666666',
//             wrap: true,
//             margin: 'sm'
//           },
//           {
//             type: 'box',
//             layout: 'baseline',
//             contents: [
//               {
//                 type: 'text',
//                 text: '難易度',
//                 size: 'xs',
//                 color: '#888888',
//                 flex: 2
//               },
//               {
//                 type: 'text',
//                 text: career.difficulty,
//                 size: 'xs',
//                 color: '#333333',
//                 flex: 3
//               }
//             ],
//             margin: 'sm'
//           },
//           {
//             type: 'box',
//             layout: 'baseline',
//             contents: [
//               {
//                 type: 'text',
//                 text: '稼げる度',
//                 size: 'xs',
//                 color: '#888888',
//                 flex: 2
//               },
//               {
//                 type: 'text',
//                 text: career.earning,
//                 size: 'xs',
//                 color: '#333333',
//                 flex: 3
//               }
//             ],
//             margin: 'xs'
//           }
//         ],
//         paddingAll: 'md',
//         backgroundColor: index === 0 ? '#fff3f0' : '#f8f9fa',
//         cornerRadius: 'md',
//         margin: index > 0 ? 'lg' : 'none'
//       })),
//       paddingAll: 'lg'
//     },
//     footer: {
//       type: 'box',
//       layout: 'vertical',
//       contents: [
//         {
//           type: 'button',
//           action: {
//             type: 'postback',
//             label: '🔄 もう一度診断する',
//             data: 'diagnosis_restart'
//           },
//           style: 'primary',
//           height: 'sm'
//         }
//       ],
//       paddingAll: 'lg'
//     }
//   };

//   return {
//     type: 'flex',
//     altText: '適職診断結果',
//     contents
//   };
// }

// // ✅ Webhook受信確認用エンドポイント（選択済みボタン対応完全版！）
// app.post('/webhook', async (req, res) => {
//   console.log('📩 Webhookリクエストが届きました！');
//   console.log('🧾 リクエストボディ:', JSON.stringify(req.body, null, 2));

//   // 簡易応答
//   res.sendStatus(200);

//   // イベント処理
//   if (Array.isArray(req.body.events)) {
//     for (const event of req.body.events) {
//       const userId = event.source.userId;
      
//       // 診断開始
//       if (event.type === 'message' && event.message.type === 'text') {
//         const userMessage = event.message.text;
//         console.log('💬 ユーザーの入力:', userMessage);

//         if (userMessage === '診断' || userMessage === '副業診断' || userMessage === '適職診断') {
//           const message = startCareerDiagnosis(userId);
//           await client.replyMessage(event.replyToken, message);
//           continue;
//         }
//       }

//       // 診断再開
//       if (event.type === 'postback' && event.postback.data === 'diagnosis_restart') {
//         const message = startCareerDiagnosis(userId);
//         await client.replyMessage(event.replyToken, message);
//         continue;
//       }

//       // 診断の回答処理
//       if (event.type === 'postback' && event.postback.data.startsWith('dq=')) {
//         console.log('🔍 受信したpostback data:', event.postback.data);
        
//         const data = new URLSearchParams(event.postback.data);
//         const questionIndex = parseInt(data.get('dq'));
//         const answer = data.get('da');
//         const isMultiple = data.get('multi') === 'true';

//         console.log('🔍 解析結果:', { questionIndex, answer, isMultiple });

//         const session = diagnosisSessions.get(userId);
//         if (!session) {
//           console.log('⚠️ セッションが見つかりません。userId:', userId);
//           await client.replyMessage(event.replyToken, {
//             type: 'text',
//             text: '診断を開始するには「診断」と入力してください。'
//           });
//           continue;
//         }

//         console.log('✅ セッション確認OK:', session);

//         const question = DIAGNOSIS_QUESTIONS[questionIndex];
        
//         if (isMultiple) {
//           // 複数選択の場合
//           if (!session.answers[question.id]) {
//             session.answers[question.id] = [];
//           }
          
//           if (session.answers[question.id].includes(answer)) {
//             session.answers[question.id] = session.answers[question.id].filter(a => a !== answer);
//           } else {
//             session.answers[question.id].push(answer);
//           }

//           // 選択済み項目の表示
//           const selectedOptions = question.options.filter(opt => 
//             session.answers[question.id].includes(opt.value)
//           );
//           const selectedText = selectedOptions.length > 0 
//             ? selectedOptions.map(opt => opt.text).join(', ') 
//             : 'まだ選択されていません';

//           // 未選択の項目でQuick Reply作成
//           const remainingOptions = question.options.filter(opt => 
//             !session.answers[question.id].includes(opt.value)
//           );

//           const quickReplyItems = [
//             // 未選択の選択肢
//             ...remainingOptions.map(opt => ({
//               type: 'action',
//               action: {
//                 type: 'postback',
//                 label: opt.text,
//                 data: `dq=${questionIndex}&da=${opt.value}&multi=true`
//               }
//             })),
//             // 次の質問へボタン
//             {
//               type: 'action',
//               action: {
//                 type: 'postback',
//                 label: '次の質問へ →',
//                 data: `dnext=${questionIndex}`
//               }
//             }
//           ];

//           const continueMessage = {
//             type: 'text',
//             text: `✅ 選択済み: ${selectedText}\n\n下から追加で選択するか「次の質問へ」を押してください`,
//             quickReply: {
//               items: quickReplyItems
//             }
//           };

//           await client.replyMessage(event.replyToken, continueMessage);
//           continue;
//         } else {
//           // 単一選択の場合
//           session.answers[question.id] = answer;
          
//           const nextQuestionIndex = questionIndex + 1;
          
//           if (nextQuestionIndex < DIAGNOSIS_QUESTIONS.length) {
//             const nextMessage = createDiagnosisQuestionMessage(nextQuestionIndex, userId);
//             await client.replyMessage(event.replyToken, nextMessage);
//             continue;
//           } else {
//             // 診断完了 - 結果表示
//             const scores = calculateCareerScores(session.answers);
//             const top3Careers = getTop3Careers(scores);
//             const resultMessage = createCareerResultMessage(top3Careers);
            
//             diagnosisSessions.delete(userId);
            
//             await client.replyMessage(event.replyToken, resultMessage);
//             continue;
//           }
//         }
//       }

//       // 「次の質問へ」の処理
//       if (event.type === 'postback' && event.postback.data.startsWith('dnext=')) {
//         const questionIndex = parseInt(event.postback.data.replace('dnext=', ''));
//         const nextQuestionIndex = questionIndex + 1;
        
//         if (nextQuestionIndex < DIAGNOSIS_QUESTIONS.length) {
//           const nextMessage = createDiagnosisQuestionMessage(nextQuestionIndex, userId);
//           await client.replyMessage(event.replyToken, nextMessage);
//         } else {
//           const session = diagnosisSessions.get(userId);
//           const scores = calculateCareerScores(session.answers);
//           const top3Careers = getTop3Careers(scores);
//           const resultMessage = createCareerResultMessage(top3Careers);
          
//           diagnosisSessions.delete(userId);
          
//           await client.replyMessage(event.replyToken, resultMessage);
//         }
//         continue;
//       }
//     }
//   }
// });

// // ポート指定
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`✅ 本番Bot起動完了 on port ${port}`);
// });




// 必要なモジュールをインポート
const express = require('express');
const { Client } = require('@line/bot-sdk');

const app = express();

// LINE Bot設定
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const client = new Client(config);

// JSONボディを使えるように（middleware削除中なので必要）
app.use(express.json());

// ===========================================
// 副業診断システム - 完全版
// ===========================================

// 診断データ構造
const CAREERS = {
  '物販': { name: '物販', difficulty: '★★☆', earning: '★★★', description: 'Amazon、メルカリなどでの商品販売' },
  'ライティング': { name: 'ライティング', difficulty: '★☆☆', earning: '★★☆', description: '記事執筆・コンテンツ作成' },
  'ブログ運営': { name: 'ブログ運営', difficulty: '★★☆', earning: '★★☆', description: '個人ブログでの収益化' },
  'SNS運用': { name: 'SNS運用代行', difficulty: '★★☆', earning: '★★★', description: '企業のSNSアカウント運用' },
  'スキル販売': { name: 'スキル販売', difficulty: '★☆☆', earning: '★★☆', description: 'ココナラ等でのスキル提供' },
  'デザイン': { name: 'デザイン', difficulty: '★★★', earning: '★★★', description: 'ロゴ・バナー等のデザイン制作' },
  'サムネイル・バナー制作': { name: 'サムネイル・バナー制作', difficulty: '★★☆', earning: '★★☆', description: 'YouTube等のサムネイル制作' },
  '画像生成': { name: '画像生成', difficulty: '★★☆', earning: '★★☆', description: 'AIを使った画像制作・販売' },
  '動画編集': { name: '動画編集', difficulty: '★★★', earning: '★★★', description: 'YouTube・企業動画の編集' },
  '顔出し動画作成': { name: '顔出し動画作成', difficulty: '★★★', earning: '★★★', description: '教育・エンタメ動画の制作' },
  '音声編集': { name: '音声編集', difficulty: '★★☆', earning: '★★☆', description: 'ポッドキャスト・音声コンテンツ制作' },
  'Web制作': { name: 'HTML/CSS', difficulty: '★★★', earning: '★★★', description: 'ウェブサイト制作・コーディング' },
  'プログラミング': { name: 'プログラミング', difficulty: '★★★★', earning: '★★★★', description: 'アプリ・システム開発' }
};

// 質問データ
const DIAGNOSIS_QUESTIONS = [
  {
    id: 'Q1',
    text: '副業に使える時間は？',
    type: 'single',
    options: [
      { text: '1時間未満', value: 'less_1h' },
      { text: '1〜2時間', value: '1_2h' },
      { text: '3〜4時間', value: '3_4h' },
      { text: '5時間以上', value: 'more_5h' }
    ]
  },
  {
    id: 'Q2_1',
    text: '専門知識はありますか？',
    type: 'single',
    options: [
      { text: 'ライティング', value: 'writing' },
      { text: 'デザイン', value: 'design' },
      { text: 'プログラミング', value: 'programming' },
      { text: 'SNSマーケティング', value: 'sns_marketing' },
      { text: '動画編集', value: 'video_editing' },
      { text: '音声編集', value: 'audio_editing' },
      { text: '英語（翻訳など）', value: 'english' },
      { text: '経理', value: 'accounting' },
      { text: 'これから勉強したい', value: 'learn_new' }
    ]
  },
  {
    id: 'Q2_2',
    text: '使ったことのあるAIツールは？（複数選択可）',
    type: 'multiple',
    options: [
      { text: 'ChatGPT', value: 'chatgpt' },
      { text: 'Claude', value: 'claude' },
      { text: 'Google Gemini', value: 'gemini' },
      { text: 'Perplexity', value: 'perplexity' },
      { text: 'Midjourney', value: 'midjourney' },
      { text: 'DALL·E 3', value: 'dalle3' },
      { text: 'Adobe Firefly', value: 'firefly' },
      { text: 'Leonardo', value: 'leonardo' },
      { text: 'Runway', value: 'runway' },
      { text: 'Whisper', value: 'whisper' },
      { text: 'Brew', value: 'brew' },
      { text: 'Canva', value: 'canva' },
      { text: '使ったことない', value: 'none' }
    ]
  },
  {
    id: 'Q3',
    text: '業務経験はありますか？（複数選択可）',
    type: 'multiple',
    options: [
      { text: '物販', value: 'sales' },
      { text: 'ライティング', value: 'writing' },
      { text: 'デザイン', value: 'design' },
      { text: '動画編集', value: 'video' },
      { text: 'SNS運用', value: 'sns' },
      { text: 'note販売', value: 'note' },
      { text: 'スキル販売', value: 'skill_sales' },
      { text: 'ブログ運営', value: 'blog' },
      { text: 'プログラミング', value: 'programming' },
      { text: 'HTML/CSS', value: 'html_css' },
      { text: '素材販売', value: 'material_sales' },
      { text: '未経験', value: 'none' }
    ]
  },
  {
    id: 'Q4',
    text: '副業できる時間帯・場所は？（複数選択可）',
    type: 'multiple',
    options: [
      { text: '平日昼', value: 'weekday_daytime' },
      { text: '平日夜', value: 'weekday_night' },
      { text: '土日祝', value: 'weekend_holiday' },
      { text: '在宅', value: 'home' },
      { text: '出勤', value: 'office' }
    ]
  },
  {
    id: 'Q5',
    text: 'どんな作業が得意ですか？',
    type: 'single',
    options: [
      { text: 'コツコツ進める作業', value: 'steady_work' },
      { text: 'アイデアや企画の発想', value: 'creative_ideas' },
      { text: '表現・創作系', value: 'creative_expression' },
      { text: '人とのやり取り', value: 'communication' },
      { text: '機械やツール操作', value: 'technical_skills' }
    ]
  },
  {
    id: 'Q6_1',
    text: 'PCは持っていますか？',
    type: 'single',
    options: [
      { text: 'はい', value: 'yes' },
      { text: 'いいえ', value: 'no' }
    ]
  },
  {
    id: 'Q6_2',
    text: 'PCスキルはどの程度ですか？',
    type: 'single',
    options: [
      { text: '自信あり', value: 'confident' },
      { text: '普通', value: 'normal' },
      { text: '自信なし', value: 'not_confident' }
    ]
  }
];

// セッション管理
const diagnosisSessions = new Map();

// 配点計算ロジック（AIツール配点強化版！）
function calculateCareerScores(answers) {
  let scores = {};
  
  // 全職業のスコアを0で初期化
  Object.keys(CAREERS).forEach(career => {
    scores[career] = 0;
  });

  // Q1: 時間による配点
  if (answers.Q1) {
    switch (answers.Q1) {
      case 'less_1h':
        scores['ライティング'] += 10;
        scores['SNS運用'] += 5;
        scores['物販'] += 20;
        break;
      case '1_2h':
        scores['ライティング'] += 20;
        scores['SNS運用'] += 15;
        scores['動画編集'] += 10;
        scores['Web制作'] += 10;
        scores['プログラミング'] += 5;
        scores['物販'] += 20;
        break;
      case '3_4h':
        scores['ライティング'] += 30;
        scores['SNS運用'] += 25;
        scores['動画編集'] += 25;
        scores['Web制作'] += 30;
        scores['プログラミング'] += 30;
        scores['物販'] += 20;
        break;
      case 'more_5h':
        Object.keys(scores).forEach(career => scores[career] += 20);
        break;
    }
  }

  // Q2-1: 専門知識
  if (answers.Q2_1) {
    switch (answers.Q2_1) {
      case 'writing': scores['ライティング'] += 100; break;
      case 'design': scores['デザイン'] += 100; break;
      case 'programming': scores['プログラミング'] += 100; break;
      case 'sns_marketing': scores['SNS運用'] += 100; break;
      case 'video_editing': scores['動画編集'] += 100; break;
      case 'audio_editing': scores['音声編集'] += 100; break;
      case 'english': scores['ライティング'] += 100; break;
      case 'accounting': scores['スキル販売'] += 100; break;
      case 'learn_new':
        Object.keys(scores).forEach(career => scores[career] += 5);
        break;
    }
  }

  // Q2-2: AIツール経験（配点大幅UP！稼ぎに直結🔥）
  if (answers.Q2_2 && Array.isArray(answers.Q2_2)) {
    answers.Q2_2.forEach(tool => {
      switch (tool) {
        case 'chatgpt':
        case 'claude':
          scores['ライティング'] += 30;
          scores['ブログ運営'] += 25;
          scores['スキル販売'] += 25;
          scores['プログラミング'] += 15;
          break;
        case 'gemini':
          scores['ブログ運営'] += 25;
          scores['ライティング'] += 25;
          scores['プログラミング'] += 15;
          break;
        case 'perplexity':
          scores['ブログ運営'] += 20;
          scores['ライティング'] += 15;
          break;
        case 'midjourney':
        case 'dalle3':
        case 'leonardo':
          scores['画像生成'] += 35;
          break;
        case 'firefly':
          scores['デザイン'] += 25;
          scores['画像生成'] += 30;
          break;
        case 'runway':
        case 'brew':
          scores['動画編集'] += 30;
          break;
        case 'did':
          scores['顔出し動画作成'] += 35;
          break;
        case 'whisper':
          scores['音声編集'] += 25;
          break;
        case 'canva':
          scores['デザイン'] += 20;
          scores['サムネイル・バナー制作'] += 25;
          scores['SNS運用'] += 15;
          break;
      }
    });
  }

  // Q3: 業務経験（複数選択対応）
  if (answers.Q3 && Array.isArray(answers.Q3)) {
    answers.Q3.forEach(experience => {
      switch (experience) {
        case 'sales': scores['物販'] += 100; break;
        case 'writing': scores['ライティング'] += 100; break;
        case 'design': scores['デザイン'] += 100; break;
        case 'video': scores['動画編集'] += 100; break;
        case 'sns': scores['SNS運用'] += 100; break;
        case 'note': scores['ブログ運営'] += 100; break;
        case 'skill_sales': scores['スキル販売'] += 100; break;
        case 'blog': scores['ブログ運営'] += 100; break;
        case 'programming': scores['プログラミング'] += 100; break;
        case 'html_css': scores['Web制作'] += 100; break;
        case 'material_sales': scores['画像生成'] += 100; break;
      }
    });
  }

  // Q4: 時間帯・場所制限（修正版）
  if (answers.Q4) {
    if (!answers.Q4.includes('home')) {
      // 在宅が選ばれていない場合、全てのスコアを0に
      Object.keys(scores).forEach(career => scores[career] = 0);
    }
    if (answers.Q4.includes('office') && !answers.Q4.includes('home')) {
      // 出勤のみで在宅なしの場合、物販以外を0に
      Object.keys(scores).forEach(career => {
        if (career !== '物販') scores[career] = 0;
      });
    }
    // SNS運用は時間帯制限なし（いつでもOK！）
  }

  // Q5: 適性（単一選択に変更）
  if (answers.Q5) {
    switch (answers.Q5) {
      case 'steady_work':
        scores['ライティング'] += 10;
        scores['ブログ運営'] += 10;
        scores['Web制作'] += 10;
        scores['物販'] += 10;
        break;
      case 'creative_ideas':
        scores['スキル販売'] += 10;
        scores['SNS運用'] += 10;
        scores['ブログ運営'] += 10;
        scores['画像生成'] += 10;
        break;
      case 'creative_expression':
        scores['デザイン'] += 10;
        scores['サムネイル・バナー制作'] += 10;
        scores['画像生成'] += 10;
        scores['顔出し動画作成'] += 10;
        break;
      case 'communication':
        scores['SNS運用'] += 10;
        scores['スキル販売'] += 10;
        scores['音声編集'] += 10;
        break;
      case 'technical_skills':
        scores['プログラミング'] += 10;
        scores['動画編集'] += 10;
        scores['Web制作'] += 10;
        scores['音声編集'] += 10;
        break;
    }
  }

  // Q6-1 & Q6-2: PC関連
  if (answers.Q6_1 === 'no') {
    Object.keys(scores).forEach(career => {
      if (career !== '物販') scores[career] = 0;
    });
    scores['物販'] += 10;
  } else if (answers.Q6_2) {
    switch (answers.Q6_2) {
      case 'confident':
        scores['プログラミング'] += 10;
        scores['Web制作'] += 10;
        scores['動画編集'] += 10;
        scores['音声編集'] += 10;
        break;
      case 'normal':
        scores['ライティング'] += 10;
        scores['ブログ運営'] += 10;
        scores['スキル販売'] += 10;
        break;
    }
  }

  return scores;
}

// トップ3の職業を取得
function getTop3Careers(scores) {
  return Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([career, score]) => ({
      ...CAREERS[career],
      score
    }));
}

// 診断開始
function startCareerDiagnosis(userId) {
  diagnosisSessions.set(userId, {
    currentQuestion: 0,
    answers: {}
  });
  
  return createDiagnosisQuestionMessage(0, userId);
}

// FlexMessage形式の質問メッセージ（選択状態見える化対応！）
function createDiagnosisQuestionMessage(questionIndex, userId) {
  const question = DIAGNOSIS_QUESTIONS[questionIndex];
  const session = diagnosisSessions.get(userId);
  
  console.log(`🔍 質問${questionIndex + 1}: type=${question.type}, id=${question.id}`);
  
  // 複数選択の場合は選択肢をテキスト表示、Quick Replyで選択
  if (question.type === 'multiple') {
    const selectedOptions = session?.answers[question.id] || [];
    const selectedText = selectedOptions.length > 0 
      ? question.options.filter(opt => selectedOptions.includes(opt.value)).map(opt => opt.text).join(', ')
      : 'まだ選択されていません';

    const remainingOptions = question.options.filter(opt => 
      !selectedOptions.includes(opt.value)
    );

    const quickReplyItems = [
      ...remainingOptions.slice(0, 12).map(opt => ({
        type: 'action',
        action: {
          type: 'postback',
          label: opt.text,
          data: `dq=${questionIndex}&da=${opt.value}&multi=true`
        }
      }))
    ];
    
    // FlexMessage形式（選択肢はテキスト、次の質問へはボタン）
    const contents = {
      type: 'bubble',
      size: 'giga',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `🎯 質問${questionIndex + 1}/8`,
            weight: 'bold',
            size: 'lg',
            color: '#ffffff',
            align: 'center'
          }
        ],
        backgroundColor: '#1563f8',
        paddingAll: 'lg'
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: question.text,
            weight: 'bold',
            size: 'md',
            wrap: true,
            color: '#333333'
          },
          {
            type: 'separator',
            margin: 'lg'
          },
          {
            type: 'text',
            text: `✅ 選択済み: ${selectedText}`,
            size: 'sm',
            color: '#666666',
            wrap: true,
            margin: 'lg'
          },
          {
            type: 'text',
            text: '💡 下のボタンから選択してください',
            size: 'xs',
            color: '#888888',
            align: 'center',
            margin: 'md'
          }
        ],
        paddingAll: 'lg'
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '次の質問へ →',
              data: `dnext=${questionIndex}`
            },
            style: 'primary',
            color: '#1563f8',
            height: 'sm'
          }
        ],
        paddingAll: 'lg'
      }
    };

    return {
      type: 'flex',
      altText: question.text,
      contents,
      quickReply: quickReplyItems.length > 0 ? {
        items: quickReplyItems
      } : undefined
    };
  }
  
  // 単一選択の場合は従来通りFlexMessage
  const contents = {
    type: 'bubble',
    size: 'giga',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: `🎯 質問${questionIndex + 1}/8`,
          weight: 'bold',
          size: 'lg',
          color: '#ffffff',
          align: 'center'
        }
      ],
      backgroundColor: '#1563f8',
      paddingAll: 'lg'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: question.text,
          weight: 'bold',
          size: 'md',
          wrap: true,
          color: '#333333'
        },
        {
          type: 'separator',
          margin: 'lg'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: question.options.map((option) => ({
            type: 'button',
            action: {
              type: 'postback',
              label: option.text,
              data: `dq=${questionIndex}&da=${option.value}`
            },
            style: 'primary',
            color: '#00bfff',
            margin: 'sm',
            height: 'sm'
          })),
          margin: 'lg',
          spacing: 'sm'
        }
      ],
      paddingAll: 'lg'
    }
  };

  return {
    type: 'flex',
    altText: question.text,
    contents
  };
}

// 結果表示メッセージ作成（色統一版！）
function createCareerResultMessage(top3Careers) {
  const contents = {
    type: 'bubble',
    size: 'giga',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '🎉 適職診断結果',
          weight: 'bold',
          size: 'xl',
          color: '#ffffff',
          align: 'center'
        },
        {
          type: 'text',
          text: 'あなたにピッタリの副業TOP3',
          size: 'md',
          color: '#ffffff',
          align: 'center',
          margin: 'sm'
        }
      ],
      backgroundColor: '#1563f8', // 質問と同じ青に統一！
      paddingAll: 'lg'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: top3Careers.map((career, index) => ({
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: ['🥇', '🥈', '🥉'][index],
                size: 'lg',
                flex: 1
              },
              {
                type: 'text',
                text: career.name,
                weight: 'bold',
                size: 'lg',
                color: '#333333',
                flex: 6
              },
              {
                type: 'text',
                text: `${career.score}pt`,
                size: 'sm',
                color: '#ff6b35',
                weight: 'bold',
                align: 'end',
                flex: 2
              }
            ]
          },
          {
            type: 'text',
            text: career.description,
            size: 'sm',
            color: '#666666',
            wrap: true,
            margin: 'sm'
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: '難易度',
                size: 'xs',
                color: '#888888',
                flex: 2
              },
              {
                type: 'text',
                text: career.difficulty,
                size: 'xs',
                color: '#333333',
                flex: 3
              }
            ],
            margin: 'sm'
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: '稼げる度',
                size: 'xs',
                color: '#888888',
                flex: 2
              },
              {
                type: 'text',
                text: career.earning,
                size: 'xs',
                color: '#333333',
                flex: 3
              }
            ],
            margin: 'xs'
          }
        ],
        paddingAll: 'md',
        backgroundColor: index === 0 ? '#fff3f0' : '#f8f9fa',
        cornerRadius: 'md',
        margin: index > 0 ? 'lg' : 'none'
      })),
      paddingAll: 'lg'
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '🔄 もう一度診断する',
            data: 'diagnosis_restart'
          },
          style: 'primary',
          height: 'sm'
        }
      ],
      paddingAll: 'lg'
    }
  };

  return {
    type: 'flex',
    altText: '適職診断結果',
    contents
  };
}

// ✅ Webhook受信確認用エンドポイント（選択済みボタン対応完全版！）
app.post('/webhook', async (req, res) => {
  console.log('📩 Webhookリクエストが届きました！');
  console.log('🧾 リクエストボディ:', JSON.stringify(req.body, null, 2));

  // 簡易応答
  res.sendStatus(200);

  // イベント処理
  if (Array.isArray(req.body.events)) {
    for (const event of req.body.events) {
      const userId = event.source.userId;
      
      // 診断開始
      if (event.type === 'message' && event.message.type === 'text') {
        const userMessage = event.message.text;
        console.log('💬 ユーザーの入力:', userMessage);

        if (userMessage === '診断' || userMessage === '副業診断' || userMessage === '適職診断') {
          const message = startCareerDiagnosis(userId);
          await client.replyMessage(event.replyToken, message);
          continue;
        }
      }

      // 診断再開
      if (event.type === 'postback' && event.postback.data === 'diagnosis_restart') {
        const message = startCareerDiagnosis(userId);
        await client.replyMessage(event.replyToken, message);
        continue;
      }

      // 診断の回答処理
      if (event.type === 'postback' && event.postback.data.startsWith('dq=')) {
        console.log('🔍 受信したpostback data:', event.postback.data);
        
        const data = new URLSearchParams(event.postback.data);
        const questionIndex = parseInt(data.get('dq'));
        const answer = data.get('da');
        const isMultiple = data.get('multi') === 'true';

        console.log('🔍 解析結果:', { questionIndex, answer, isMultiple });

        const session = diagnosisSessions.get(userId);
        if (!session) {
          console.log('⚠️ セッションが見つかりません。userId:', userId);
          await client.replyMessage(event.replyToken, {
            type: 'text',
            text: '診断を開始するには「診断」と入力してください。'
          });
          continue;
        }

        console.log('✅ セッション確認OK:', session);

        const question = DIAGNOSIS_QUESTIONS[questionIndex];
        
        if (isMultiple) {
          // 複数選択の場合
          if (!session.answers[question.id]) {
            session.answers[question.id] = [];
          }
          
          if (session.answers[question.id].includes(answer)) {
            session.answers[question.id] = session.answers[question.id].filter(a => a !== answer);
          } else {
            session.answers[question.id].push(answer);
          }

          // 選択済み項目の表示
          const selectedOptions = question.options.filter(opt => 
            session.answers[question.id].includes(opt.value)
          );
          const selectedText = selectedOptions.length > 0 
            ? selectedOptions.map(opt => opt.text).join(', ') 
            : 'まだ選択されていません';

          // 未選択の項目でQuick Reply作成
          const remainingOptions = question.options.filter(opt => 
            !session.answers[question.id].includes(opt.value)
          );

          const quickReplyItems = [
            // 未選択の選択肢
            ...remainingOptions.map(opt => ({
              type: 'action',
              action: {
                type: 'postback',
                label: opt.text,
                data: `dq=${questionIndex}&da=${opt.value}&multi=true`
              }
            })),
            // 次の質問へボタン
            {
              type: 'action',
              action: {
                type: 'postback',
                label: '次の質問へ →',
                data: `dnext=${questionIndex}`
              }
            }
          ];

          const continueMessage = {
            type: 'text',
            text: `✅ 選択済み: ${selectedText}\n\n下から追加で選択するか「次の質問へ」を押してください`,
            quickReply: {
              items: quickReplyItems
            }
          };

          await client.replyMessage(event.replyToken, continueMessage);
          continue;
        } else {
          // 単一選択の場合
          session.answers[question.id] = answer;
          
          const nextQuestionIndex = questionIndex + 1;
          
          if (nextQuestionIndex < DIAGNOSIS_QUESTIONS.length) {
            const nextMessage = createDiagnosisQuestionMessage(nextQuestionIndex, userId);
            await client.replyMessage(event.replyToken, nextMessage);
            continue;
          } else {
            // 診断完了 - 結果表示
            const scores = calculateCareerScores(session.answers);
            const top3Careers = getTop3Careers(scores);
            const resultMessage = createCareerResultMessage(top3Careers);
            
            diagnosisSessions.delete(userId);
            
            await client.replyMessage(event.replyToken, resultMessage);
            continue;
          }
        }
      }

      // 「次の質問へ」の処理
      if (event.type === 'postback' && event.postback.data.startsWith('dnext=')) {
        const questionIndex = parseInt(event.postback.data.replace('dnext=', ''));
        const nextQuestionIndex = questionIndex + 1;
        
        if (nextQuestionIndex < DIAGNOSIS_QUESTIONS.length) {
          const nextMessage = createDiagnosisQuestionMessage(nextQuestionIndex, userId);
          await client.replyMessage(event.replyToken, nextMessage);
        } else {
          const session = diagnosisSessions.get(userId);
          const scores = calculateCareerScores(session.answers);
          const top3Careers = getTop3Careers(scores);
          const resultMessage = createCareerResultMessage(top3Careers);
          
          diagnosisSessions.delete(userId);
          
          await client.replyMessage(event.replyToken, resultMessage);
        }
        continue;
      }
    }
  }
});

// ポート指定
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ 本番Bot起動完了 on port ${port}`);
});