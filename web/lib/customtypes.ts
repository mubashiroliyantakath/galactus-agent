


export interface containerConfig {
    Env: Array<string>
    Image?: string
}
export interface AppDefinition {
    name: string,
    description: string,
    config: containerConfig
}