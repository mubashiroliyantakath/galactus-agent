import ImagesTable from "@/components/ui/images/table";
import App from "@/components/ui/deploy/app";
import {fetchTemplateList} from "@/lib/data";

export default async function Page() {
    const templateList = await fetchTemplateList()
    return (
        <main className="flex flex-col grow items-center justify-center">
            <div className={`flex flex-row gap-4 flex-wrap`}>
                {templateList.map((template) => (
                    <App key={template.name} {...template}/>
                ))}
            </div>

        </main>
    )
}