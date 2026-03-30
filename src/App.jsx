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

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError('APIキーが設定されていません。.envファイルにVITE_GEMINI_API_KEYを設定してください。');
      setIsLoading(false);
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // webで利用可能なモデルを指定
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

    try {
      const response = await model.generateContent(text);
      setSummary(response.response.text());
    } catch (error) {
      console.error(error);
      setError("エラーが発生しました: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <h1>AIアプリ</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここに質問を入れてください"
      />
      <button onClick={handleSummarize} disabled={isLoading}>
        { isLoading ? '考え中...' : '送信する' }
      </button>
      {error && <div className="error">{error}</div>}
      {summary && (
        <div className="summary">
          <h2>結果：</h2>
          <p>{summary}</p>
        </div>
      )}  
    </div>
  );
}

export default App;
