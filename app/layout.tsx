import type { ReactNode } from "react";

export const metadata = {
  title: "Geeta Marg",
  description: "Life questions answered with the Bhagavad Gita, with chapter and verse.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#fffdf8" }}>{children}</body>
    </html>
  );
}
