"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {AppDefinition, ContainerDefinition} from "@/lib/customtypes";
import {
    DownloadIcon,
    FileWarningIcon,
    PackageIcon,
    RocketIcon,
    ServerCrash,
    ThumbsDownIcon,
    ThumbsUpIcon
} from "lucide-react";
import React, {useState} from "react";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea";
import {CheckButton} from "@/components/ui/deploy/check-image-button";
import {useRouter} from "next/navigation";
import {createContainer, reloadContainersPage, ServerResponse} from "@/lib/actions";
import Link from "next/link";
import {checkImage} from "@/lib/actions";





enum checkButtonStateEnum {
    default = "default",
    not_found = "not_found",
    bad_payload= "bad_payload",
    found = "found",
    error = "error"
}


const checkButtonIcons = {
    default: <PackageIcon className={`animate-pulse`} />,
    not_found: <FileWarningIcon className={`animate-pulse`}/>,
    found: <ThumbsUpIcon/>,
    bad_payload: <ThumbsDownIcon className={`animate-pulse`}/>,
    error: <ServerCrash className={`animate-pulse`}/>
}
const checkButtonText = {
    default: "Check",
    not_found: "Image Not Found",
    found: "Image Found",
    bad_payload: "Bad Payload",
    error: "Server Error"
}

const formSchema = z.object({
    containerName: z.string().optional(),
    imageName: z.string(),
    environmentVariables: z.string().optional()

})
export function TemplateForm(template: AppDefinition) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            containerName: "",
            imageName: template.config.Image ? template.config.Image : "",
            environmentVariables: template.config.Env?.join('\n')
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const envVariableList: Array<string> = values.environmentVariables ? values.environmentVariables.split('\n').filter((env) => {
            if (env.trim() !== "" && env.includes("=") ) { return env }
        }) : []
        const containerDefinition: ContainerDefinition = {
            containerName: values.containerName ? values.containerName : "",
            config: {
                Image: values.imageName,
                Env: envVariableList
            }
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(containerDefinition)
        }
        createContainer(containerDefinition)
            .then((response: ServerResponse) => {
                if (response.success) {
                    toast.success("Successfully created container")
                    reloadContainersPage()
                    replace("/dashboard/containers")
                } else {
                    toast.error(`Error: ${response.error}`)
                }
            })
            .catch((error) => {
                toast.error(`Error: ${error}`)
            })
    }

    const [imageValue, setImageValue] = useState(template.config.Image ? template.config.Image : "")
    const [deployEnabled, setDeployEnabled] = useState(false)
    const [checkButtonState, setCheckButtonStatus] = useState(checkButtonStateEnum.default)
    const {replace} = useRouter()
    const handleCheck = async (image: string) => {
        checkImage(image.trim())
            .then((response) => {
                if (response.status === 200 ) {
                    setDeployEnabled(true)
                    setCheckButtonStatus(checkButtonStateEnum.found)
                    toast.success("Image exists")
                } else if (response.status === 404) {
                    setDeployEnabled(false)
                    setCheckButtonStatus(checkButtonStateEnum.not_found)
                    toast.error("Image doesn't exist. Try Downloading.")
                } else if (response.status === 400) {
                    setDeployEnabled(false)
                    setCheckButtonStatus(checkButtonStateEnum.bad_payload)
                    toast.error("Bad Payload")
                } else {
                    setDeployEnabled(false)
                    setCheckButtonStatus(checkButtonStateEnum.error)
                    toast.error("Server Error")
                }
            })
            .catch((error) => {
                setDeployEnabled(false)
                setCheckButtonStatus(checkButtonStateEnum.error)
                toast.error("Server Error")
            })

    }

    const pullImageButton = () => {
        return (
            <Button className={`mt-5`} variant={"outline"}>
                <DownloadIcon className={`mr-2`}/>
                Get {imageValue}
            </Button>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="containerName"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Name of the container (Optional)" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageName"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex w-full min-w-xl max-w-xl items-center space-x-2">
                                    <Input onChangeCapture={(e) => {
                                        setImageValue(e.currentTarget.value)
                                        setCheckButtonStatus(checkButtonStateEnum.default)
                                        setDeployEnabled(false)
                                    }} placeholder="Image (repository:version)" {...field}/>
                                    <CheckButton
                                        type={"button"}
                                        variant={checkButtonState}
                                        onClick={async () => {
                                            await handleCheck(imageValue)
                                        }}
                                    >
                                        {checkButtonIcons[checkButtonState]}

                                        {checkButtonText[checkButtonState]}
                                    </CheckButton>

                                </div>

                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {
                    checkButtonState === checkButtonStateEnum.not_found ?
                    <Link href={`/dashboard/images/pull?image=${imageValue}`}>
                        <Button className={`mt-5`} variant={"outline"}>
                            <DownloadIcon className={`mr-2`}/>
                            Get {imageValue}
                        </Button>
                    </Link>


                    :
                    <></>
                }

                <p className={`flex flex-col space-y-1.5 text-center sm:text-left font-bold`}>Environment
                    Variables</p>
                <FormField
                    control={form.control}
                    name="environmentVariables"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder={"key=value"} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                    <Button type="submit" disabled={!deployEnabled} className={`bg-green-700 hover:bg-green-600`}>
                    <RocketIcon className={`mr-2`}/>
                        Deploy
                    </Button>
            </form>
        </Form>
    )
}