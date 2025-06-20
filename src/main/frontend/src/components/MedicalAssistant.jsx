import React, { useState } from 'react';
import axios from 'axios';
import './MedicalAssistant.css';

const MedicalAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const toggle = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    try {
      const apiMessages = [
        { role: 'system', content: 'You are a helpful medical assistant.' },
        ...newMessages,
      ];
      const res = await axios.post(
        'https://api.deepseek.com/chat/completions',
        {
          model: 'deepseek-chat',
          messages: apiMessages,
          stream: false,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const reply = res.data.choices?.[0]?.message?.content || '无法获取回复';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: '请求失败' }]);
    }
  };

  return (
    <div className="medical-assistant-container">
      {open && (
        <div className="assistant-panel">
          <div className="assistant-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`msg ${m.role}`}>{m.content}</div>
            ))}
          </div>
          <div className="assistant-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="请输入咨询内容"
            />
            <button onClick={sendMessage}>发送</button>
          </div>
        </div>
      )}
      <button className="assistant-toggle" onClick={toggle} aria-label="医疗助手">
        {open ? '✖' : '🤖'}
      </button>
    </div>
  );
};

export default MedicalAssistant;
