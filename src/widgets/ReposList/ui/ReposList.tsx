import { throttle } from "lodash"
import React, { useEffect } from "react"
import { useElementSize } from "../model/useElementSize"
import '../../../app/App.css'
import { store } from "../../../app/store"
import { observer } from "mobx-react"
import { RepoItem } from "../../../entities/RepoItem/ui/RepoItem"
import { List, ListItem } from "@mui/material"

const bufferedItems = 2
const gap = 10
const rowHeight = 250

export const ReposList = observer(() => {

    useEffect(() => {
        store.getRepos(`q=javascript&sort=stars`)
    }, [])

    const [containerRef, { height: containerHeight }] = useElementSize<HTMLUListElement>()

    const [scrollPosition, setScrollPosition] = React.useState(0)

    // const objects = React.useMemo(() => new Array(400).fill(0).map((_, i) => i), [])

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
                    // lineHeight: `${rowHeight}px`,
                    padding: 0
                }}
            >
                <RepoItem repo={repo} />
            </ListItem>
        )
    }, [store.repos, containerHeight, rowHeight, scrollPosition, gap,])

    const onScroll = React.useMemo(
        () =>
            throttle(
                function (e: any) {
                    setScrollPosition(e.target.scrollTop)
                },
                50,
                { leading: false }
            ),
        []
    )

    return (
        <List
            onScroll={onScroll}
            sx={{
                position: "relative",
                height: "100%",
                overflowY: "scroll",
            }}
            ref={containerRef}
        >
            {visibleChildren}
        </List >
    )
})