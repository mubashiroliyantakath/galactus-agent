"use client"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {DownloadCloudIcon} from "lucide-react";
import {useEffect, useState} from "react";
import { io } from "socket.io-client";

type StatusPayload = {
    id: string
    status: string
    error: string
    progress: string
}
export default function Page() {
    const [status, setStatus] = useState<Array<StatusPayload>>([])
    const [imageValue, setImageValue] = useState("")
    const [socket, setSocket] = useState<WebSocket | undefined>();
    const [startWS, setStartWS] = useState(false)

    const handleConnection = async () => {
        if (socket) return;
        if (!startWS) return;
        const s = new WebSocket(`ws://localhost:7867/ws/pull?image=${imageValue}`)
        setSocket(s)
        setStartWS(false)
        s.onclose = () => {
            setSocket(undefined)
        }
    }

    const handleMessages = () => {
        if (!socket) return;
        socket.onmessage = msg => {
            const message = JSON.parse(msg.data)
            console.log(message)
            const newStatus = status
            console.log("NewStatus",newStatus)
            const index = newStatus.findIndex(item => item.id === message.id)
            if (index > -1 ) newStatus[index] = message
            else newStatus.push(message)
            setStatus(status => [...newStatus]);
        }
    }

    useEffect(() => {
        handleConnection()

    });

    useEffect(() => {
        handleMessages()
    });



    return (
        <main className={'flex flex-col items-center justify-between px-10 pt-7'}>
            <p className={'font-bold text-xl'}>Pull New Images</p>
            <div className="flex w-full max-w-lg items-center space-x-2 mt-5">
                <Input onChange={(e) => setImageValue(e.target.value)} type="email" placeholder="alpine:latest"/>
                <Button onClick={() => {
                    setStatus([])
                    setStartWS(true)
                    console.log(imageValue)
                }} type="submit">
                    <DownloadCloudIcon className={`mr-4`}/>
                    Pull Image
                </Button>
            </div>
            {status?.map((message) =>
                (
                        <p key={message.id}>{message.id}:{message.status}:{message.progress}</p>
                )

            )}
        </main>
    )
}