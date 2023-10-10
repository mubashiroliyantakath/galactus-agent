import {toast} from "sonner";

export const copyId = (id) => {
    toast.promise(new Promise((resolve,reject) => {
        if (navigator.clipboard) {
            resolve(navigator.clipboard.writeText(id))
        } else {
            reject("You are in an insecure context!")
        }

    }),{
        loading: 'Copying Id...',
        success: () => {
            return "Id copied to clipboard!"
        },
        error: (error) => { return `Error: ${error}`}
    })
}