import "./globals.css";
import { Quicksand } from "next/font/google";
import Navbar from "./Components/Navbar";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Biblioteca Pandora",
  description: "Retos diarios para pequeños exploradores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${quicksand.className} bg-cream text-gray-800`}>
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-screen pt-32 p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
