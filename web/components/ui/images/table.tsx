import {Table, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {fetchImages, ImageItem} from "@/lib/data";
import {ImageListRow} from "@/components/ui/images/image-table-row";
import {transformImageList} from "@/lib/utils";




export default async function ImagesTable() {
    const imageList = await fetchImages()
    const transformedImageList = transformImageList(imageList)
    return (
        <Table>
            <TableCaption>A list of images available on the host</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                {transformedImageList?.map((image) => (
                    <ImageListRow key={image.Id} Id={image.Id} RepoTags={image.RepoTags} name={image.name} version={image.version}/>
                ))}
            </TableHeader>
        </Table>
    );
}