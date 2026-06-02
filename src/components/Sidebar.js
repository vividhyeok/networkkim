"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network, Home, BookOpen, Activity, Layers, Wifi, Link as LinkIcon, Database, Shield } from "lucide-react";
import styles from "../app/layout.module.css";

const chapters = [
  { id: "ch01", title: "1장. Introduction", icon: BookOpen },
  { id: "ch02", title: "2장. Application Layer", icon: Layers },
  { id: "ch03", title: "3장. Transport Layer", icon: Activity },
  { id: "ch04", title: "4장. Network (Data Plane)", icon: Database },
  { id: "ch05", title: "5장. Network (Control Plane)", icon: Network },
  { id: "ch06", title: "6장. Link Layer & LANs", icon: LinkIcon },
  { id: "ch07", title: "7장. Wireless & Mobile", icon: Wifi },
  { id: "ch08", title: "8장. Blockchain & P2P", icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.logo}>
        <Network size={28} color="var(--accent-blue)" />
        NetVisualizer
      </Link>
      
      <nav>
        <Link 
          href="/" 
          className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        
        <div style={{ marginTop: '2rem', marginBottom: '0.5rem', paddingLeft: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
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
              <Icon size={20} />
              <span>{ch.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
