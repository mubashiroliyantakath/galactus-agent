"use server"

import {revalidatePath} from "next/cache";

export const reloadContainersPage = () => {
    revalidatePath("/dashboard/containers")
}

export const reloadImagePage= () => {
    revalidatePath("/dashboard/images")
}