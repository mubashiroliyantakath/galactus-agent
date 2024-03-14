"use client"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ArrowBigDownDash, CheckCircle2, DownloadCloudIcon, XCircleIcon} from "lucide-react";
import {useEffect, useState} from "react";
import clsx from 'clsx';
import {Table, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useSearchParams} from "next/navigation";
import {getWebSocketConnection} from "@/lib/actions";

interface ProgressDetail {
    current?: number
    total?: number
}

interface StatusPayload  {
    id: string
    status: string
    error: string
    progress: string
    progressDetail: ProgressDetail

}
export default function Page() {
    const searchParams = useSearchParams()
    const pull = searchParams.get('image') ? searchParams.get('image') : ""
    const [status, setStatus] = useState<Array<StatusPayload>>([])
    const [imageValue, setImageValue] = useState(pull)
    const [socket, setSocket] = useState<WebSocket | undefined>();
    const [startWS, setStartWS] = useState(false)
    const [pullError, setPullError] = useState(false)
    const [pullErrorMessage, setPullErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [finalStatus, setFinalStatus] = useState(false)
    const [finalMessage, setFinalMessage] = useState("")

    const handleConnection = async () => {
        if (socket) return;
        if (!startWS) return;
        const webSocketHost = await getWebSocketConnection()
        const s = new WebSocket(`${webSocketHost}/ws/pull?image=${imageValue}`)
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
            if (message.error != "") {
                setPullError(true)
                setPullErrorMessage(message.error)
            }
            if (message.status.includes("Status")) {
                setFinalStatus(true)
                setFinalMessage(message.status.replace("Status: ", ""))
            }
            const newStatus = status
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
                <Input onChange={(e) => setImageValue(e.target.value)} type="email" value={imageValue? imageValue : ""} placeholder="alpine:latest"/>
                <Button onClick={() => {
                    setStatus([])
                    setStartWS(true)
                    setPullError(false)
                    setLoading(true)
                    setPullErrorMessage("")
                    setFinalStatus(false)
                }} type="submit">
                    <DownloadCloudIcon className={`mr-4`}/>
                    Pull Image
                </Button>
            </div>
            <div className={clsx(
                `min-w-[700px] min-h-[200px] mt-20 border-2 flex flex-col align-middle place-items-center justify-center items-center py-5 rounded-lg`,
                {
                    'border-red-500 shadow shadow-red-500/50': pullError,
                    'hidden': !loading,
                    'border-green-500 shadow shadow-green-500/50': finalStatus && !pullError

                }
            )}>
                <Table className={clsx(
                    {
                        'hidden': pullError || finalStatus || status.length === 0
                    }
                )}>
                    <TableCaption>Pull Progress</TableCaption>
                    <TableHeader>
                        <TableHead className="w-[100px] text-center">Id</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                    </TableHeader>
                    {status?.map((message) => (
                        <TableRow key={message.id}>
                            <TableCell>{message.id}</TableCell>
                            <TableCell>{message.status}</TableCell>
                            <TableCell>{message.progress}</TableCell>
                        </TableRow>
                    ))}
                </Table>
                <div className={clsx(
                    'flex flex-col items-center',
                    {
                        'hidden': !loading || status.length > 0
                    }
                )}>
                    <ArrowBigDownDash className={`animate-bounce text-primary`} size={50}/>
                    <span>Waiting...</span>
                </div>

                <div className={clsx(
                    'flex flex-row items-center',
                    {
                        'hidden': !pullError
                    }
                )}>
                    <XCircleIcon color={`red`} className={`mr-5`}/>
                    <p className={`max-w-lg`}>{pullErrorMessage}</p>
                </div>

                <div className={clsx(
                    'flex flex-row items-center justify-center align-middle place-items-center',
                    {
                        'hidden': !finalStatus
                    }
                )}>
                    <CheckCircle2 color={`green`} className={`mr-5`}/>
                    <span>{finalMessage}</span>

                </div>


            </div>

        </main>
    )
}