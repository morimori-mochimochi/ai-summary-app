import React, { useState } from 'react';

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