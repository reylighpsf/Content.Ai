'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Send,
  Image as ImageIcon,
  Lightbulb,
} from 'lucide-react';
import Header from './Header';
import '../search.css';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  image?: {
    base64: string;
    mimeType: string;
  };
}


export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const hasInitialized = useRef(false);
  const idCounter = useRef(0);

  const generateId = useCallback(() => `msg-${idCounter.current++}`, []);

  const query = searchParams.get('q');

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔥 VISION STATE
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* ================= FILE → BASE64 ================= */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  /* ================= AI CALL ================= */
  const generateAI = useCallback(
    async (prompt: string, image?: string | null, mimeType?: string) => {
      setLoading(true);

      const assistantId = generateId();

      setMessages(prev => [
        ...prev,
        { id: assistantId, type: 'assistant', text: '' },
      ]);

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            imageBase64: image,
            mimeType: mimeType || 'image/jpeg',
          }),
        });

        if (!res.body) throw new Error('No response stream');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantId
                ? { ...msg, text: msg.text + chunk }
                : msg
            )
          );
        }
      } catch (err) {
        console.error(err);
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantId
              ? { ...msg, text: '❌ Gagal memuat respon AI.' }
              : msg
          )
        );
      } finally {
        setLoading(false);
      }
    },
    [generateId]
  );

  /* ================= LOAD QUERY + SESSION IMAGE ================= */
useEffect(() => {
  if (!query) return;
  if (hasInitialized.current) return; // ⛔ STOP DUPLIKASI
  hasInitialized.current = true;

  const payload = sessionStorage.getItem('vision_payload');

  let img: string | null = null;
  let mime: string | undefined;

  if (payload) {
    try {
      const parsed = JSON.parse(payload);
      img = parsed.imageBase64 ?? null;
      mime = parsed.mimeType;
      sessionStorage.removeItem('vision_payload');
    } catch {}
  }

  setImageBase64(img);

  setMessages([
    {
      id: generateId(),
      type: 'user',
      text: query,
      image: img
        ? { base64: img, mimeType: mime ?? 'image/jpeg' }
        : undefined,
    },
  ]);

  generateAI(query, img, mime);
}, [query, generateAI, generateId]);


  /* ================= SEND ================= */
const handleSend = () => {
  if (!inputText.trim() || loading) return;

  const text = inputText;
  const img = imageBase64;

  setInputText('');
  setImageBase64(null); // 🔥 reset composer preview

  setMessages(prev => [
    ...prev,
    {
      id: generateId(),
      type: 'user',
      text,
      image: img
        ? {
            base64: img,
            mimeType: 'image/jpeg',
          }
        : undefined,
    },
  ]);

  generateAI(text, img);
};

  /* ================= IMAGE PICKER ================= */
  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Hanya gambar yang didukung');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Maksimal 5MB');
      return;
    }

    const base64 = await fileToBase64(file);
    setImageBase64(base64);

    // auto prompt
    if (!inputText) {
      setInputText('Buat caption Instagram dari gambar ini');
    }
  };

  return (
    <div className="search-page">
      <Header />

      <main className="search-main">
        <div className="search-chat-container">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`message-wrapper ${
                msg.type === 'user'
                  ? 'message-wrapper-user'
                  : 'message-wrapper-assistant'
              }`}
            >
               <div
                className={`message-bubble ${
                  msg.type === 'user'
                    ? 'message-bubble-user'
                    : 'message-bubble-assistant'
                }`}
              >
                {msg.type === 'user' && msg.image && (
                  <Image
                    src={`data:${msg.image.mimeType};base64,${msg.image.base64}`}
                    alt="User upload"
                    className="chat-image"
                    width={512}
                    height={384}
                    unoptimized
                  />
                )}
                
            
              
                {/* TEXT */}
                {msg.type === 'assistant' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>

            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        
        <footer className="search-footer">
          <div className="search-input-container">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ajukan pertanyaan..."
              rows={1}
              className="search-textarea"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            <div className="search-input-actions">
              <div className="search-input-actions-left">
                <IconBtn icon={<ImageIcon size={18} />} onClick={handlePickImage} />
                <IconBtn icon={<Lightbulb size={18} />} />
              </div>

              <div className="search-input-actions-right">
                <IconBtn
                  icon={<Send size={18} />}
                  onClick={handleSend}
                  disabled={!inputText.trim() || loading}
                />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */
function IconBtn({
  icon,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="icon-button"
      type="button"
    >
      {icon}
    </button>
  );
}
