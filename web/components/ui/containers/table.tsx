import {fetchContainers} from "@/lib/data";
import {Table, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default async function ContainersTable() {
    const containersList = await fetchContainers();
    return (
        <Table>
            <TableCaption>A list of containers running on the host.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
                {containersList.map((container) => (
                    <TableRow key={container.ImageID.split(":")[1]}>
                        <TableHead className="w-[100px]">{container.ImageID.split(":")[1].substring(0, 12)}</TableHead>
                        <TableHead>{container.Names[0].replace("/","")}</TableHead>
                        <TableHead>{container.Image}</TableHead>
                        <TableHead>{container.Status}</TableHead>
                    </TableRow>
                ) )}
            </TableHeader>
        </Table>
    )
}