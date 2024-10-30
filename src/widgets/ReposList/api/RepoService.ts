import { Repo } from "../../../entities/RepoItem";
import { RepoDto } from "../../../entities/RepoItem";

class RepoService {

    url: string

    constructor() {
        this.url = 'https://api.github.com/search/repositories'
    }

    async getRepos(urlParams: string): Promise<Repo[]> {


        const request = this.url + "?" + urlParams
        const response = await fetch(request, { headers: {
            "Authorization":" Bearer " + import.meta.env.VITE_GITHUB_TOKEN
        } })
        const r = await response.json()

        const repos = r.items.map((repo: any) => new RepoDto(repo))

        return repos
    }

}

export const repoService = new RepoService()