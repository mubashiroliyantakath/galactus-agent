


import ContainerItem from "./ContainerItem"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

async function getContainers(){
    'use server'
    const containerList = await fetch(`http://127.0.0.1:7867/api/v1/containers/list`, {
        next: {
            revalidate: 30
        }
    })
    if (!containerList.ok){
      throw new Error('Failed to fetch data')
    }
    return containerList.json()
  }

// Renders a list of containers in table format
async function ContainerList () {
    const containers = await getContainers()
  return (
    <Table>
        <TableCaption>A list of containers running on the host</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {containers.map((container,index) =>
            <TableRow key={index}>
                <TableCell className='font-medium'>{container.Id.substring(0,12)}</TableCell>
                <TableCell>{container.Names[0].replace("/","")}</TableCell>
                <TableCell>{container.Image}</TableCell>
                <TableCell>{container.Status}</TableCell>
            </TableRow>
            )}
        </TableBody>
    </Table>
    // <div>
    //     {containers.map((container,index) =>
    //         <ContainerItem key={index} item={container}/>
    //     )}
    // </div>
  )
}

export default ContainerList

