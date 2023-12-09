import {unstable_noStore as noStore} from "next/cache";
import {GALACTUS_AGENT_API} from "@/lib/constants";


type ContainerItem = {
    Id: string,
    Names: Array<string>,
    Image: string,
    ImageID: string,
    Status: string
}
export async function fetchContainers() : Promise<Array<ContainerItem>> {
    noStore()
    try {
        return await fetch(`${GALACTUS_AGENT_API}/api/v1/containers/list`)
            .then((res) => res.json());
    } catch (error) {
        console.error('API error: ', error)
        return [];
    }
}