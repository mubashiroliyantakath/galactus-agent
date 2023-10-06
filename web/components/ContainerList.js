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
import { useEffect, useState } from "react"
import Loading from "@/app/dashboard/containers/loading"
import { StopIcon, PlayIcon, TrashIcon, ValueNoneIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { toast } from "sonner";

// Renders a list of containers in table format
function ContainerList () {

  const [containerList, setContainerList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const containerAction = (id, name, action) => {

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

    fetch('/api/containers/action', requestOptions)
        .then(response => {
            if (!response.ok) {
                toast.error("There was an error with the request!")
                return
            }
            toast.success(`${action} action on container "${name}" successful`)
            fetch('/api/containers/list')
                .then((res) => res.json())
                .then((containerList) => {
                    setContainerList(containerList)
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
    fetch('/api/containers/list')
        .then((res) => res.json())
        .then((containerList) => {
            setContainerList(containerList)
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
    { containerList.length !== 0 ?
    <Table>
        <TableCaption>A list of containers running on the host.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {containerList.map((container) =>
        <TableRow key={container.Id.substring(0,12)}>
            <TableCell className='font-medium'>{container.Id.substring(0,12)}</TableCell>
            <TableCell>{container.Names[0].replace("/","")}</TableCell>
            <TableCell>{container.Image}</TableCell>
            <TableCell>{container.Status}</TableCell>
            <TableCell>
                {container.State === "running" ? <Button variant="danger" size="icon" onClick={(e) => containerAction(container.Id, container.Names[0].replace("/",""), "STOP")}><StopIcon className="h-4 w-4"/></Button> : <Button variant="good" size="icon" onClick={(e) => containerAction(container.Id, container.Names[0].replace("/",""), "START")}><PlayIcon className="h-4 w-4"/></Button>}
                <Button variant="ghost" disabled={container.State === "running"} onClick={(e) => containerAction(container.Id, container.Names[0].replace("/",""), "DELETE")} size="icon"><TrashIcon className="w-4 h-4 hover:text-red-500"/></Button>
            </TableCell>
        </TableRow>
        )}
        </TableBody>
        </Table>
        :
        <Alert className="w-1/2 mt-44 border-blue-500" >
            <ValueNoneIcon className="h-4 w-4"/>
            <AlertTitle>No Containers Running!</AlertTitle>
            <AlertDescription>
                There are no containers present.
            </AlertDescription>
        </Alert>
        }
    </>

  )
}

export default ContainerList

