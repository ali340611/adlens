import "./globals.css";

export const metadata = {
  title: "AdLens",
  description: "AI Advertising Decision Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
