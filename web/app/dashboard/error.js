'use client'
import React from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
const error = () => {
  return (
    <main className="flex flex-col items-center justify-between px-10">
    <Alert className="w-1/2 mt-44" variant="destructive">
    <ExclamationTriangleIcon className="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      Something is broken on our end.
    </AlertDescription>
  </Alert>
  </main>
  )
}

export default error
