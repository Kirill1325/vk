import { Repo } from "../entities/RepoItem";
import { repoService } from "../widgets/ReposList";
import { makeObservable, observable, runInAction } from 'mobx';

class Store {

    status: string
    repos: Repo[]

    constructor() {
        makeObservable(this, {
            repos: observable,
            status: observable
        })
        this.status = ""
        this.repos = []
    }

    async getRepos(urlParams: string) {
        try {
            runInAction(() => {
                this.status = "fetching"
            })
            const repos = await repoService.getRepos(urlParams)
            runInAction(() => {
                this.status = "success"
            })
            runInAction(() => {
                this.repos = repos
            })
        } catch (e) {
            runInAction(() => {
                this.status = "error"
            })
        }
    }

    deleteRepo(id: number){
        this.repos =this.repos.filter((repo) => repo.id !== id)
    }

}

export const store = new Store()