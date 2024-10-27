import { Box, Button, Card, CardContent, CardMedia, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { Repo } from "../model/types"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { observer } from "mobx-react";
import { store } from "../../../app/store";
import { useState } from "react";

interface RepoItemProps {
  repo: Repo
}

export const RepoItem = observer(({ repo }: RepoItemProps) => {

  const [areIconsVisible, setAreIconsVisible] = useState(false)

  const [isEditing, setIsEditing] = useState(false)

  const [repoName, setRepoName] = useState('')
  const [description, setDescription] = useState('')
  const [username, setUsername] = useState('')

  const handleApplyChanges = () => {
    store.updateRepo(repo.id, repoName, description, username)
    setIsEditing(false)
    setRepoName('')
    setDescription('')
    setUsername('')
  }

  return (
    <Card sx={{
      width: {
        xs: '90vw',
        sm: '50vw',
      },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(20,24,27)',
      padding: 0,

    }}
      onMouseEnter={() => setAreIconsVisible(true)}
      onMouseLeave={() => {
        setAreIconsVisible(false)
        setIsEditing(false)
      }}
      onClick={() => setIsEditing(false)}
    >

      <CardContent sx={{ height: '5em', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.3em' }}>
          <CardMedia
            component="img"
            sx={{ width: 25 }}
            image={repo.owner.avatarUrl}
            alt="profile picture"
          />
          {isEditing
            ? <>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
              />
              <TextField
                id="outlined-basic"
                label="repo name"
                variant="outlined"
                value={repoName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setRepoName(event.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </>
            : <Tooltip title={repo.fullName} placement="top-end">
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: 'text.secondary' }}
              >
                {repo.fullName.length > 32 ? repo.fullName.slice(0, 29) + '...' : repo.fullName}
              </Typography>
            </Tooltip>
          }
        </Box>
        {areIconsVisible &&
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing) }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => store.toggleStar(repo.id)}>
              <StarBorderIcon sx={{
                fill: repo.starred ? 'yellow' : 'white',
              }} />
            </IconButton>
            <IconButton onClick={() => store.deleteRepo(repo.id)}>
              <DeleteIcon sx={{
                '&:hover': {
                  fill: 'red',
                },
              }} />
            </IconButton>
          </Box>
        }
      </CardContent>

      <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '0 1em' }}>
        {isEditing
          ?
          <>
            <TextField
              id="outlined-basic"
              label="description"
              variant="outlined"
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(event.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <Button variant="contained" onClick={handleApplyChanges}>Apply changes</Button>
          </>
          : <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {repo.description}
          </Typography>
        }
      </CardContent>

      <CardContent sx={{ display: 'flex', alignItems: 'center', marginTop: 'auto', gap: '2em', padding: '0 1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: ".3em" }}>
          <StarBorderIcon />
          <Typography>
            {repo.stargazersCount}
          </Typography>
        </Box>
        <Typography>
          {repo.language}
        </Typography>
      </CardContent>

    </Card>
  )
})
