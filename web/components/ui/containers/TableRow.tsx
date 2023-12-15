"use client"
import {TableCell, TableRow} from "@/components/ui/table";
import {ContainerItem} from "@/lib/data";
import { Play, RotateCw, Square, Trash2} from "lucide-react";
import { reloadContainersPage} from "@/lib/actions";
import {revalidatePath} from "next/cache";
import {GALACTUS_AGENT_API} from "@/lib/constants";
import {toast} from "sonner";
import Error from "@/app/dashboard/containers/error"


type ContainerActions = "START" | "RESTART" | "STOP" | "DELETE" | "PAUSE"
export function ContainerListRow(container: ContainerItem) {
    async function ContainerAction(id: string, name: string, action: ContainerActions) {

        const payload = {
            id: id,
            action: action
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        fetch(`${GALACTUS_AGENT_API}/api/v1/containers/action`, requestOptions)
            .then((response) => {
                if(!response.ok) {
                    toast.error(`Failed to ${action} the container ${name}`)
                } else {
                    toast.success(`Successfully performed ${action} on the container ${name}`)
                    reloadContainersPage()
                }
            })
            .catch((error) => {
                toast.error(`Backend API Unreachable`)
            })

    }
    return(
        <TableRow>
            <TableCell className="w-[100px]">{container.Id.substring(0, 12)}</TableCell>
            <TableCell>{container.Names[0].replace("/","")}</TableCell>
            <TableCell>{container.Image}</TableCell>
            <TableCell>{container.Status}</TableCell>
            <TableCell className={`flex flex-row shrink absolute`}>
                <div className={'flex flex-row shrink divide-x-0 text-white'}>
                    <button
                        disabled={container.State === "running"}
                        className={'shrink py-2 px-2 bg-green-600 rounded-l place-items-center text-xs disabled:pointer-events-none disabled:bg-slate-500'}
                         onClick={ async (e) => {
                             await ContainerAction(container.Id, container.Names[0].replace("/", ""), "START");

                         }
                         }
                    >
                        <Play size={15}/>
                    </button>
                    <button
                        disabled={container.State === "exited"}
                        className={'shrink py-2 px-2 bg-blue-600 place-items-center text-xs disabled:pointer-events-none disabled:bg-slate-500'}
                        onClick={ async (e) => {
                                
                                await ContainerAction(container.Id, container.Names[0].replace("/", ""), "RESTART");


                            }
                        }
                    >
                        <RotateCw size={15}/>
                    </button>
                    <button
                        disabled={container.State === "exited"}
                        className={'shrink py-2 px-2 bg-red-600 place-items-center rounded-r text-xs disabled:pointer-events-none disabled:bg-slate-500'}
                        onClick={ async (e) => {
                                
                                await ContainerAction(container.Id, container.Names[0].replace("/", ""), "STOP");
                            }
                        }
                    >
                        <Square size={15}/>
                    </button>
                </div>
                <button
                    className={"ml-5 text-white shrink py-2 px-2 bg-red-600 place-items-center rounded text-xs disabled:pointer-events-none disabled:bg-slate-500"}
                    disabled={container.State === "running"}
                    onClick={ async (e) => {
                            
                            await ContainerAction(container.Id, container.Names[0].replace("/", ""), "DELETE");

                        }
                    }
                >
                    <Trash2 size={15}/>
                </button></TableCell>
        </TableRow>
    )
}