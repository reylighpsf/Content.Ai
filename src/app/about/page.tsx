import Link from "next/link";

function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-container">
        <h1 className="about-title fade-in">
          Tentang Content Generator
        </h1>

        <p className="about-intro fade-in">
          <strong>Content Generator</strong> adalah platform berbasis AI yang
          membantu Anda membuat berbagai jenis konten secara cepat, konsisten,
          dan berkualitas tinggi. Website ini dirancang untuk kreator konten,
          pemilik bisnis, marketer, mahasiswa, hingga profesional yang ingin
          menghemat waktu dalam proses penulisan.
        </p>

        <section className="about-section fade-in">
          <h2 className="about-section-title">
            Apa yang Bisa Dilakukan?
          </h2>
          <ul className="about-list">
            <li>📝 Generate artikel blog SEO-friendly</li>
            <li>📱 Membuat caption media sosial yang menarik</li>
            <li>📊 Menyusun laporan atau ringkasan otomatis</li>
            <li>✍️ Membantu ide, outline, dan pengembangan tulisan</li>
          </ul>
        </section>

        <section className="about-section fade-in">
          <h2 className="about-section-title">
            Kenapa Menggunakan Kami?
          </h2>
          <div className="grid about-grid">
            <div className="card about-card">
              <h3 className="card-title">⚡ Cepat</h3>
              <p className="card-text">
                Hasilkan konten dalam hitungan detik tanpa memulai dari nol.
              </p>
            </div>
            <div className="card about-card">
              <h3 className="card-title">🎯 Fleksibel</h3>
              <p className="card-text">
                Cocok untuk blog, media sosial, laporan akademik, dan bisnis.
              </p>
            </div>
            <div className="card about-card">
              <h3 className="card-title">✨ Mudah Digunakan</h3>
              <p className="card-text">
                Antarmuka sederhana, tidak perlu keahlian teknis.
              </p>
            </div>
            <div className="card about-card">
              <h3 className="card-title">🤖 Didukung AI</h3>
              <p className="card-text">
                Menggunakan teknologi AI modern untuk hasil yang relevan dan
                natural.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section fade-in">
          <h2 className="about-section-title">Visi</h2>
          <p className="about-text">
            Menjadi platform AI penulisan konten yang membantu siapa pun
            mengekspresikan ide dengan lebih mudah, cepat, dan efektif.
          </p>
        </section>

        <section className="about-section fade-in">
          <h2 className="about-section-title">Misi</h2>
          <ul className="about-list">
            <li>Menyederhanakan proses pembuatan konten</li>
            <li>Meningkatkan produktivitas pengguna</li>
            <li>Menyediakan solusi AI yang mudah diakses</li>
          </ul>
        </section>

        <div className="about-cta fade-in">
          <h2>Siap Membuat Konten Lebih Cepat?</h2>
          <p>
            Mulai gunakan Content Generator sekarang dan rasakan kemudahannya.
          </p>
          <Link href="/" className="btn-primary">
            Mulai Sekarang
          </Link>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;