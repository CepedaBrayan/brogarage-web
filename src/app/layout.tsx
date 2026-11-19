import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brogarage.com.co"),
  title: "Bro Garage | Muy pronto",
  description: "¡Muy pronto Bro Garage será web!",
  openGraph: {
    title: "Bro Garage | Muy pronto",
    description: "¡Muy pronto Bro Garage será web!",
    url: "https://brogarage.com.co",
    locale: "es_CO",
    type: "website",
    images: [{
      url: "/bro-garage-share.jpg",
      width: 1231,
      height: 1277,
      type: "image/jpeg",
      alt: "Piloto sobre una Aprilia RSV4 en circuito",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bro Garage | Muy pronto",
    description: "¡Muy pronto Bro Garage será web!",
    images: [{ url: "/bro-garage-share.jpg", alt: "Piloto sobre una Aprilia RSV4 en circuito" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
