import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import {  render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReposList } from '../ui/ReposList'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'

export const server = setupServer(
    http.get('/https://api.github.com/search/repositories?q=javascript&sort=updated&order=asc&page=1', async () => {
        return HttpResponse.json({
            "total_count": 2,
            "incomplete_results": false,
            "items": [
                {
                    "id": 1,
                    "full_name": "octocat/Hello-World",
                    "description": "This your first repo!",
                    "language": "JavaScript",
                    "stargazers_count": 80,
                    "owner": {
                        "id": 2,
                        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
                    }
                },
                {
                    "id": 3,
                    "full_name": "Hello TypeScript",
                    "description": "This your second  repo!",
                    "language": "TypeScript",
                    "stargazers_count": 50,
                    "owner": {
                        "id": 4,
                        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
                    }
                },
            ]
        })
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ReposList', () => {
    it('loads and displays repos', async () => {

        render(<ReposList />)

        expect(screen.getByRole('progressbar')).toBeInTheDocument()

        const reposList = await screen.findByRole('reposList')

        expect(reposList).toBeInTheDocument()
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()

    })

})
