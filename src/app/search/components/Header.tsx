import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import '../search.css';


function Header() {
  const [activeTab, setActiveTab] = useState('jawaban');

  const tabs = [
    { id: 'jawaban', icon: '💬', label: 'Jawaban' },
    { id: 'tautan', icon: '🌐', label: 'Tautan' },
    { id: 'gambar', icon: '🖼️', label: 'Gambar' }
  ];

  return (
    <header className="search-header">
      <div className="search-header-content">
        <div className="search-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`search-tab ${activeTab === tab.id ? 'search-tab-active' : ''}`}
            >
              <span className="search-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <button className="download-button">
          <Upload size={16} />
          <span>Unduh Comet</span>
        </button>
      </div>
    </header>
  );
}

export default Header;