
export class RepoDto {

    owner = {
        id: 0,
        avatarUrl: ''
    }
    id: number
    fullName: string
    description: string
    language: string
    stargazersCount: number
    starred = false

    constructor(model: any) {
        // this.owner = model.owner
        this.owner.avatarUrl = model.owner.avatar_url
        this.owner.id = model.owner.id
        this.id = model.id
        this.fullName = model.full_name
        this.language = model.language
        this.stargazersCount = model.stargazers_count
        this.description = model.description
    }
}