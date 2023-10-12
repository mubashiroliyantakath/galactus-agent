import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";




const roadmapItems = [
  {
    title: "Actions on Container and Images page",
    description: "Done",

  },
  {
    title: "Drop .tar.gz files to upload images to the server",
    description: "Backlog",

  },

]

export default function Home() {
  return (
    <>
      <Header/>
      <main className="flex flex-col items-center justify-between p-10">
      <Card>
        <CardHeader>
          <CardTitle>Roadmap</CardTitle>
          <CardDescription>Features that might make its way into the Galactus Agent Dashboard</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {roadmapItems.map((roadmapItem,index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className={`flex h-2 w-2 translate-y-1 rounded-full bg-sky-500`} />
                <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {roadmapItem.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {roadmapItem.description}
                </p>
              </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>

        <a href="https://github.com/mubashiroliyantakath/galactus-agent" className="w-full">
        <Button className="w-full">

          <GitHubLogoIcon  className="mr-2 h-4 w-4"/>
              Visit this project on Github

        </Button>
        </a>

        </CardFooter>
      </Card>

      </main>
    </>

  )
}
