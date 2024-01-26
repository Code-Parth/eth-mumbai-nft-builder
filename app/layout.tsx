"use client"

import "./globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <title>ETH Mumbai NFT Builder</title>
            <meta charSet="utf-8" />
            <meta name="description" content="ETH Mumbai NFT Builder | Create and Claim your NFTs" />
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ThirdwebProvider
                        activeChain={Sepolia}
                        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
                    >
                        {children}
                    </ThirdwebProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
