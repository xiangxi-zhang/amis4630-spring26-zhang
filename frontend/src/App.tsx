import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // Challenge 4: 用于显示加载动画
  const [error, setError] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [personalizedMessage, setPersonalizedMessage] = useState<string>('');
  
  // ⭐ Challenge 1 & 2: 状态记录
  const [callCount, setCallCount] = useState<number>(0);
  const [apiTime, setApiTime] = useState<string>('');

  // 这里的端口请确保是你跑通的那个（如果是7000就改7000，并加https）
  const API_BASE = 'http://localhost:5000/api/hello'; 

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to connect to .NET API');
        setLoading(false);
      });
  }, []);

  // 通用的 Fetch 函数，整合 Challenge 3 & 4
  const handleFetch = async (url: string) => {
    setLoading(true); // 开始加载
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Endpoint Not Found'); // Challenge 3: 处理 404
      
      const data = await response.json();
      setPersonalizedMessage(data.message);
      
      // ⭐ Challenge 1: 格式化时间戳
      setApiTime(new Date(data.timestamp).toLocaleString()); 
      
      // ⭐ Challenge 2: 累加计数
      setCallCount(prev => prev + 1); 
    } catch (err) {
      alert('Error: ' + (err as Error).message); // Challenge 3: 报错弹窗
    } finally {
      setLoading(false); // 结束加载
    }
  };

  if (error) return <div className="app error"><h1>❌ {error}</h1></div>;

  return (
    <div className="app">
      <h1>🚀 Full-Stack Challenge Master</h1>
      
      {/* Challenge 4: 加载转圈圈效果 */}
      {loading && <div className="loading-overlay">⏳ Fetching Data...</div>}

      <div className="card">
        <h3>Default Message:</h3>
        <p>{message}</p>
        <div className="stats">
          <p>Total API Calls: <strong>{callCount}</strong></p>
          {apiTime && <p>Last Server Time: {apiTime}</p>}
        </div>
      </div>

      <div className="card interactive">
        <input 
          value={nameInput} 
          onChange={(e) => setNameInput(e.target.value)} 
          placeholder="Enter name" 
        />
        <br />
        {/* 调用个性化接口 */}
        <button onClick={() => handleFetch(`${API_BASE}/personalized?name=${nameInput}`)}>
          Get Greeting
        </button>
        
        {/* Challenge 5: 调用新接口 */}
        <button onClick={() => handleFetch(`${API_BASE}/goodbye`)} style={{backgroundColor: '#666'}}>
          Say Goodbye
        </button>
        
        {/* Challenge 3: 故意调用不存在的接口测试报错 */}
        <button onClick={() => handleFetch(`${API_BASE}/non-existent`)} style={{backgroundColor: '#e74c3c'}}>
          Test Error 404
        </button>

        {personalizedMessage && <p className="message-box">{personalizedMessage}</p>}
      </div>
    </div>
  );
}

export default App;
