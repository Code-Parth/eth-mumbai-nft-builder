"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { MoonIcon, SunIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function Header() {
    const { toast } = useToast()
    const { setTheme } = useTheme()
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    useEffect(() => {
        const getCurrentDate = (): void => {
            const date = new Date();
            setCurrentDate(date);
        };

        getCurrentDate();
    }, []);

    const isBeforeDeadline = () => {
        // Set the deadline to January 30th, 12 PM IST
        const deadlineDate = new Date('2024-01-30T06:30:00'); // Assuming server time is UTC

        return currentDate && currentDate < deadlineDate;
    };

    return (
        <>
            <div className="w-full border-b rounded-lg mb-5">
                <div className="max-w-[90%] w-full px-3 xl:p-0 my-5 mx-auto flex justify-between items-center">
                    {/* <Label className="font-semibold text-3xl" style={{ fontFamily: "Borna" }}>
                        ETH Mumbai
                    </Label> */}
                    <Image src="/ethmumbai.svg" alt="ETH Mumbai" width={150} height={150} className="max-sm:w-[75px]" />

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

                        

                    </div>
                </div>
            </div >
        </>
    )
}
