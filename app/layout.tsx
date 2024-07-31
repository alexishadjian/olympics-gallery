//METADATA
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Travel gallery",
    description: "3D pictures gallery",
};

//FONT
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

//Style
// import "./_styles/global.scss";


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
