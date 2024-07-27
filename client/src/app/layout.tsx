import { Metadata } from "next";

import { defaultMetadata } from "@/constants/metadata";
import Providers from "@/providers";

import "./globals.css";

export const metadata: Metadata = {
  description:
    "Scholar Sync is a web application which enables creating announcements, uploading files with the establishment of a robust hierarchy the users for efficient management.",
  ...defaultMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
