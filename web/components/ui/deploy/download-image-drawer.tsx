"use client"
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button, ButtonProps} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {DownloadCloud, DownloadIcon} from "lucide-react";

import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {ImageDownloadStatus} from "@/components/ui/images/image-download-status";

type DownloadImageProps = {
    trigger: React.ReactElement,
    image: string,
}
export function DownloadImageDrawer(data: DownloadImageProps) {
    const [imageValue, setImageValue] = useState(data.image ? data.image : "")
    const [startDownload, setStartDownload] = useState(false)
    const [status, setStatus] = useState("Image Not available")
    // // const [ws, setWS] = useState(new WebSocket())
    //
    // useEffect(()=>  {
    //     const newWS = new WebSocket(`ws://localhost:7867/ws/pull?image=${data.image}`)
    //     newWS.onerror = err => console.error(err)
    //     // newWS.onopen = () => setWS(newWS)
    //     newWS.onmessage = msg => setStatus(JSON.parse(msg.data))
    // })

    const handleDownload = () => {
        console.log(imageValue)
    }

    const TriggerButton =
            <Button onClick={handleDownload}>
                <DownloadCloud className={`mr-2`}/>
                Pull Image
            </Button>


    return (
        <Drawer>
            <DrawerTrigger asChild>
                { data.trigger }
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Download image</DrawerTitle>
                        <DrawerDescription>Grab required image from available repositories.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <Input onChange={(e)=> {setImageValue(e.target.value)}} type="text" defaultValue={data.image ? data.image : ""}/>
                        <div className={`flex flex-row bg-gray-400`}>
                            <p> Status : {status} </p>
                        </div>
                    </div>
                    <ImageDownloadStatus image={imageValue} triggerButton={TriggerButton}/>
                    <DrawerFooter>
                        {TriggerButton}
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}