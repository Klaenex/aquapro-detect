// app/layout.tsx
import "../styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublicSiteUrl } from "@/lib/site";

export const metadata = {
  title: "AquaPro-Detect",
  description: "Application AquaPro-Detect",
  metadataBase: new URL(getPublicSiteUrl()),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
