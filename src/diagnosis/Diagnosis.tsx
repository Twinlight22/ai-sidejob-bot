// src/diagnosis/DiagnosisPage.tsx

import React from "react";

const DiagnosisPage = () => {
  return (
    <div className="min-h-screen bg-green-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-lg font-semibold mb-4 text-center text-gray-800">
          はじめてのAI副業ナビ
        </h1>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="text-gray-700 mb-2 font-medium">Q1. 副業に使える時間は？</p>
          <div className="space-y-3">
            <button className="w-full bg-white border border-gray-300 rounded-full py-2 px-4 text-left hover:bg-gray-100 transition">
              毎日1〜2時間
            </button>
            <button className="w-full bg-white border border-gray-300 rounded-full py-2 px-4 text-left hover:bg-gray-100 transition">
              週3〜4日、1日3時間程度
            </button>
            <button className="w-full bg-white border border-gray-300 rounded-full py-2 px-4 text-left hover:bg-gray-100 transition">
              週末のみ
            </button>
          </div>
        </div>
        <p className="text-sm text-center text-gray-500">※ あなたに合った副業を診断します</p>
      </div>
    </div>
  );
};

export default DiagnosisPage;
