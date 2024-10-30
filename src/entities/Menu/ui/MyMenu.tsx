import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Divider, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Repo } from '../../RepoItem';
import { store } from '../../../app/store';
import cl from './MyMenu.module.scss'

interface Props {
    repo: Repo
}

export const BasicMenu = ({ repo }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (e: React.MouseEvent<HTMLDivElement | HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        setAnchorEl(null);
    };

    return (
        <Box className={cl.menuContent}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </Button>
            <Menu
                className={cl.menuContent}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClose(e)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                <MenuItem
                    onClick={(e) => {
                        handleClose(e)
                        store.setIsEditing(repo.id, true)
                    }}
                >
                    <Box className={cl.menuItem} >
                        <EditIcon />
                        <Typography>Edit</Typography>
                    </Box>
                </MenuItem>

                <MenuItem
                    onClick={(e) => {
                        handleClose(e)
                        store.toggleStar(repo.id)
                    }}
                >
                    <Box className={cl.menuItem}>
                        <StarBorderIcon sx={{
                            fill: repo.starred ? 'yellow' : 'white',
                        }} />
                        <Typography>Star</Typography>
                    </Box>
                </MenuItem>

                <Divider sx={{ backgroundColor: 'white' }} variant='middle' />

                <MenuItem
                    onClick={(e) => {
                        handleClose(e)
                        store.deleteRepo(repo.id)
                    }}
                >
                    <Box className={cl.menuItem}>
                        <DeleteIcon />
                        <Typography>Delete</Typography>
                    </Box>
                </MenuItem>
            </Menu>
        </Box>
    );
}