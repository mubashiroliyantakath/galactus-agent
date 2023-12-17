
import {fetchContainers} from "@/lib/data";
import {Table, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ContainerListRow} from "@/components/ui/containers/TableRow";


export default async function ContainersTable() {
    const containersList = await fetchContainers();
    return (
        <Table>
            <TableCaption>A list of containers running on the host</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead >Image</TableHead>
                    <TableHead >Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                {containersList?.map((container) => (
                    <ContainerListRow key={container.Id} Id={container.Id} Image={container.Image} Names={container.Names} ImageID={container.ImageID} Status={container.Status} State={container.State} />
                ) )}
            </TableHeader>

        </Table>
    )
}