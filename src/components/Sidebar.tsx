import Link from "next/link";
import Image from "next/image";

function Sidebar() {
  return (
    <aside className="header">
      
      {/* Logo */}
      <div className="sidebar-logo">      
        <Link href="/">Content.AI
          <Image src="/assets/icon.png" alt="logo" width={80} height={80} />
        </Link>
      </div>

      {/* Primary Action */}
      <Link href="/" className="sidebar-new-btn">
        + New Content
      </Link>

      {/* Navigation */}
      <nav>
        <span className="nav-section-title">
          Generate
        </span>

        <Link href="/dashboard/article">
          📝 Article
        </Link>
        <Link href="/generate/caption">
          📱 Caption
        </Link>
        <Link href="/generate/report">
          📄 Report
        </Link>

        <span className="nav-section-title">
          Library
        </span>

        <Link href="/history">
          🗂 History
        </Link>

        <span className="nav-section-title">
          Account
        </span>

        <Link href="/settings">
          ⚙️ Settings
        </Link>
      </nav>

      {/* Bottom */}
      <div className="sidebar-footer">
        © 2025 ContentAI
      </div>
    </aside>
  );
}

export default Sidebar;