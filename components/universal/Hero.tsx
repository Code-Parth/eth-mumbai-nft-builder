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
    // Using the useToast hook to get the toast object for showing notifications
    const { toast } = useToast()

    // State variable for storing whether the SVG is loading, initially set to false
    const [loading, setLoading] = useState(false);

    // State variable for storing the current date, initially set to null
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    // State variable for storing the current color, initially set to '#000000'
    const [currentColor, setCurrentColor] = useState<string>('#000000');

    // State variable for storing the background path color, initially set to '#F89D21'
    const [backgroundPathColor, setBackgroundPathColor] = useState<string>('#F89D21');

    // State variable for storing the upper outer quadrant color, initially set to '#FFFFFF'
    const [upperOuterQuadColor, setUpperOuterQuadColor] = useState<string>('#FFFFFF');

    // State variable for storing the upper inner quadrant color, initially set to '#000000'
    const [upperInnerQuadColor, setUpperInnerQuadColor] = useState<string>('#000000');

    // State variable for storing the lower outer quadrant color, initially set to '#000000'
    const [lowerOuterQuadColor, setLowerOuterQuadColor] = useState<string>('#000000');

    // State variable for storing the lower inner quadrant color, initially set to '#FFFFFF'
    const [lowerInnerQuadColor, setLowerInnerQuadColor] = useState<string>('#FFFFFF');

    // State variable for storing the uploaded image, initially set to null
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    // Reference to the SVG element in the DOM
    const svgRef = useRef<SVGSVGElement | null>(null);

    // useEffect is a hook in React that is equivalent to componentDidMount and componentDidUpdate in class components
    useEffect(() => {
        // Define a function to get the current date
        const getCurrentDate = (): void => {
            // Create a new Date object
            const date = new Date();
            // Set the state variable currentDate to the newly created Date object
            setCurrentDate(date);
        };

        // Call the function to get the current date
        getCurrentDate();
    }, []); // The empty array [] means this useEffect will run once after the component is mounted

    // Define a function to check if the current date is before the deadline
    const isBeforeDeadline = () => {
        // Set the deadline to January 30th, 2024, 12 PM IST
        // The time is set in UTC, so 12 PM IST is equivalent to 6:30 AM UTC
        const deadlineDate = new Date('2024-01-30T06:30:00');

        // Return true if the current date is set and is before the deadline date
        // Return false otherwise
        return currentDate && currentDate < deadlineDate;
    };

    // Define a function to handle image upload
    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        // Get the first file from the input event
        const file = e.target.files?.[0];
        // If no file was selected, return immediately
        if (!file) return;

        // Set the state variable for loading to true
        setLoading(true);
        toast({
            title: 'कृपया थांबा...',
            description: 'Please wait while the image is uploaded.',
        });

        // Create a new FileReader object
        const reader = new FileReader();

        // Define what happens when the file reader successfully reads a file
        reader.onload = async (event) => {
            // Create a new Image object
            const img = new Image();
            // Define what happens when the image successfully loads
            img.onload = () => {
                // Create a new ColorThief object
                const colorThief = new ColorThief();
                // Get a color palette from the image using ColorThief
                const colorPalette = colorThief.getPalette(img, 6);
                // Set the state variables to the colors from the color palette
                setUpperOuterQuadColor(`rgb(${colorPalette[0].join(', ')})`);
                setUpperInnerQuadColor(`rgb(${colorPalette[1].join(', ')})`);
                setLowerOuterQuadColor(`rgb(${colorPalette[2].join(', ')})`);
                setLowerInnerQuadColor(`rgb(${colorPalette[3].join(', ')})`);
                setBackgroundPathColor(`rgb(${colorPalette[4].join(', ')})`);
                setCurrentColor(`rgb(${colorPalette[5].join(', ')})`);
                // Set the state variable for the uploaded image to the result of the file reader
                setUploadedImage(event.target?.result as string);

                // Set the state variable for loading to false
                setLoading(false);
                toast({
                    title: 'अभिनंदन !',
                    description: 'The image has been uploaded successfully.',
                });
            };

            // Set the source of the image to the result of the file reader
            img.src = event.target?.result as string;
        };

        // Start reading the file as a data URL
        reader.readAsDataURL(file);
    };

    // Define a function to get the current date and time as a string
    const getCurrentDateTimeString = () => {
        // Create a new Date object for the current date and time
        const now = new Date();

        // Get the current year as a four-digit number
        const year = now.getFullYear();

        // Get the current month as a two-digit number (add 1 because JavaScript months are 0-based)
        // padStart is used to add a leading zero if the month is a single digit
        const month = String(now.getMonth() + 1).padStart(2, '0');

        // Get the current day of the month as a two-digit number
        // padStart is used to add a leading zero if the day is a single digit
        const day = String(now.getDate()).padStart(2, '0');

        // Get the current hour as a two-digit number
        // padStart is used to add a leading zero if the hour is a single digit
        const hours = String(now.getHours()).padStart(2, '0');

        // Get the current minute as a two-digit number
        // padStart is used to add a leading zero if the minute is a single digit
        const minutes = String(now.getMinutes()).padStart(2, '0');

        // Get the current second as a two-digit number
        // padStart is used to add a leading zero if the second is a single digit
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Return the current date and time as a string in the format YYYYMMDDHHMMSS
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    };

    // Define a function to download the SVG
    const downloadSvg = () => {
        // Serialize the SVG to a string using XMLSerializer
        const svgData = new XMLSerializer().serializeToString(svgRef.current as Node);
        // Create a new Blob object from the SVG data, with the type 'image/svg+xml'
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        // Create a URL for the Blob object
        const url = URL.createObjectURL(blob);
        // Create a new 'a' (anchor) element
        const a = document.createElement('a');
        // Set the href of the 'a' element to the Blob URL
        a.href = url;

        // Create a file name using the current date and time
        const fileName = `ETH_Mumbai_CodeParth_${getCurrentDateTimeString()}.svg`;
        // Set the download attribute of the 'a' element to the file name
        a.download = fileName;

        // Append the 'a' element to the body of the document
        document.body.appendChild(a);
        // Simulate a click on the 'a' element to start the download
        a.click();
        // Remove the 'a' element from the body of the document
        document.body.removeChild(a);
        // Revoke the Blob URL
        URL.revokeObjectURL(url);
    };

    // Define a function to download the SVG as a PNG
    const downloadPng = () => {
        // Serialize the SVG to a string using XMLSerializer
        const svgData = new XMLSerializer().serializeToString(svgRef.current as Node);
        // Create a new canvas element
        const canvas = document.createElement('canvas');
        // Get the 2D rendering context for the canvas
        const ctx = canvas.getContext('2d');
        // Create a new Image object
        const img = new Image();
        // Define what happens when the image successfully loads
        img.onload = () => {
            // Set the width and height of the canvas to the width and height of the image plus 362
            canvas.width = img.width + 362;
            canvas.height = img.height + 362;
            // Draw the image onto the canvas at the top-left corner
            ctx?.drawImage(img, 0, 0);
            // Convert the canvas to a data URL in PNG format
            const dataUrl = canvas.toDataURL('image/png');
            // Create a new 'a' (anchor) element
            const a = document.createElement('a');
            // Set the href of the 'a' element to the data URL
            a.href = dataUrl;

            // Create a file name using the current date and time
            const fileName = `ETH_Mumbai_CodeParth_${getCurrentDateTimeString()}.png`;
            // Set the download attribute of the 'a' element to the file name
            a.download = fileName;

            // Append the 'a' element to the body of the document
            document.body.appendChild(a);
            // Simulate a click on the 'a' element to start the download
            a.click();
            // Remove the 'a' element from the body of the document
            document.body.removeChild(a);
        };

        // Set the source of the image to the serialized SVG data, encoded as a data URL
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    };

    // Define a function to generate a Zora mint URL from a PNG
    const generateZoraMintUrlFromPng = () => {
        setLoading(true);
        toast({
            title: 'कृपया थांबा...',
            description: 'Please wait while you are redirected to Zora.',
        });

        // Serialize the SVG to a string using XMLSerializer
        const svgData = new XMLSerializer().serializeToString(svgRef.current as Node);
        // Define the URL for uploading to Cloudinary
        const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/djkldmhe9/image/upload';
        // Get the Cloudinary upload preset from the environment variables
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '';

        // Create a new canvas element
        const canvas = document.createElement('canvas');
        // Get the 2D rendering context for the canvas
        const ctx = canvas.getContext('2d');
        // Create a new Image object
        const img = new Image();
        // Define what happens when the image successfully loads
        img.onload = () => {
            // Set the width and height of the canvas to the width and height of the image plus 362
            canvas.width = img.width + 362;
            canvas.height = img.height + 362;
            // Draw the image onto the canvas at the top-left corner
            ctx?.drawImage(img, 0, 0);
            // Convert the canvas to a data URL in PNG format
            const dataUrl = canvas.toDataURL('image/png');

            // Create a new FormData object
            const formData = new FormData();
            // Append the upload preset to the FormData object
            formData.append('upload_preset', uploadPreset);
            // Append the data URL to the FormData object
            formData.append('file', dataUrl);

            // Send a POST request to the Cloudinary upload URL with the FormData object as the body
            fetch(cloudinaryUploadUrl, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    // Get the URL of the uploaded image from the response data
                    let imageUrl = data.url;
                    // If the image URL starts with 'http://', replace it with 'https://'
                    if (imageUrl.startsWith('http://')) {
                        imageUrl = imageUrl.replace('http://', 'https://');
                    }

                    // Encode the image URL, title, and description for use in a URL
                    const externalImageUrl = encodeURIComponent(imageUrl);
                    const title = encodeURIComponent(`ETH_Mumbai_CodeParth_${getCurrentDateTimeString()}`);
                    const description = encodeURIComponent('Created with ETH Mumbai NFT Builder CodeParth');

                    // Create the Zora mint URL
                    const mintUrl = `https://zora.co/create/single-edition?image=${externalImageUrl}&name=${title}&description=${description}`;

                    // Set the state variable for loading to false
                    setLoading(false);
                    toast({
                        title: 'Thank You!',
                        description: 'You will be redirected to Zora.',
                    });

                    // Open the Zora mint URL in a new tab
                    window.open(mintUrl, '_blank');
                })
                .catch(error => {
                    // Log any errors that occur during the upload
                    console.error('Error uploading PNG to Cloudinary:', error);
                });
        };

        // Set the source of the image to the serialized SVG data, encoded as a data URL
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    };

    // This function is used to share a message on Twitter
    const shareOnXURI = () => {
        // This is the text that will be shared. It's encoded to ensure that it can be included in a URL without any issues.
        const XText = encodeURIComponent(`J̵e̵v̵l̵i̵s̵ ̵K̵a̵?̵ NFT mint kiya kya?
on eth-mumbai-nft-builder.vercel.app today?
Built by team Apexia
@Code_Parth
@techking_007
@imsp_18
@sarthak_bhave
Let's build for @ethmumbai`);

        // This is the URL for creating a new tweet on Twitter. The text of the tweet is included as a query parameter.
        const XUrl = `https://twitter.com/intent/tweet?text=${XText}`;

        // This line opens a new tab with the Twitter URL, allowing the user to share the tweet.
        window.open(XUrl, '_blank');
    };

    return (
        <>
            <div className="w-full max-w-[90%] min-h-[85vh] items-center mx-auto p-5 border-[1px] rounded-lg mb-5">
                <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                    <div className="w-full min-w-50 min-h-50 p-5 border rounded-lg">
                        <svg
                            ref={svgRef}
                            className='pointer-events-none rounded-md aspect-auto w-full'
                            viewBox="0 0 2400 2400"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* // A rectangle that covers the entire SVG, filled with the color specified by backgroundPathColor */}
                            <rect width="2400" height="2400" fill={backgroundPathColor} />
                            {/* // A path (a shape) defined by a series of coordinates, filled with the color specified by upperOuterQuadColor */}
                            <path
                                d="M1185.6 294.398L1758 1216L1196.4 1548.4L642 1210L1185.6 294.398Z"
                                fill={upperOuterQuadColor}
                            />
                            {/* // Another path, filled with the color specified by upperInnerQuadColor */}
                            <path
                                d="M1196.41 2105.2L1755.61 1319.2L1198.81 1649.2L645.609 1327.6L1196.41 2105.2Z"
                                fill={upperInnerQuadColor}
                            />
                            {/* // Another path, filled with the color specified by lowerOuterQuadColor */}
                            <path
                                d="M1186.79 456.398L1607.99 1166.8L1191.59 1428.4L788.391 1166.8L1186.79 456.398Z"
                                fill={lowerOuterQuadColor}
                            />
                            {/* // Another path, filled with the color specified by lowerInnerQuadColor */}
                            <path
                                d="M1198.8 1992.4L1486.8 1572.4L1205.75 1750L928.805 1603.6L1198.8 1992.4Z"
                                fill={lowerInnerQuadColor}
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
                                        <div className="flex gap-4 flex-row">
                                            <Button onClick={shareOnXURI} variant="secondary">
                                                Share on X
                                            </Button>
                                            <Button onClick={generateZoraMintUrlFromPng}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img className="w-5 mr-4" src="../zorb.webp" alt="Zorb" />
                                                Mint on Zora
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="palette">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Generate Using Color Palette</CardTitle>
                                        <CardDescription>
                                            Imagine if you could use the cool colors from the ETH logo
                                            to paint anything you want! Future Collect makes it happen!...it&apos;s
                                            like they were always meant to be together! Logo ke rang badlo, Logon🤗 ke nahi ...
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
                                        <div className="flex gap-4 flex-row">
                                            <Button onClick={shareOnXURI} variant="secondary">
                                                Share on X
                                            </Button>
                                            <Button onClick={generateZoraMintUrlFromPng}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img className="w-5 mr-4" src="../zorb.webp" alt="Zorb" />
                                                Mint on Zora
                                            </Button>
                                        </div>
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
                                    <Link href={`https://github.com/Code-Parth/eth-mumbai-nft-builder`} target="_blank">
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
