import { throttle } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useElementSize } from '../model/useElementSize'
import { store } from '../../../app/store'
import { observer } from 'mobx-react'
import { RepoItem } from '../../../entities/RepoItem'
import { Box, Button, CircularProgress, List, ListItem, Tooltip } from '@mui/material'
import { mergeRefs } from '../model/mergeRefs'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { MySelect } from '../../../entities/Select'
import cl from './ReposList.module.scss'

const bufferedItems = 2
const gap = 10
const rowHeight = 200

export const ReposList = observer(() => {

    useEffect(() => {
        store.getRepos(`q=javascript&sort=${store.filter}&page=${store.page}`)
    }, [store.page, store.filter])

    const ref = useRef<HTMLUListElement>(null)

    const [containerRef, { height: containerHeight }] = useElementSize<HTMLUListElement>()

    const [scrollPosition, setScrollPosition] = useState(0)

    const visibleChildren = useMemo(() => {

        const startIndex = Math.max(Math.floor(scrollPosition / rowHeight) - bufferedItems, 0)
        const endIndex = Math.min(Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) + bufferedItems, store.repos.length - 1)
        return store.repos.slice(startIndex, endIndex + 1).map((repo, index) =>
            <ListItem
                key={repo.id}
                id={`repo-${repo.id.toString()}`}
                sx={{
                    position: 'absolute',
                    top: (startIndex + index) * rowHeight + index * gap,
                    height: rowHeight,
                    padding: 0,
                    width: 'max-content',
                    marginTop: { xs: '5em', sm: '2em' },
                }}
            >
                <RepoItem repo={repo} />
            </ListItem>
        )
    }, [store.repos, containerHeight, scrollPosition])

    const onScroll = useMemo(() =>
        throttle(
            function (e: any) {
                setScrollPosition(e.target.scrollTop)
                if ((e.target.clientHeight + e.target.scrollTop) >= e.target.scrollHeight) {
                    store.setPage(store.page + 1)
                }
            },
            50,
            { leading: false }
        ), [])

    const scrollToTop = () => {
        ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (store.status === 'fetching' && store.repos.length === 0) {
        return (
            <Box className={cl.loading}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <List
            onScroll={onScroll}
            role="reposList"
            className={cl.reposList}
            ref={mergeRefs(containerRef, ref)}
        >
            <MySelect />
            {scrollPosition > 0 &&
                <Tooltip title='Scroll to top'>
                    <Button
                        onClick={scrollToTop}
                        variant='contained'
                        role='scroll-to-top-button'
                    >
                        <ArrowUpwardIcon />
                    </Button>
                </Tooltip>
            }
            {visibleChildren}
            {store.repos.length > 0 && store.status === 'fetching' &&
                <Box className={cl.bottomLoading}>
                    <CircularProgress />
                </Box>
            }
        </List >

    )
})