"use server"

import {revalidatePath} from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import {containerConfig, ContainerDefinition} from "@/lib/customtypes";

export const reloadContainersPage = () => {
    revalidatePath("/dashboard/containers")
}

export const reloadImagePage= () => {
    revalidatePath("/dashboard/images")
}

export async function getWebSocketConnection() {
    return `${process.env.GALACTUS_AGENT_WEBSOCKET}`
}

export interface ServerResponse {
    success: boolean
    error: string
}

type ContainerActions = "START" | "RESTART" | "STOP" | "DELETE"
export const containerAction = async (id: string, action: ContainerActions): Promise<ServerResponse> => {
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
    return fetch(`${process.env.GALACTUS_AGENT}/api/v1/containers/action`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return {success: false, error: "Can't reach the backend!"}
            } else {
                return {success: true, error: ""}
            }
        })
        .catch((error) => {
            return {success: false, error: error.toString()}
        })
}

export const imageActions = async (id: string) : Promise<ServerResponse> => {
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
    return fetch(`${process.env.GALACTUS_AGENT}/api/v1/images/action`, requestOptions)
        .then((response) => {
            if(!response.ok) {
                return {success: false, error: response.statusText}
            }
            else {
                return {success: true, error: ""}
            }
        })
        .catch((error) => {
            return {
                success: false, error: error.toString()
            }
        })
}

export interface ImageCheckResponse {
    status: number
}

export const checkImage = async (image: string) : Promise<ImageCheckResponse> => {
    noStore()
    const payload = {
        image: image
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    return fetch(`${process.env.GALACTUS_AGENT}/api/v1/images/search`, requestOptions)
        .then((response) => {
            return {status: response.status}
        })
        .catch((error) => {
            return {status: 500}
        })
}

export const createContainer = async (containerConfig: ContainerDefinition): Promise<ServerResponse> => {
    noStore()
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(containerConfig)
    }
    return fetch(`${process.env.GALACTUS_AGENT}/api/v1/containers/create`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return {success: false, error: response.statusText}
            } else {
                return {success: true, error: ""}
            }
        })
        .catch((error) => {
            return {success: false, error: error.toString()}
        })
}