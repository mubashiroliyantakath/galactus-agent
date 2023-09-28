import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableHeader,
  TableRow,
  TableCaption,
  TableHead,
  TableCell
} from '@/components/ui/table'

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return(
    <main className="flex flex-col items-center justify-between px-10">
    <Table>
      <TableCaption>A list of images avaialble locally on the host.</TableCaption>
      <TableHeader>
        <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Version</TableHead>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton className="w-[75px] h-[15px] rounded-full" /></TableCell>
            <TableCell><Skeleton className="w-[125px] h-[15px] rounded-full" /></TableCell>
            <TableCell><Skeleton className="w-[100px] h-[15px] rounded-full" /></TableCell>
          </TableRow>
      </TableHeader>
    </Table>
    </main>)
  }
