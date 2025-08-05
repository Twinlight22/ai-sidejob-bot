// src/App.tsx

import React from 'react';
import Diagnosis from './diagnosis/Diagnosis';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="text-center py-6 border-b">
        <h1 className="text-2xl font-bold">はじめてのAI副業診断</h1>
      </header>
      <main className="py-8">
        <Diagnosis />
      </main>
    </div>
  );
};

export default App;
