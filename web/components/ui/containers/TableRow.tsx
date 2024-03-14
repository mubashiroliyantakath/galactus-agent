"use client"
import {TableCell, TableRow} from "@/components/ui/table";
import {ContainerItem} from "@/lib/data";
import { Play, RotateCw, Square, Trash2} from "lucide-react";
import {containerAction, reloadContainersPage} from "@/lib/actions";
import {toast} from "sonner";
import {ServerResponse} from "@/lib/actions";

type ContainerActions = "START" | "RESTART" | "STOP" | "DELETE"

async function ContainerAction(id: string, name: string, action: ContainerActions) {

    const response = await containerAction(id, action)
    if (response.success) {
        toast.success(`Successfully performed ${action} on the container ${name}`)
        reloadContainersPage()
    } else {
        toast.error(response.error)
    }

}
export function ContainerListRow(container: ContainerItem) {

    return(
        <TableRow>
            <TableCell className="w-[100px]">{container.Id.substring(0, 12)}</TableCell>
            <TableCell className={`font-medium`}>{container.Names[0].replace("/","")}</TableCell>
            <TableCell className={`w-[30rem]`}>{container.Image}</TableCell>
            <TableCell className={`w-[30rem]`}>{container.Status}</TableCell>
            <TableCell className={`flex flex-row shrink absolute`}>
                <div className={'flex flex-row shrink divide-x-0 text-white'}>
                    <button
                        disabled={container.State === "running"}
                        className={'shrink py-2 px-2 bg-green-600 rounded-l place-items-center text-xs hover:bg-green-500 disabled:pointer-events-none disabled:bg-slate-500'}
                         onClick={ async (e) => {
                             await ContainerAction(container.Id, container.Names[0].replace("/", ""), "START");

                         }
                         }
                    >
                        <Play size={15}/>
                    </button>
                    <button
                        disabled={container.State === "exited"}
                        className={'shrink py-2 px-2 bg-blue-600 place-items-center text-xs hover:bg-blue-500 disabled:pointer-events-none disabled:bg-slate-500'}
                        onClick={ async (e) => {
                                
                                await ContainerAction(container.Id, container.Names[0].replace("/", ""), "RESTART");


                            }
                        }
                    >
                        <RotateCw size={15}/>
                    </button>
                    <button
                        disabled={container.State === "exited"}
                        className={'shrink py-2 px-2 bg-red-600 place-items-center rounded-r text-xs hover:bg-red-500 disabled:pointer-events-none disabled:bg-slate-500'}
                        onClick={ async (e) => {
                                
                                await ContainerAction(container.Id, container.Names[0].replace("/", ""), "STOP");
                            }
                        }
                    >
                        <Square size={15}/>
                    </button>
                </div>
                <button
                    className={"ml-5 text-white shrink py-2 px-2 bg-red-600 place-items-center rounded text-xs hover:bg-red-500 disabled:pointer-events-none disabled:bg-slate-500"}
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