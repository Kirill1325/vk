import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { observer } from 'mobx-react'
import { store } from '../../../app/store'
import cl from './Select.module.scss'

export const filters = [
    'stars',
    'forks',
    'help-wanted-issues',
    'updated'
]

export const BasicSelect = observer(() => {

    const handleChange = (event: SelectChangeEvent) => {
        store.setFilter(event.target.value as string)
    }

    return (
        <Box className={cl.select} >
            <FormControl fullWidth className={cl.form}>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                    className={cl.selectContent}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={store.filter}
                    label="Filter"
                    onChange={handleChange}

                >
                    {filters.map((filter) =>
                        <MenuItem
                            className={cl.menuItem}
                            key={filter}
                            value={filter}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)'
                                }
                            }}
                        >
                            {filter}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
})