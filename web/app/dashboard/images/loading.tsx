import { Skeleton } from "@/components/ui/skeleton";
import {Table, TableCaption, TableCell,TableHeader, TableRow, TableHead } from "@/components/ui/table";

export default function Loading() {
    return (
        <Table>
            <TableCaption>A list of images avaialble locally on the host.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                <TableRow>
                    <TableCell><Skeleton className="w-[75px] h-[15px] rounded-full" /></TableCell>
                    <TableCell><Skeleton className="w-[125px] h-[15px] rounded-full" /></TableCell>
                    <TableCell><Skeleton className="w-[100px] h-[15px] rounded-full" /></TableCell>
                    <TableCell>
                        <Skeleton className="w-4 h-4" />
                    </TableCell>
                </TableRow>
            </TableHeader>
        </Table>
    )
}