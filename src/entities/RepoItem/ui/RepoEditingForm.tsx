import { CardContent, Box, Button, styled, TextField } from '@mui/material'
import { store } from '../../../app/store'
import { observer } from 'mobx-react'
import { Repo } from '../model/types'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import cl from './RepoEditingForm.module.scss'

const StyledInput = styled(TextField)({

    '& .MuiFormLabel-root': {
        top: '-15%',
    },

    '& .Mui-focused': {
        top: '5%',
    },

    '& .MuiInputBase-input': {
        width: '50%',
        height: '.5em',
    },

    '& .description': {
        marginLeft: '2em',
    },

});

const Error = styled('p')({
    color: 'red',
})

interface Props {
    repo: Repo
}

export const RepoEditingForm = observer(({ repo }: Props) => {

    const formik = useFormik({
        initialValues: {
            repoName: '',
            description: '',
            username: '',
        },
        validationSchema: Yup.object({
            repoName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            description: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            username: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: values => {
            store.updateRepo(repo.id, values.repoName, values.description, values.username)
            store.setIsEditing(repo.id, false)
        },
    });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        formik.handleSubmit()
    }

    return (
        <CardContent
            className={cl.repoEditingForm}
            onClick={(e) => e.stopPropagation()}
            role='repo-editing-form'
        >
            <Box className={cl.repoEditingFormTop}>
                <StyledInput
                    id='username'
                    inputProps={{
                        "data-testid": "username-input",
                    }}
                    label={formik.touched.username && formik.errors.username ? (
                        <Error>{formik.errors.username}</Error>
                    ) : 'username'}
                    variant='outlined'
                    autoComplete='off'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    onClick={(e) => e.stopPropagation()}
                />

                <StyledInput
                    id='repoName'
                    inputProps={{
                        "data-testid": "reponame-input",
                    }}
                    label={formik.touched.repoName && formik.errors.repoName ? (
                        <Error>{formik.errors.repoName}</Error>
                    ) : 'repoName'}
                    variant='outlined'
                    autoComplete='off'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.repoName}
                    onClick={(e) => e.stopPropagation()}
                />

            </Box>
            <Box className={cl.repoEditingFormBottom} >
                <StyledInput
                    className='description'
                    id='description'
                    inputProps={{
                        "data-testid": "description-input",
                    }}
                    label={formik.touched.description && formik.errors.description ? (
                        <Error>{formik.errors.description}</Error>
                    ) : 'description'}
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    onClick={(e) => e.stopPropagation()}
                />

                <Button
                    type='submit'
                    onClick={(e) => handleSubmit(e)}
                    variant='contained'
                >
                    Save
                </Button>
            </Box>
        </CardContent>
    )
})
