//FAVICONS
import { FaviconBlack, FaviconWhite } from '@/images';

//METADATA
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Olympics gallery",
    description: "3D pictures gallery",
    icons: [
        {
          rel: "icon",
          type: "image/png",
          media: "(prefers-color-scheme: light)",
          url: FaviconBlack.src,
        },
        {
          rel: "icon",
          type: "image/png",
          media: "(prefers-color-scheme: dark)",
          url: FaviconWhite.src,
        },
    ],
};

//FONT
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

//STYLE
import "@/styles/global.scss";

//HEADER
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
