import Image from "next/image";
import { Card, CardContent } from "../ui/card";


export function Banner() {
    return (
        <Card className="relative  flex flex-col items-center overflow-hidden mb-10 h-[200px] bg-red-600 p-0">
            <CardContent className="  h-[200px] relative py-12  bg-green-600 w-full padding-banner" >

                <Image
                    className="object-cover "
                    src="https://aiwallpaperarts.com/static/images/wallpapers/original/3019493.jpg"
                    alt="HandyPro Services Banner"
                    fill
                />
                <div className="absolute inset-0 flex flex-col items-start justify-center px-12">
                    <h1 className="text-4xl font-bold text-white mb-2">HandyPro Services</h1>
                    <p className="text-gray-300 text-lg font-semibold">
                        Expert assistance for every corner of your home. Trusted <br />
                        professionals, guaranted quality.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}