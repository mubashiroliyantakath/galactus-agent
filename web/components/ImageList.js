"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect,useState } from "react";
import Loading from "@/app/dashboard/images/loading";
import { Button } from "./ui/button";
import { TrashIcon, ValueNoneIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
function ImageList() {
    const [imageList, setImageList] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setIsLoading(true)
      fetch('/api/images/list')
          .then((res) => res.json())
          .then((imageList) => {
              setImageList(imageList)
              setIsLoading(false)
          }).catch((error) =>  {
            throw new Error(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
      return <Loading/>
    } else
    return (
        <>

        { imageList.length != 0 ?
        <Table>
        <TableCaption>A list of images avaialble locally on the host.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
        {imageList.map((image) =>
        <TableRow key={image.Id.split(":")[1].substring(0,12)}>
            <TableCell>{image.Id.split(":")[1].substring(0,12)}</TableCell>
            <TableCell className='font-medium'>{image.RepoTags.length ==0 ? "<none>" : image.RepoTags[0].split(":")[0]}</TableCell>
            <TableCell>{image.RepoTags.length ==0 ? "<none>" : image.RepoTags[0].split(":")[1]}</TableCell>
            <TableCell>
            <Button variant="ghost" size="icon"><TrashIcon className="w-4 h-4 hover:text-red-500"/></Button>
            </TableCell>
        </TableRow>
        )}
        </TableBody>
        </Table>
        :
        <Alert className="w-1/2 mt-44 border-blue-500" >
            <ValueNoneIcon className="h-4 w-4"/>
            <AlertTitle>No Images Available!</AlertTitle>
            <AlertDescription>
                There are no images available.
            </AlertDescription>
        </Alert>
        }
        </>
    )
}

export {ImageList};
