import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/header";
import UsersProvider from "@/components/users-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Random Users - Kwanso",
  description: "Random Users app which fetches users data from the API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#22c55e" height={3} showSpinner={false} />
        <Header />
        <UsersProvider>{children}</UsersProvider>
      </body>
    </html>
  );
}
