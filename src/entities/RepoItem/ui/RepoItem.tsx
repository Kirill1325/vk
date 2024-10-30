import { Card } from "@mui/material"
import { Repo } from "../model/types"
import { observer } from "mobx-react";
import { store } from "../../../app/store";
import { useState } from "react";
import { RepoEditingForm } from "./RepoEditingForm";
import { RepoCardContent } from "./RepoCardContent";
import cl from './RepoItem.module.scss'

interface RepoItemProps {
  repo: Repo
}

export const RepoItem = observer(({ repo }: RepoItemProps) => {

  const [areIconsVisible, setAreIconsVisible] = useState(false)

  return (
    <Card
      className={cl.repoItem}
      onMouseEnter={() => setAreIconsVisible(true)}
      onMouseLeave={() => setAreIconsVisible(false)}
      onClick={() => store.setIsEditing(repo.id, false)}
      data-testid={`repo-${repo.id.toString()}`}
    >

      {repo.isEditing
        ? <RepoEditingForm repo={repo} />
        : <RepoCardContent repo={repo} areIconsVisible={areIconsVisible} />
      }

    </Card>
  )
})
