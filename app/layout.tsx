//METADATA
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Olympics gallery",
    description: "3D pictures gallery",
};

//FONT
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

//STYLE
import "./_styles/global.scss";

//HEADER
import Header from './_components/header/header';


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
