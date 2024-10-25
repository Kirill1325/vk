import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { store } from '../../../app/store'

export const ReposList = observer(() => {

    useEffect(() => {
        store.getRepos('q=javascript')

    }, [])

    // useEffect(() => {
    //   console.log(store.repos)
    // }, [store.repos])

    return (
        <div>
            {store.repos.map(repo => <p key={repo.id}>{repo.owner.login}</p>)}
        </div>
    )
})
