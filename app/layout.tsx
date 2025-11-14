import "./globals.css";
import { Quicksand } from "next/font/google";
import Navbar from "./Components/Navbar";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Biblioteca Pandora",
  description: "Retos diarios para pequeños exploradores. Desafía tu mente con matemáticas y lectura crítica.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://biblioteca-pandora.vercel.app'),
  openGraph: {
    title: "Biblioteca Pandora",
    description: "Retos diarios para pequeños exploradores. Desafía tu mente con matemáticas y lectura crítica.",
    url: '/',
    siteName: 'Biblioteca Pandora',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Biblioteca Pandora - Retos diarios',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biblioteca Pandora',
    description: 'Retos diarios para pequeños exploradores',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      {/* Adding cz-shortcut-listen to prevent hydration mismatch from browser extensions */}
      <body 
        className={`${quicksand.className} bg-cream text-gray-800`}
        cz-shortcut-listen="true"
      >
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-screen pt-32 p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
