import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Network Visualizer",
  description: "Interactive educational visualization of network concepts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <div className={styles.layoutContainer}>
          <Sidebar />
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
