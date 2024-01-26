"use client"

import "./globals.css";
// import type { Metadata } from "next";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "@/components/theme-provider";

// export const metadata: Metadata = {
//     title: "ETH Mumbai NFT Builder",
//     description: "ETH Mumbai NFT Builder | Create and Claim your NFTs"
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ThirdwebProvider
                        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
                        activeChain={Sepolia}
                    >
                        {children}
                    </ThirdwebProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
