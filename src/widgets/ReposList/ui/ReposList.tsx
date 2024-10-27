import { throttle } from "lodash"
import React, { useEffect, useState } from "react"
import { useElementSize } from "../model/useElementSize"
import { store } from "../../../app/store"
import { observer } from "mobx-react"
import { RepoItem } from "../../../entities/RepoItem/ui/RepoItem"
import { Box, CircularProgress, List, ListItem } from "@mui/material"

const bufferedItems = 2
const gap = 10
const rowHeight = 200

export const ReposList = observer(() => {

    const [page, setPage] = useState(1)

    useEffect(() => {
        console.log('page ', page)
        store.getRepos(`q=javascript&sort=stars&page=${page}`)
    }, [page])

    useEffect(() => {
        console.log('store.repos.length ', store.repos.length)
    }, [store.repos])

    const [containerRef, { height: containerHeight }] = useElementSize<HTMLUListElement>()

    const [scrollPosition, setScrollPosition] = React.useState(0)

    const visibleChildren = React.useMemo(() => {

        const startIndex = Math.max(Math.floor(scrollPosition / rowHeight) - bufferedItems, 0)
        const endIndex = Math.min(Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) + bufferedItems, store.repos.length - 1)
        return store.repos.slice(startIndex, endIndex + 1).map((repo, index) =>
            <ListItem
                key={repo.id}
                sx={{
                    position: "absolute",
                    top: (startIndex + index) * rowHeight + index * gap,
                    height: rowHeight,
                    padding: 0,
                    width: "max-content",
                    marginTop: "2em"
                }}
            >
                <RepoItem repo={repo} />
            </ListItem>
        )
    }, [store.repos, containerHeight, scrollPosition])

    const onScroll = React.useMemo(() =>
        throttle(
            function (e: any) {
                setScrollPosition(e.target.scrollTop)
                if ((e.target.clientHeight + e.target.scrollTop) >= e.target.scrollHeight) {
                    // console.log('bootom')
                    setPage(prevPage => prevPage + 1)
                }
            },
            50,
            { leading: false }
        ), [])

    if (store.status === 'fetching' && store.repos.length === 0) {
        return (
            <Box sx={{ height: '100%', display: "flex", justifyContent: "center", alignItems: "center", background: 'rgb(15, 18, 20)' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <List
            onScroll={onScroll}
            sx={{
                position: "relative",
                height: "100%",
                overflowY: "scroll",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '2em',
                marginBottom: store.status === 'fetching' ? '2em' : 0,
            }}
            ref={containerRef}
        >
            {visibleChildren}
            {store.repos.length > 0 && store.status === 'fetching' &&
                <Box sx={{
                    width: '90%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: 'rgb(15, 18, 20)',
                    position: 'fixed',
                    bottom: 0,
                    padding: '.5em',

                }}>
                    <CircularProgress />
                </Box>
            }
        </List >

    )
})