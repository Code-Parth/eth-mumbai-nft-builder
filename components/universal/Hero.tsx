import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"


export default function Hero() {
    return (
        <>
            <div className="w-full max-w-[90%] min-h-[85vh] items-center mx-auto p-5 border-[1px] rounded-lg mb-5">
                <div className="grid grid-cols-2 gap-2">
                    <div className="w-full min-w-50 min-h-50">

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
                                    <CardContent></CardContent>
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
