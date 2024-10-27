import { Repo } from "../entities/RepoItem";
import { repoService } from "../widgets/ReposList";
import { makeObservable, observable, runInAction } from 'mobx';

// TODO: раскидать на разные сторы
// TODO: action for handling closing editing mode
// TODO: добавить подгрузку репозиториев
// TODO: тесты
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
                console.log('add')
                this.repos = [...this.repos, ...repos]
            })
        } catch (e) {
            runInAction(() => {
                this.status = "error"
            })
        }
    }

    deleteRepo(id: number) {
        runInAction(() => {
            this.repos = this.repos.filter((repo) => repo.id !== id)
        })

    }

    toggleStar(id: number) {
        runInAction(() => {
            this.repos = this.repos.map((repo) => {
                if (repo.id === id) {
                    return { ...repo, stargazersCount: repo.starred ? repo.stargazersCount - 1 : repo.stargazersCount + 1, starred: !repo.starred }
                }
                return repo
            })
        })
    }

    updateRepo(id: number, name: string, description: string, login: string) {
        runInAction(() => {
            this.repos = this.repos.map((repo) => {
                if (repo.id === id) {
                    return { ...repo, fullName: `${login}/${name}`, description: description }
                }
                return repo
            })
        })
    }

}

export const store = new Store()