"use client"
import {ImageItem} from "@/lib/data";
import {TableCell, TableRow} from "@/components/ui/table";
import {TransformedImageItem} from "@/lib/utils";
import {Trash2} from "lucide-react";
import {PUBLIC_GALACTUS_AGENT_API} from "@/lib/constants";
import {toast} from "sonner";
import {reloadContainersPage} from "@/lib/actions";


async function imageAction(id: string) {
    const payload = {
        id: id,
        action: "DELETE"
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    fetch(`${PUBLIC_GALACTUS_AGENT_API}/api/v1/images/action`, requestOptions)
        .then((response) => {
            if(!response.ok) {
                toast.error(`Failed to delete the image ${id}. Please check if it is in use.`)
            } else {
                toast.success(`Successfully deleted image ${id}`)
                reloadContainersPage()
            }
        })
        .catch((error) => {
            toast.error(`Backend API Unreachable`)
        })

}
export async function ImageListRow(image: TransformedImageItem) {
    return (
        <TableRow>
            <TableCell>{image.Id.split(":")[1].substring(0,12)}</TableCell>
            <TableCell className={`font-medium`}>{image.name}</TableCell>
            <TableCell className={`font-medium`}>{image.version}</TableCell>
            <TableCell className={`flex flex-row shrink absolute`}>
                <button
                    onClick={async () => await imageAction(image.Id.split(":")[1].substring(0,12))}
                    className={"ml-5 text-white shrink py-2 px-2 bg-red-600 place-items-center rounded text-xs hover:bg-red-500 disabled:pointer-events-none disabled:bg-slate-500"}
                >
                    <Trash2 size={15}/>
                </button>
            </TableCell>
        </TableRow>
    )
}