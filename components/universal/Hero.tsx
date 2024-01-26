"use client"

import ColorThief from "colorthief"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, { useState, useRef, ChangeEvent } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

export default function Hero() {
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

    const downloadSvg = () => {
        const svgData = new XMLSerializer().serializeToString(svgRef.current as Node);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'edited_image.svg';
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
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'edited_image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    };

    return (
        <>
            <div className="w-full max-w-[90%] min-h-[85vh] items-center mx-auto p-5 border-[1px] rounded-lg mb-5">
                <div className="grid grid-cols-2 gap-8">
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
                        <Tabs defaultValue="palette" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="palette">
                                    <Label>Generate Using Color Palette</Label>
                                </TabsTrigger>
                                <TabsTrigger value="manually">
                                    <Label>Generate Manually</Label>
                                </TabsTrigger>
                                <TabsTrigger value="badge">
                                    <Label>Generate Badge</Label>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="palette">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Generate Using Color Palette</CardTitle>
                                        <CardDescription>
                                            Revolutionizing art with Future Collect extracting colors
                                            from images and infusing them into the ETH logo. Experience
                                            innovation and style seamlessly merged in every pixel.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <label htmlFor="file" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                            Generate palette from image
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
                                    <CardFooter></CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="manually">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Generate Manually</CardTitle>
                                        <CardDescription>
                                            Introducing a revolutionary feature! Customize your NFT.
                                            Choose and modify specific colors to match your style.
                                            Unleash your creativity, make it truly yours!
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent></CardContent>
                                    <CardFooter></CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="badge">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Generate Badge</CardTitle>
                                        <CardDescription>
                                            Create your personalized badge! Upload your photo, design
                                            your unique emblem, and proudly showcase it on your socials.
                                            Express yourself with flair and style. Let your badge tell your story!
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent></CardContent>
                                    <CardFooter></CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}
