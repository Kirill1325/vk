import { CardContent, Box, CardMedia, Tooltip, Typography, IconButton } from "@mui/material";
import { observer } from "mobx-react";
import { store } from "../../../app/store";
import { MyMenu } from "../../Menu";
import { Repo } from "../model/types";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import cl from './RepoCardContent.module.scss'

interface Props {
    repo: Repo
    areIconsVisible: boolean
}

export const RepoCardContent = observer(({ repo, areIconsVisible }: Props) => {
    return (
        <Box className={cl.repoCardContent}>
            <CardContent className={cl.repoCardContentTop} >
                <Box className={cl.repoCardContentTopName} >
                    <CardMedia
                        component="img"
                        image={repo.owner.avatarUrl}
                        alt="profile picture"
                    />
                    <Tooltip title={repo.fullName} placement="top-end">
                        <Typography
                            variant="subtitle1"
                            component="div"
                        >
                            {repo.fullName.length > 32 ? repo.fullName.slice(0, 29) + '...' : repo.fullName}
                        </Typography>
                    </Tooltip>
                </Box>
                {areIconsVisible &&
                    <Box className={cl.repoCardContentTopIcons} data-testid='repoIcons'>
                        <IconButton
                            className={cl.iconButton}
                            onClick={(e) => { e.stopPropagation(); store.setIsEditing(repo.id, !repo.isEditing) }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            className={cl.iconButton}
                            data-testid='starButton'
                            onClick={() => store.toggleStar(repo.id)}
                        >
                            <StarBorderIcon sx={{
                                fill: repo.starred ? 'yellow' : 'white',
                            }} />
                        </IconButton>
                        <IconButton
                            className={cl.iconButton}
                            data-testid='deleteButton'
                            onClick={() => store.deleteRepo(repo.id)}
                        >
                            <DeleteIcon />
                        </IconButton>

                    </Box>
                }
                <MyMenu repo={repo} />
            </CardContent>

            <CardContent className={cl.repoCardContentDescription}>
                <Typography
                    variant="subtitle1"
                    component="div"
                >
                    {repo.description}
                </Typography>
            </CardContent>

            <CardContent className={cl.repoCardContentBottom}>
                <Box className={cl.repoCardContentBottomStars} >
                    <StarBorderIcon
                        role='starsCountIcon'
                        sx={{
                            fill: repo.starred ? 'yellow' : 'white',
                        }} />
                    <Typography role='stars-count'>
                        {repo.stargazersCount}
                    </Typography>
                </Box>
                <Typography>
                    {repo.language}
                </Typography>
            </CardContent>
        </Box>
    )
})
