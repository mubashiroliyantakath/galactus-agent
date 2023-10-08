import {toast} from "sonner";

const copyAction = (id) =>  navigator.clipboard.writeText(id)
export const copyId = (id) => {
    toast.promise(copyAction(id),{
        loading: 'Copying Id...',
        success: () => {
            return "Id copied to clipboard!"
        }
    })
}