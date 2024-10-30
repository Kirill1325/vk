import './App.scss'
import { ReposList } from "../widgets/ReposList/ui/ReposList"
import { observer } from 'mobx-react'
import { store } from './store'

export const App = observer(() => {

  return (
    <div className="App" onClick={() => store.setIsEditing('all', false)}>
      <ReposList />
    </div>
  )
})


