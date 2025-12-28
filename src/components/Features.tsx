import React from 'react';
import Link from 'next/link';

function Features() {
  return (
    <section>
      <h2 className="fade-in">
        Satu Platform, Banyak Kebutuhan Konten
      </h2>

      <div className="grid">
        <div className="card fade-in">

          <h3 className="card-title">
            <Link href="/dashboard/artikel">📝 Artikel Blog</Link>
          </h3>
          <p className="card-text">
            Artikel panjang, terstruktur, dan SEO-friendly tanpa ribet.
          </p>
        </div>

        <div className="card fade-in">
          <h3 className="card-title">📱 Caption Sosial Media</h3>
          <p className="card-text">
            Caption kreatif untuk Instagram, TikTok, Twitter, dan lainnya.
          </p>
        </div>

        <div className="card fade-in">
          <h3 className="card-title">📊 Laporan Profesional</h3>
          <p className="card-text">
            Laporan akademik & bisnis dengan bahasa rapi dan formal.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features