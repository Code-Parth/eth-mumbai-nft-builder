"use client"

import Link from "next/link"
import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { ConnectWallet, Theme } from "@thirdweb-dev/react"

export default function Header() {
    const { theme, setTheme } = useTheme()

    return (
        <>
            <div className="w-full border-b rounded-lg mb-5">
                <div className="max-w-[90%] w-full px-3 xl:p-0 my-5 mx-auto flex justify-between items-center">
                    <Label className="font-semibold text-3xl" style={{ fontFamily: "Borna" }}>
                        ETH Mumbai NFT Builder
                    </Label>

                    <div className="flex items-center gap-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")} style={{ fontFamily: "Borna" }}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")} style={{ fontFamily: "Borna" }}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")} style={{ fontFamily: "Borna" }}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="secondary">
                            <Link
                                href={`https://github.com/Code-Parth/eth-mumbai-nft-builder`}
                            >
                                <Label className="gap-2 flex font-medium text-md items-center cursor-pointer" style={{ fontFamily: "Borna" }}>
                                    <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
                                    GitHub Repository
                                </Label>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
