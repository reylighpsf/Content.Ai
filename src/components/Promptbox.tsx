'use client'

import React, { useState, KeyboardEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation';

interface PromptboxProps {
  onSubmit?: (prompt: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function Promptbox({ 
  placeholder = "Tanya apa saja...",
  disabled = false 
}: PromptboxProps) {
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading || disabled) return;
  
    setIsLoading(true);
  
    try {
      let imageBase64: string | null = null;
      let mimeType: string | null = null;

      if (attachedFile && isImageFile(attachedFile)) {
        imageBase64 = await fileToBase64(attachedFile);
        mimeType = attachedFile.type;
      }


      // ⬅️ arahkan ke search dengan state
      sessionStorage.setItem(
        'vision_payload',
        JSON.stringify({
          imageBase64,
          mimeType,
        })
      );
      
    
      router.push(`/search?q=${encodeURIComponent(prompt)}`);
    
      setPrompt('');
      setAttachedFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  
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


  // Handle Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Handle file attachment (placeholder)
  const handleAttachFile = () => {
    if (disabled || isLoading) return;
    fileInputRef.current?.click();
  };


  // Handle focus mode (placeholder)
  const handleFocusMode = () => {
    if (disabled || isLoading) return;
    console.log('Focus mode clicked');
    // Implement focus mode logic here
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // 🔒 Batasi ukuran (contoh 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Ukuran file maksimal 5MB');
    return;
  }

  setAttachedFile(file);
};


  // Handle quick suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    if (disabled || isLoading) return;
    setPrompt(suggestion);
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setPrompt(event.target.value);
  }

  // Helper function to check if file is image
  const isImageFile = (file: File) => {
    return file.type.startsWith('image/');
  };

  // Handle remove file
  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="prompt-container">
      {/* File Preview */}
      {attachedFile && (
        <div className="prompt-file-preview">
          {isImageFile(attachedFile) ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(attachedFile)}
                alt={attachedFile.name}
                className="prompt-image-preview"
              />
            </>
          ) : (
            <div className="prompt-file-item">
              <span className="prompt-file-icon">📄</span>
              <span className="prompt-file-name">{attachedFile.name}</span>
            </div>
          )}

          <button
            className="prompt-file-remove"
            onClick={handleRemoveFile}
            title="Hapus file"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Prompt Box */}
      <div className={`prompt-box ${isLoading ? 'loading' : ''}`}>
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="prompt-input"
          disabled={disabled || isLoading}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
          hidden
          onChange={handleFileChange}
        />
        <div className="prompt-actions">
          {/* Attach File Icon */}
          <button 
            className="prompt-icon" 
            onClick={handleAttachFile}
            disabled={disabled || isLoading} 
            title="Lampirkan file"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>
          
          {/* Focus Mode Icon */}
          <button 
            className="prompt-icon" 
            onClick={handleFocusMode}
            disabled={disabled || isLoading} 
            title="Mode fokus"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6M1 12h6m6 0h6"/>
            </svg>
          </button>
          
          {/* Enter Key Indicator */}
          <div className="enter-key">
            <span className="enter-key-icon">⏎</span>
            <span>Enter</span>
          </div>
          
          {/* Submit Button */}
          <button 
            className="prompt-submit" 
            onClick={handleSubmit}
            disabled={disabled || isLoading || !prompt.trim()} 
            title="Kirim"
          >
            {isLoading ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 12 12"
                    to="360 12 12"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Helper Text */}
      <div className="prompt-helper">
        <p className="prompt-example">
          Contoh: <strong>&quot;Buatkan artikel tentang AI untuk UMKM&quot;</strong>
        </p>
        <div className="prompt-meta">
          <span className="prompt-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            AI-Powered
          </span>
          <span className="prompt-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Real-time
          </span>
        </div>
      </div>

      {/* Focus Mode Suggestions */}
      <div className="focus-suggestions">
        <button 
          className="focus-chip" 
          onClick={() => handleSuggestionClick('Buatkan artikel blog tentang')}
          disabled={disabled || isLoading}
        >
          <span className="focus-chip-icon">📝</span>
          <span>Artikel Blog</span>
        </button>
        <button 
          className="focus-chip"
          onClick={() => handleSuggestionClick('Buatkan caption sosial media untuk')}
          disabled={disabled || isLoading}
        >
          <span className="focus-chip-icon">📱</span>
          <span>Caption Sosmed</span>
        </button>
        <button 
          className="focus-chip"
          onClick={() => handleSuggestionClick('Buatkan laporan profesional tentang')}
          disabled={disabled || isLoading}
        >
          <span className="focus-chip-icon">📊</span>
          <span>Laporan</span>
        </button>
        <button 
          className="focus-chip"
          onClick={() => handleSuggestionClick('Buatkan konten kreatif tentang')}
          disabled={disabled || isLoading}
        >
          <span className="focus-chip-icon">✍️</span>
          <span>Kreatif</span>
        </button>
      </div>
    </div>
  )
}

export default Promptbox