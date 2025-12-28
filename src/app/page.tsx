'use client'

import { useRouter } from 'next/navigation';
import Features from "../components/Features";
import Promptbox from "../components/Promptbox";
import Footer from "../components/Footer";

export default function Home() {
  const router = useRouter();
  
  const handlePromptSubmit = async (prompt: string) => {
    console.log('User prompt:', prompt);
    // Redirect to generate page with prompt
    router.push(`/generate?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <main>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="content-wrapper">
          <span className="hero-badge fade-in">
            ✨ AI-Powered Content Generator
          </span>

          <h1 className="hero-title fade-in">
            Buat Konten Berkualitas dalam Hitungan Detik
          </h1>

          <p className="hero-subtitle fade-in">
            Tidak perlu lagi staring ke layar kosong. Biarkan AI membantu Anda
            menulis artikel, caption, laporan, dan konten lainnya dengan mudah.
          </p>

          {/* Prompt Box */}
          <Promptbox 
            onSubmit={handlePromptSubmit}
            placeholder="Tanya apa saja..."
          />

          {/* CTA Buttons */}
          <div className="hero-actions fade-in">
            <a href="/login" className="btn-primary">
              Mulai Gratis
            </a>
            <a href="/about" className="btn-secondary">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>
      <Features />
      <Footer />
    </main>
  );
}