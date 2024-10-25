import { Repo } from "../entities/RepoItem";
import { repoService } from "../widgets/ReposList";
import { makeObservable, observable, runInAction } from 'mobx';

class Store {

    // repoService: RepoService
    status: string
    repos: Repo[]

    constructor() {
        makeObservable(this, {
            repos: observable,
            status: observable
        })
        // this.repoService = new RepoService()
        this.status = ""
        this.repos = []
    }

    async getRepos(urlParams: string) {
        try {
            this.status = "fetching"
            const repos = await repoService.getRepos(urlParams)
            // console.log(repos)
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

}

export const store = new Store()