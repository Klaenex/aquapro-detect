// app/layout.tsx
import "../styles/globals.scss";
import Header from "../components/Header";

export const metadata = {
  title: "AquaPro-Detect",
  description: "Application AquaPro-Detect",
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
      </body>
    </html>
  );
}
