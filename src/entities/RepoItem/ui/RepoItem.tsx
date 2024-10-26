import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { Repo } from "../model/types"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';

interface RepoItemProps {
  repo: Repo
}

export const RepoItem = ({ repo }: RepoItemProps) => {

  return (
    <Card sx={{
      width: '50vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(20,24,27)',
      padding: 0,
    }}>

      <CardContent sx={{ height: '5em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.3em' }}>
          <CardMedia
            component="img"
            sx={{ width: 25 }}
            image={repo.owner.avatarUrl}
            alt="profile picture"
          />
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {repo.owner.login}
          </Typography>
          /
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {repo.name}
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <StarBorderIcon sx={{
              '&:hover': {
                fill: 'red',
              },
            }} />
          </IconButton>
          <IconButton>
            <DeleteIcon sx={{
              '&:hover': {
                fill: 'red',
              },
            }} />
          </IconButton>
        </Box>
      </CardContent>

      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          {repo.description}
        </Typography>
      </CardContent>

      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: '2em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.3em' }}>
          <StarBorderIcon />
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {repo.stargazersCount}
          </Typography>
        </Box>
        <Typography>
          {repo.language}
        </Typography>
      </CardContent>

    </Card>
  )
}
