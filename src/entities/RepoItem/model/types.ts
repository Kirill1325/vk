export type Owner = {
    login: string
    id: number
    avatarUrl: string
}

enum Visibility {
    public = 'public',
    private = 'private'
}

export type Repo = {
    owner: Owner
    id: number
    name: string
    visibility: Visibility
}