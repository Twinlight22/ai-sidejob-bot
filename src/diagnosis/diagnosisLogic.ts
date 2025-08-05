// diagnosisLogic.ts

export type AnswerSet = {
  q1: string; // 副業に使える時間
  q2_1: string[]; // 専門知識（知識編）
  q2_2: string[]; // 専門知識（ツール編）
  q3: string[]; // 副業経験
  q4: string[]; // 就業スタイル
  q5: string; // 適性
  q6_1: string; // パソコン保有
  q6_2: string; // パソコンスキル
};

export type JobType = 'クリエイティブ系' | 'コツコツ系' | '技術系' | 'ライティング系' | '初心者OK系';

export type DiagnosisResult = {
  top3: JobType[];
  scores: Record<JobType, number>;
};

const initialScores: Record<JobType, number> = {
  クリエイティブ系: 0,
  コツコツ系: 0,
  技術系: 0,
  ライティング系: 0,
  初心者OK系: 0,
};

export function calculateDiagnosis(answers: AnswerSet): DiagnosisResult {
  const scores = { ...initialScores };

  // Q1: 時間
  if (answers.q1 === '3時間以上') scores.技術系 += 2;
  if (answers.q1 === '1〜3時間') scores.ライティング系 += 1;
  if (answers.q1 === '1時間') scores.コツコツ系 += 1;

  // Q2-1: 知識
  answers.q2_1.forEach((skill) => {
    if (skill === 'プログラミング') scores.技術系 += 3;
    if (skill === 'デザイン') scores.クリエイティブ系 += 3;
    if (skill === 'ライティング') scores.ライティング系 += 3;
  });

  // Q2-2: ツール
  if (answers.q2_2.length >= 5) scores.技術系 += 2;
  if (answers.q2_2.includes('Midjourney')) scores.クリエイティブ系 += 2;
  if (answers.q2_2.includes('ChatGPT')) scores.ライティング系 += 1;

  // Q3: 副業経験
  if (answers.q3.length === 0) scores.初心者OK系 += 3;
  if (answers.q3.includes('動画編集')) scores.クリエイティブ系 += 2;
  if (answers.q3.includes('アフィリエイト')) scores.ライティング系 += 1;

  // Q4: 就業スタイル
  if (answers.q4.includes('在宅')) {
    scores.ライティング系 += 1;
    scores.技術系 += 1;
  }
  if (answers.q4.includes('平日日中')) scores.初心者OK系 += 1;
  if (answers.q4.includes('夜間')) scores.コツコツ系 += 1;

  // Q5: 適性
  if (answers.q5 === 'クリエイティブ系') scores.クリエイティブ系 += 2;
  if (answers.q5 === 'コツコツ系') scores.コツコツ系 += 2;
  if (answers.q5 === '技術系') scores.技術系 += 2;

  // Q6-1: パソコン保有
  if (answers.q6_1 === 'No') scores.初心者OK系 += 3;

  // Q6-2: スキル
  if (answers.q6_2 === '使える') scores.技術系 += 2;
  if (answers.q6_2 === '少し自信がない') scores.初心者OK系 += 1;
  if (answers.q6_2 === '使えない') scores.初心者OK系 += 2;

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([type]) => type as JobType);

  return {
    top3: sorted.slice(0, 3),
    scores,
  };
}
