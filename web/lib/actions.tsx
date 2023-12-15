"use server"

import {revalidatePath} from "next/cache";

export const reloadContainersPage = () => {
    revalidatePath("/dashboard/containers")
}