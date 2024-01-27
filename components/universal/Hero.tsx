"use client"

import Link from "next/link"
import ColorThief from "colorthief"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { HexColorPicker } from "react-colorful"
import { useToast } from "@/components/ui/use-toast"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import React, { useState, useEffect, useRef, ChangeEvent } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"


export default function Hero() {
    const { toast } = useToast()
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [currentColor, setCurrentColor] = useState<string>('#000000');
    const [backgroundPathColor, setBackgroundPathColor] = useState<string>('#F89D21');
    const [upperOuterQuadColor, setUpperOuterQuadColor] = useState<string>('#FFFFFF');
    const [upperInnerQuadColor, setUpperInnerQuadColor] = useState<string>('#000000');
    const [lowerOuterQuadColor, setLowerOuterQuadColor] = useState<string>('#000000');
    const [lowerInnerQuadColor, setLowerInnerQuadColor] = useState<string>('#FFFFFF');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const [backgroundPathPickerColor, setBackgroundPathPickerColor] = useState<string>('#F89D21');
    const [otherPathsPickerColor, setOtherPathsPickerColor] = useState<string>('#000000');

    const svgRef = useRef<SVGSVGElement | null>(null);

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

    const handleBackgroundPathColorChange = (color: string) => {
        setBackgroundPathPickerColor(color);
        setBackgroundPathColor(color);
    };

    const handleOtherPathsColorChange = (color: string) => {
        setOtherPathsPickerColor(color);
        if (selectedPath) {
            setCurrentColor(color);
            updateColor(selectedPath, color);
        }
    };

    const handleColorChange = (color: string) => {
        if (selectedPath) {
            setCurrentColor(color);
            updateColor(selectedPath, color);
        } else {
            setCurrentColor(color);
            setBackgroundPathColor(color);
        }
    };

    const handlePathSelect = (path: string) => {
        setSelectedPath(path);
        setCurrentColor(
            path === 'backgroundPathColor' ? backgroundPathColor :
                path === 'upperOuterQuad' ? upperOuterQuadColor :
                    path === 'upperInnerQuad' ? upperInnerQuadColor :
                        path === 'lowerOuterQuad' ? lowerOuterQuadColor :
                            path === 'lowerInnerQuad' ? lowerInnerQuadColor : '#000000'
        );
    };

    const updateColor = (path: string, color: string) => {
        switch (path) {
            case 'backgroundPathColor':
                setBackgroundPathColor(color);
                break;
            case 'upperOuterQuad':
                setUpperOuterQuadColor(color);
                break;
            case 'upperInnerQuad':
                setUpperInnerQuadColor(color);
                break;
            case 'lowerOuterQuad':
                setLowerOuterQuadColor(color);
                break;
            case 'lowerInnerQuad':
                setLowerInnerQuadColor(color);
                break;
            default:
                break;
        }
    };

    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (event) => {
            const img = new Image();
            img.onload = () => {
                const colorThief = new ColorThief();
                const colorPalette = colorThief.getPalette(img, 6);
                setUpperOuterQuadColor(`rgb(${colorPalette[0].join(', ')})`);
                setUpperInnerQuadColor(`rgb(${colorPalette[1].join(', ')})`);
                setLowerOuterQuadColor(`rgb(${colorPalette[2].join(', ')})`);
                setLowerInnerQuadColor(`rgb(${colorPalette[3].join(', ')})`);
                setBackgroundPathColor(`rgb(${colorPalette[4].join(', ')})`);
                setCurrentColor(`rgb(${colorPalette[5].join(', ')})`);
                setUploadedImage(event.target?.result as string);
            };

            img.src = event.target?.result as string;
        };

        reader.readAsDataURL(file);
    };
    const getCurrentDateTimeString = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    };

    const downloadSvg = () => {
        const svgData = new XMLSerializer().serializeToString(svgRef.current as Node);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const fileName = `ETH_Mumbai_CodeParth_${getCurrentDateTimeString()}.svg`;
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadPng = () => {
        const svgData = new XMLSerializer().serializeToString(svgRef.current as Node);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width + 362;
            canvas.height = img.height + 362;
            ctx?.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;

            const fileName = `ETH_Mumbai_CodeParth_${getCurrentDateTimeString()}.png`;
            a.download = fileName;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    };

    const generateZoraMintUrlFromPng = () => {
        const svgData = new XMLSerializer().serializeToString(svgRef.current as Node);
        const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/djkldmhe9/image/upload';
        const uploadPreset = 'ewpyp5pw';

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width + 362;
            canvas.height = img.height + 362;
            ctx?.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');

            const formData = new FormData();
            formData.append('upload_preset', uploadPreset);
            formData.append('file', dataUrl);

            fetch(cloudinaryUploadUrl, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    let imageUrl = data.url;
                    if (imageUrl.startsWith('http://')) {
                        imageUrl = imageUrl.replace('http://', 'https://');
                    }

                    const externalImageUrl = encodeURIComponent(imageUrl);
                    const title = encodeURIComponent(`ETH_Mumbai_CodeParth_${getCurrentDateTimeString()}`);
                    const description = encodeURIComponent('Created with ETH Mumbai NFT Builder CodeParth');

                    const mintUrl = `https://zora.co/create/single-edition?image=${externalImageUrl}&name=${title}&description=${description}`;

                    window.open(mintUrl, '_blank');
                })
                .catch(error => {
                    console.error('Error uploading PNG to Cloudinary:', error);
                });
        };

        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    };

    return (
        <>
            <div className="w-full max-w-[90%] min-h-[85vh] items-center mx-auto p-5 border-[1px] rounded-lg mb-5">
                <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                    <div className="w-full min-w-50 min-h-50 p-5 border rounded-lg">
                        <svg
                            ref={svgRef}
                            className='cursor-pointer rounded-md aspect-auto w-full'
                            viewBox="0 0 2400 2400"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Background */}
                            <rect width="2400" height="2400" fill={backgroundPathColor} />
                            {/* Upper Outer Quad */}
                            <path
                                d="M1185.6 294.398L1758 1216L1196.4 1548.4L642 1210L1185.6 294.398Z"
                                fill={selectedPath === 'upperOuterQuad' ? currentColor : upperOuterQuadColor}
                                onClick={() => handlePathSelect('upperOuterQuad')}
                            />
                            {/* Upper Inner Quad */}
                            <path
                                d="M1196.41 2105.2L1755.61 1319.2L1198.81 1649.2L645.609 1327.6L1196.41 2105.2Z"
                                fill={selectedPath === 'upperInnerQuad' ? currentColor : upperInnerQuadColor}
                                onClick={() => handlePathSelect('upperInnerQuad')}
                            />
                            {/* Lower Outer Quad */}
                            <path
                                d="M1186.79 456.398L1607.99 1166.8L1191.59 1428.4L788.391 1166.8L1186.79 456.398Z"
                                fill={selectedPath === 'lowerOuterQuad' ? currentColor : lowerOuterQuadColor}
                                onClick={() => handlePathSelect('lowerOuterQuad')}
                            />
                            {/* Lower Inner Quad */}
                            <path
                                d="M1198.8 1992.4L1486.8 1572.4L1205.75 1750L928.805 1603.6L1198.8 1992.4Z"
                                fill={selectedPath === 'lowerInnerQuad' ? currentColor : lowerInnerQuadColor}
                                onClick={() => handlePathSelect('lowerInnerQuad')}
                            />
                        </svg>
                    </div>

                    <div className="w-full min-w-50 min-h-50" style={{ fontFamily: "Borna" }}>
                        <Tabs defaultValue="manually" className="w-full ">
                            <TabsList className="w-full max-sm:h-20 flex max-sm:flex-col max-sm:gap-2">
                                <TabsTrigger value="manually">
                                    <Label>Generate Manually</Label>
                                </TabsTrigger>
                                <TabsTrigger value="palette">
                                    <Label>Generate Using Color Palette</Label>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="manually">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Generate Manually</CardTitle>
                                        <CardDescription>
                                            Introducing a revolutionary feature! Customize your NFT.
                                            Choose and modify specific colors to match your style.
                                            Unleash your creativity, make it truly yours! आई शपथ 😄!
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>Upper Border Color</AccordionTrigger>
                                                <AccordionContent>
                                                    <HexColorPicker className="p-4" color={upperOuterQuadColor} onChange={setUpperOuterQuadColor} />
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-2">
                                                <AccordionTrigger>Lower Border Color</AccordionTrigger>
                                                <AccordionContent>
                                                    <HexColorPicker className="p-4" color={upperInnerQuadColor} onChange={setUpperInnerQuadColor} />
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-3">
                                                <AccordionTrigger>Upper Inner Color</AccordionTrigger>
                                                <AccordionContent>
                                                    <HexColorPicker className="p-4" color={lowerOuterQuadColor} onChange={setLowerOuterQuadColor} />
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-4">
                                                <AccordionTrigger>Lower Inner Color</AccordionTrigger>
                                                <AccordionContent>
                                                    <HexColorPicker className="p-4" color={lowerInnerQuadColor} onChange={setLowerInnerQuadColor} />
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-5">
                                                <AccordionTrigger>Backgorund Color</AccordionTrigger>
                                                <AccordionContent>
                                                    <HexColorPicker className="p-4" color={backgroundPathColor} onChange={setBackgroundPathColor} />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                        <div className="flex mt-4 gap-2">
                                            <Button variant="link" onClick={downloadSvg}>Download SVG</Button>
                                            <Button variant="link" onClick={downloadPng}>Download PNG</Button>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={generateZoraMintUrlFromPng}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img className="w-5 mr-4" src="../zorb.webp" alt="Zorb" />
                                            Mint on Zora
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="palette">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Generate Using Color Palette</CardTitle>
                                        <CardDescription>
                                        Imagine if you could use the cool colors from the ETH logo to paint anything you want! Future Collect makes it happen!...it&apos;s like they were always meant to be together! Logo ke rang badlo, Logon🫂 ke nahi ...
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <label htmlFor="file" className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                            Generate Palette From Image
                                        </label>
                                        <input
                                            id="file"
                                            className="hidden file:p-0 file:border-none file:text-white file:bg-black"
                                            placeholder="Upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={uploadImage}
                                        />
                                        <div className="flex mt-4 gap-2">
                                            <Button variant="link" onClick={downloadSvg}>Download SVG</Button>
                                            <Button variant="link" onClick={downloadPng}>Download PNG</Button>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={generateZoraMintUrlFromPng}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img className="w-5 mr-4" src="../zorb.webp" alt="Zorb" />
                                            Mint on Zora
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    {currentDate && (
                        <div>
                            {isBeforeDeadline() ? (
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        toast({
                                            title: 'लवकरच !',
                                            description: 'GitHub Repository will be publicly available after the Challenge ends.',
                                        });
                                    }}
                                >
                                    <Label className="gap-2 flex font-medium text-md items-center cursor-pointer" style={{ fontFamily: 'Borna' }}>
                                        <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
                                        GitHub Repository
                                    </Label>
                                </Button>
                            ) : (
                                <Button variant="secondary">
                                    <Link href={`https://github.com/Code-Parth/eth-mumbai-nft-builder`}>
                                        <Label className="gap-2 flex font-medium text-md items-center cursor-pointer" style={{ fontFamily: 'Borna' }}>
                                            <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
                                            GitHub Repository
                                        </Label>
                                    </Link>
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
