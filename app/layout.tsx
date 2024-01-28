import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
                    {children}
                    <SpeedInsights />
                    <Analytics />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}