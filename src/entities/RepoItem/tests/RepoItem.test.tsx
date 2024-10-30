import { describe, expect, it } from 'vitest'
import {  act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RepoItem } from '../ui/RepoItem'
import { RepoEditingForm } from '../ui/RepoEditingForm'

const repoItem = {
    id: 1,
    fullName: "octocat/Hello-World",
    description: "This is your first repo!",
    language: "JavaScript",
    stargazersCount: 80,
    starred: false,
    isEditing: false,
    owner: {
        id: 2,
        avatarUrl: "https://github.com/images/error/octocat_happy.gif",
    }
}

describe('ReposItem', function () {
    it('displays repo', async () => {

        render(<RepoItem repo={repoItem} />)

        expect(screen.getByTestId('repo-1')).toBeInTheDocument()

        screen.debug()

    })

    it('hovers over repo', async () => {

        render(<RepoItem repo={repoItem} />)

        expect(screen.queryByTestId('repoIcons')).not.toBeInTheDocument()
        fireEvent.mouseOver(screen.getByTestId('repo-1'))

        expect(await screen.findByTestId('repoIcons')).toBeInTheDocument()
    })

    it('edits repo', () => {

        render(<RepoEditingForm repo={repoItem} />)
        
        expect(screen.getByTestId('username-input')).toBeInTheDocument()

        act(() => {
            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'username' } })
            fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'description' } })
            fireEvent.change(screen.getByTestId('reponame-input'), { target: { value: 'reponame' } })
        })

        expect(screen.getByTestId('username-input')).toHaveValue('username')
        expect(screen.getByTestId('description-input')).toHaveValue('description')
        expect(screen.getByTestId('reponame-input')).toHaveValue('reponame')
    })

})
