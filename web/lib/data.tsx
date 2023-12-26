import {unstable_noStore as noStore} from "next/cache";
import {GALACTUS_AGENT_API} from "@/lib/constants";
import {AppDefinition} from "@/lib/customtypes";


export type ContainerItem = {
    Id: string,
    Names: Array<string>,
    Image: string,
    ImageID: string,
    Status: string,
    State: string
}
export async function fetchContainers() : Promise<Array<ContainerItem>> {
    noStore()
    try {
        return await fetch(`${GALACTUS_AGENT_API}/api/v1/containers/list`)
            .then((res) => res.json());
    } catch (error) {
        throw new Error("API Error")
    }
}

export type ImageItem = {
    Id: string,
    RepoTags: Array<string>,
}

export async function fetchImages() : Promise<Array<ImageItem>> {
    noStore()

    return await fetch(`${GALACTUS_AGENT_API}/api/v1/images/list`)
        .then((res) => res.json())

}


export async function fetchTemplateList(): Promise<Array<AppDefinition>> {
    noStore();

    return await fetch(`${GALACTUS_AGENT_API}/api/v1/apps/templates/list`)
        .then((res) => res.json())

}

type systemInfo = {
    Containers: number
    ContainersRunning: number
    ContainersPaused: number
    ContainersStopped: number
    Images: number
}

export  async  function fetchSystemInfo(): Promise<systemInfo> {
    noStore()

    return await fetch(`${GALACTUS_AGENT_API}/api/v1/system/info`)
        .then((res) => res.json())
}