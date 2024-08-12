//FAVICONS
import { FaviconLight, FaviconDark } from '@/public/index.js';

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
          url: FaviconLight.src,
        },
        {
          rel: "icon",
          type: "image/png",
          media: "(prefers-color-scheme: dark)",
          url: FaviconDark.src,
        },
      ],
};

//FONT
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

//STYLE
import "./_styles/global.scss";

//HEADER
import Header from "./_components/header/header";
import Footer from "./_components/footer/footer";


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
