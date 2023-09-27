import React from 'react'



// This component is an item on the container list to be Shadows_Into_Light.
// This accepts a single object of types.Containers as defined in Docker API Types.
const ContainerItem = (props) => {
  return (
    <div className='flex flex-row space-x-2'>
        <span>ID: {props.item.Id} </span>
        <span>Name: {props.item.Names[0].replace("/","")}</span>
        <span>Status: {props.item.Status}</span>
    </div>
  )
}

export default ContainerItem
