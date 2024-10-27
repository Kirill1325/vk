import './App.scss'
import { ReposList } from "../widgets/ReposList/ui/ReposList"
import { observer } from 'mobx-react'

export const App = observer(() => {

  return (
    <div className="App">
      <ReposList />
    </div>
  )
})


