"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {AppDefinition} from "@/lib/customtypes";
import {TemplateForm} from "@/components/ui/deploy/template-form";



export function TemplateDialog(template: AppDefinition) {
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
            </DialogContent>
        </Dialog>
    )
}
