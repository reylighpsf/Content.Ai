'use client';

import React, { useEffect, useState } from 'react';

interface HistoryItem {
  id: string;
  prompt: string;
  response: string;
  timestamp: number;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const storedHistory = localStorage.getItem('contentAIHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="history-container">
      <h2 className="history-title">Riwayat Konten</h2>

      {history.length === 0 ? (
        <div className="history-empty">
          <p>Belum ada riwayat konten yang dibuat.</p>
          <p>Mulai buat konten untuk melihatnya di sini.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-item-header">
                <div className="history-item-prompt">
                  <strong>Prompt:</strong> {truncateText(item.prompt, 100)}
                </div>
                <div className="history-item-date">
                  {formatDate(item.timestamp)}
                </div>
              </div>
              <div className="history-item-response">
                <strong>Response:</strong> {truncateText(item.response, 200)}
              </div>
              <div className="history-item-actions">
                <button className="history-btn-view">Lihat Lengkap</button>
                <button className="history-btn-copy">Salin</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
