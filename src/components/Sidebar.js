"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network, Home, BookOpen, Activity, Layers, Wifi, Database, Shield } from "lucide-react";
import styles from "../app/layout.module.css";

const chapters = [
  { id: "ch01", title: "1. Introduction", icon: BookOpen },
  { id: "ch02", title: "2. Application Layer", icon: Layers },
  { id: "ch03", title: "3. Transport Layer", icon: Activity },
  { id: "ch04", title: "4. Network (Data)", icon: Database },
  { id: "ch05", title: "5. Network (Control)", icon: Network },
  { id: "ch06", title: "6. Link Layer", icon: Network },
  { id: "ch07", title: "7. Wireless", icon: Wifi },
  { id: "ch08", title: "8. Blockchain", icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.logo}>
        <Network size={22} color="var(--accent-blue)" />
        네트워크 학습
      </Link>
      
      <nav>
        <Link 
          href="/" 
          className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}
        >
          <Home size={16} />
          <span>홈</span>
        </Link>
        
        <div style={{ marginTop: '1.5rem', marginBottom: '0.5rem', paddingLeft: '0.75rem', fontSize: '0.7rem', color: '#475569', fontWeight: 600, letterSpacing: '1px' }}>
          CHAPTERS
        </div>
        
        {chapters.map((ch) => {
          const Icon = ch.icon;
          const isActive = pathname.includes(ch.id);
          
          return (
            <Link 
              key={ch.id} 
              href={`/chapter/${ch.id}`}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              <Icon size={16} />
              <span>{ch.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
