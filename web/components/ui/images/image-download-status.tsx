"use client"
import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
const formSchema = z.object({
    imageName: z.string()
})

type DownloadImageFormProp = {
    image: string
    triggerButton: React.ReactElement
}

type StatusPayload = {
    status: string
    error: string
}

// type ImagePullEvent struct {
//     Status         string `json:"status"`
//     Error          string `json:"error"`
//     Progress       string `json:"progress"`
//     ProgressDetail struct {
//         Current int `json:"current"`
//         Total   int `json:"total"`
//     } `json:"progressDetail"`
// }


export function ImageDownloadStatus(data: DownloadImageFormProp) {
    const [status, setStatus] = useState<StatusPayload>({status: "Image not found", error:""})
    const [enabled, setEnabled] = useState(true)
    // // const [ws, setWS] = useState(new WebSocket())

    useEffect(()=>  {
        if (enabled) {
            const newWS = new WebSocket(`ws://localhost:7867/ws/pull?image=${data.image}`)
            setEnabled(false)
            newWS.onerror = err => console.error(err)
            // newWS.onopen = () => setWS(newWS)
            newWS.onmessage = msg => setStatus(JSON.parse(msg.data))
        }
    },[data.image, enabled])

    return (
        <Dialog>
            <DialogTrigger asChild>
                {data.triggerButton}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Image Pull Status</DialogTitle>
                    <DialogDescription>
                        Status of the image pull process.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <p>Status: {status.status} </p>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
)
}