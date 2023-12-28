"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {AppDefinition} from "@/lib/customtypes";
import {PackageIcon, RocketIcon} from "lucide-react";
import {GALACTUS_AGENT_API} from "@/lib/constants";
import {useState} from "react";
import {toast} from "sonner";
import {TemplateForm} from "@/components/ui/deploy/template-form";



export function TemplateDialog(template: AppDefinition) {
    const [imageValue, setImageValue] = useState('')
    const [versionValue, setVersionValue] = useState('')
    const [deployEnabled, setDeployEnabled] = useState(false)


    const handleCheck = async (image: string,version: string) => {
        const payload = {
            image: image.trim(),
            version: version.trim()
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        fetch(`${GALACTUS_AGENT_API}/api/v1/images/search`, requestOptions)
            .then((response) => {
                if (response.ok ) {
                    setDeployEnabled(true)
                    console.log(payload)
                    toast.success("Image exists")
                } else {
                    setDeployEnabled(false)
                    toast.error("Image doesn't exist")
                }
            })

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`bg-green-700 hover:bg-green-600`}>Deploy {template.name}</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Edit {template.name} template</DialogTitle>
                    <DialogDescription>
                        Make changes to the template here. Click deploy when you are done.
                    </DialogDescription>
                </DialogHeader>
                <TemplateForm {...template}/>
                {/*<div className="grid gap-4 py-4">*/}

                {/*    <p className={`flex flex-col space-y-1.5 text-center sm:text-left font-bold`}>Environment*/}
                {/*        Variables</p>*/}
                {/*    {template.config.Env?.map((env) => (*/}
                {/*        <div key={template.name} className="grid grid-cols-4 items-center gap-4">*/}
                {/*            <Label htmlFor={env.split("=")[0]} className="text-right">*/}
                {/*                {env.split("=")[0]}*/}
                {/*            </Label>*/}
                {/*            <Input*/}
                {/*                id={env.split("=")[0]}*/}
                {/*                defaultValue={env.split("=")[1]}*/}
                {/*                className="col-span-3"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    ))}*/}

                {/*</div>*/}
                {/*<DialogFooter>*/}
                {/*    <Button type="submit" disabled={!deployEnabled} className={`bg-green-700 hover:bg-green-600`}>*/}
                {/*    <RocketIcon className={`mr-2`}/>*/}
                {/*        Deploy*/}
                {/*    </Button>*/}
                {/*</DialogFooter>*/}
            </DialogContent>
        </Dialog>
    )
}
