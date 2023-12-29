import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {fetchTemplateList} from "@/lib/data";
import {AppDefinition} from "@/lib/customtypes";
import {TemplateDialog} from "@/components/ui/deploy/template-dialog";

export default async function App(template: AppDefinition) {

    return (
        <div>
            <Card className={`hover:border-slate-400 hover:bg-slate-100 dark:border-muted-foreground dark:hover:border-amber-300 dark:hover:bg-amber-600/20`}>
                <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <TemplateDialog {...template} />
                </CardContent>
            </Card>

        </div>
    )
}