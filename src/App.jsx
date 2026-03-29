import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App () {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!text) {
      setError('文章を入力してください');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary('');

    const apiKey = import.meta.env.GEMLNI_API_KEY
    const genAI = new GoogleGeneratineAI(apiKey);

    // webで利用可能なモデルを指定
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    try {
      const response = await model.generateContent(input || "Explain how AI works");
      setResult(response.response.text());
    } catch (error) {
      console.error(error);
      setResult("エラーが発生しました: " + error.message);
    }
  };
  return (
    <div className="container">
      <h1>AI要約アプリ</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここに要約したい文章を入れてください"
      />
      <button onClick={handleSummarize} disabled={isLoading}>
        { isLoading ? '要約中...' : '要約する' }
      </button>
      {error && <div className="error">{error}</div>}
      {summary && (
        <div className="summary">
          <h2>要約結果：</h2>
          <p>{summary}</p>
        </div>
      )}  
    </div>
  );
}

export default App;
