import { Repo } from "../entities/RepoItem";
import { filters } from "../entities/Select/ui/Select";
import { repoService } from "../widgets/ReposList";
import { makeObservable, observable, runInAction } from 'mobx';

class Store {

    status = ""
    repos: Repo[] = []
    filter = filters[0]
    page = 1

    constructor() {
        makeObservable(this, {
            repos: observable,
            status: observable,
            filter: observable,
            page: observable
        })
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
                this.repos = [...this.repos, ...repos]
            })
        } catch (_e) {
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
                    return {
                        ...repo,
                        stargazersCount: repo.starred ? repo.stargazersCount - 1 : repo.stargazersCount + 1,
                        starred: !repo.starred
                    }
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

    setIsEditing(id: number | 'all', isEditing: boolean) {
        runInAction(() => {
            id === 'all'
                ? this.repos = this.repos.map((repo) => {
                    return { ...repo, isEditing: isEditing }
                })
                : this.repos = this.repos.map((repo) => {
                    if (repo.id === id) {
                        return { ...repo, isEditing: isEditing }
                    }
                    return { ...repo, isEditing: false }
                })
        })
    }

    setPage(page: number) {
        runInAction(() => {
            this.page = page
        })
    }

    setFilter(filter: string) {
        runInAction(() => {
            this.page = 1
            this.repos = []
            this.filter = filter
        })
    }

}

export const store = new Store()