"use client"
import {TableCell, TableRow} from "@/components/ui/table";
import {TransformedImageItem} from "@/lib/utils";
import {Trash2} from "lucide-react";
import {toast} from "sonner";
import {imageActions, reloadContainersPage, reloadImagePage} from "@/lib/actions";


async function imageAction(id: string) {

    const response = await imageActions(id)
    if (response.success) {
        toast.success(`Successfully deleted the image ${id}`)
        reloadImagePage()
    } else {
        toast.error(response.error)
    }
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