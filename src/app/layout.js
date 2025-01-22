import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Mi PWA',
  description: 'Aplicación web progresiva simple hecha',
  generator : "Next.js" , 
  manifest : "/manifest.json" ,
  keywords : [ "nextjs" , "next14" , "pwa" , "next-pwa" ],
  icons : [ 
    { rel : "android-touch-icon" , url : "/icons/icon-192x192.png" }, 
    { rel : "icon" , url : "/icons/icon-512x512.png" }, 
  ], 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
