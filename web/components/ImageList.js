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
import {CopyIcon, TrashIcon, ValueNoneIcon} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import {toast} from "sonner";
import {copyId} from "@/lib/copyToClipboard";

function transformImageList(imageList) {
    const transformedImageList = []
    imageList.forEach(item => {
        if (item.RepoTags.length === 0) {
            transformedImageList.push({
                ...item,
                name: "<none>",
                version: "<none>"
            })
        } else {
            item.RepoTags.forEach(repoTag => {
                const version = repoTag.split(":").slice(-1)[0]
                const name = repoTag.split(":").slice(0,-1).join(":")
                transformedImageList.push({
                    ...item,
                    name: name,
                    version: version
                });
            })
        }

    });
    return transformedImageList
}

function ImageList() {
    const [imageList, setImageList] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const imageAction = (id, name, action) => {
        toast.message('Container Action Scheduled', {
            description: `${action} container ${name}`
        })
        const payload = {
            id: id,
            action: action
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        fetch('/api/images/action', requestOptions)
            .then(response => {
                if (!response.ok) {
                    toast.error("There was an error with the request! Please check if the image is in use by a container.")
                    return
                }
                toast.success(`${action} action on image "${name}" successful`)
                fetch('/api/images/list')
                    .then((res) => res.json())
                    .then((imageList) => {
                        setImageList(transformImageList(imageList))
                    }).catch((error) =>  {
                    throw new Error(error)
                })

            })
            .catch(error => {
                console.log(error)
                toast.error(`There was a problem with the request!`)
            })
    }






    useEffect(() => {
      setIsLoading(true)
      fetch('/api/images/list')
          .then((res) => res.json())
          .then((imageList) => {
              setImageList(transformImageList(imageList))
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

        { imageList.length !== 0 ?
        <Table>
        <TableCaption>A list of images available locally on the host.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
        {imageList.map((image, index) =>
        <TableRow key={index}>
            <TableCell className="flex align-middle p-4 space-x-1">
                <CopyIcon className="align-middle mt-0.5 hover:text-blue-600" onClick={(e) => copyId(image.Id.split(":")[1])}/>
                <span  className="align-middle" >{image.Id.split(":")[1].substring(0,12)}</span>
            </TableCell>
            <TableCell className='font-medium'>{image.name}</TableCell>
            <TableCell>{image.version}</TableCell>
            <TableCell>
            <Button variant="ghost" size="icon" onClick={(e) => {imageAction(image.Id.split(":")[1].substring(0,12), `${image.name}:${image.version}`, "DELETE" )}}><TrashIcon className="w-4 h-4 hover:text-red-500"/></Button>
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
