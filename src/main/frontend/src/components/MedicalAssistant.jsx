import React, { useState } from 'react';
import api from '../api';
import './MedicalAssistant.css';

const MedicalAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const welcome = '您好，我是医疗小助手，可以回答常见疾病咨询并提供就诊指引，您可以问我症状疑问或预约流程。';

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && !initialized) {
      setMessages([{ role: 'assistant', content: welcome }]);
      setInitialized(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    try {
      const apiMessages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...newMessages,
      ];
      const res = await api.post('/assistant/chat', {
        model: 'deepseek-chat',
        messages: apiMessages,
        stream: false,
      });
      const reply = res || '无法获取回复';
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
