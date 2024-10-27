export type Owner = {
    id: number
    avatarUrl: string
}

export type Repo = {
    owner: Owner
    fullName: string
    id: number
    description: string
    language: string
    stargazersCount: number
    starred: boolean
}