import NavBar from "@/components/ui/navbar";
import {Button} from "@/components/ui/button";
import App from "@/components/ui/deploy/app";
import {fetchSystemInfo, fetchTemplateList} from "@/lib/data";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ContainerIcon, PackageIcon} from "lucide-react";
import {StopIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
export default async function Page() {
    const systemInfo = await fetchSystemInfo()
    return (
        <main className="flex flex-col grow items-center justify-center">
            <div className={`flex flex-row gap-10 flex-wrap mt-10`}>
                {systemInfo.Containers === 0 ?
                    <div className={`flex flex-col items-center justify-center gap-3 m-10`}>
                    <Image src={`undraw_void.svg`} alt={"Found nothing"} width={100} height={100}/>
                        <span>No containers found!</span>
                    </div> : <></> }
                {systemInfo.ContainersRunning === 0 ? <></> :
                    <Link href={`/dashboard/containers`}>
                    <Card className="hover:border-green-400 hover:bg-green-400/20 dark:border-muted-foreground dark:hover:border-green-300 dark:hover:bg-green-600/20">
                        <CardHeader className={`items-center justify-center`}>
                            <CardTitle>Running</CardTitle>
                            <div className={`text-sm`}>Containers</div>
                        </CardHeader>
                        <CardContent>
                            <div className={`flex flex-col items-center justify-center`}>
                                <ContainerIcon size={40}/>
                                <p className={`mt-5 text-2xl font-bold`}>{systemInfo.ContainersRunning}/{systemInfo.Containers}</p>
                            </div>
                        </CardContent>
                    </Card>
                    </Link>
                }
                {systemInfo.ContainersPaused == 0 ? <></> :
                    <Link href={`/dashboard/containers`}>
                    <Card className="hover:border-amber-400 hover:bg-amber-300/20 dark:border-muted-foreground dark:hover:border-amber-300 dark:hover:bg-amber-600/20">
                        <CardHeader className={`items-center justify-center`}>
                            <CardTitle>Paused</CardTitle>
                            <div className={`text-sm`}>Containers</div>
                        </CardHeader>
                        <CardContent>
                            <div className={`flex flex-col items-center justify-center`}>
                                <ContainerIcon size={40}/>
                                <p className={`mt-5 text-2xl font-bold`}>{systemInfo.ContainersPaused}/{systemInfo.Containers}</p>
                            </div>
                        </CardContent>
                    </Card>
                    </Link>
                }
                {systemInfo.ContainersStopped == 0 ? <></> :
                    <Link href={`/dashboard/containers`}>
                    <Card className="hover:border-red-300 hover:bg-red-700/20 dark:border-muted-foreground dark:hover:border-red-300 dark:hover:bg-red-600/20">
                        <CardHeader className={`items-center justify-center`}>
                            <CardTitle>Stopped</CardTitle>
                            <div className={`text-sm`}>Containers</div>
                        </CardHeader>
                        <CardContent>
                            <div className={`flex flex-col items-center justify-center`}>
                                <ContainerIcon size={40}/>
                                <p className={`mt-5 text-2xl font-bold`}>{systemInfo.ContainersStopped}/{systemInfo.Containers}</p>
                            </div>
                        </CardContent>
                    </Card>
                    </Link>
                }

            </div>
            <div className={`flex flex-row gap-4 flex-wrap mt-10`}>
                {systemInfo.Images == 0 ?
                    <></>:
                    <Link href={`/dashboard/images`}>
                        <Card
                            className="hover:border-blue-300 hover:bg-blue-600/20 dark:border-muted-foreground dark:hover:border-blue-300 dark:hover:bg-blue-600/20">
                            <CardHeader className={`items-center justify-center`}>
                            <CardTitle>Available</CardTitle>
                            <div className={`text-sm`}>Images</div>
                        </CardHeader>
                        <CardContent>
                            <div className={`flex flex-col items-center justify-center`}>
                                <PackageIcon size={40}/>
                                <p className={`mt-5 text-2xl font-bold`}>{systemInfo.Images}</p>
                            </div>
                        </CardContent>
                    </Card>
                    </Link>
                }
            </div>
        </main>
);
}