import Providers from "@/providers";
import Head from "@/components/custom/Head";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
