import {unstable_noStore as noStore} from "next/cache";
import {GALACTUS_AGENT_API} from "@/lib/constants";


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
    try {
        return await fetch(`${GALACTUS_AGENT_API}/api/v1/images/list`)
            .then((res) => res.json())
    } catch (error) {
        throw new Error("API Error")
    }
}