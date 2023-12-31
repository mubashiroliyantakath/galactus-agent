import Image from 'next/image'
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="scroll-m-20 text-4xl text-center font-extrabold mb-4">
            Galactus Agent Dashboard
          </h1>
          <Button asChild className={`m-4 bg-green-700 font-bold hover:bg-green-600`}>
              <Link href={`/dashboard`}>Login</Link>
          </Button>
      </div>
  )
}
