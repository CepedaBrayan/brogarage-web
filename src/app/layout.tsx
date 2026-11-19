import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brogarage.com.co"),
  title: "Bro Garage | Muy pronto",
  description: "¡Muy pronto Bro Garage será web!",
  openGraph: { title: "Bro Garage | Muy pronto", description: "¡Muy pronto Bro Garage será web!", locale: "es_CO", type: "website", images: [{ url: "/bro-garage.jpg", width: 1536, height: 1024 }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-CO"><body>{children}</body></html>;
}
