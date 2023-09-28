import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "./ui/skeleton";

async function getContainers(){

    const imageList = await fetch(`http://127.0.0.1:7867/api/v1/images/list`, {
        next: {
            revalidate: 30
        }
    })
    if (!imageList.ok){
      throw new Error('Failed to fetch data')
    }
    return imageList.json()
}

async function ImageList() {
    const images = await getContainers();
    return (
        <Table>
        <TableCaption>A list of images avaialble locally on the host.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Version</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {images.map((image,index) =>
            <TableRow key={index}>
                <TableCell>{image.Id.split(":")[1].substring(0,12)}</TableCell>
                <TableCell className='font-medium'>{image.RepoTags[0].split(":")[0]}</TableCell>
                <TableCell>{image.RepoTags[0].split(":")[1]}</TableCell>
            </TableRow>
            )}
        </TableBody>
    </Table>
    )
}

export {ImageList};
