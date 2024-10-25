
export class RepoDto {

    owner = {
        login: '',
        id: 0,
        avatarUrl: ''
    }
    id: number
    name: string
    visibility: string

    constructor(model: any) {
        // this.owner = model.owner
        this.owner.avatarUrl = model.owner.avatar_url
        this.owner.login = model.owner.login
        this.owner.id = model.owner.id
        this.id = model.id
        this.name = model.name
        this.visibility = model.visibility
    }
}