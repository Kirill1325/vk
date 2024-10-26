import { useCallback, useEffect, useState } from "react"

interface Size {
  width: number
  height: number
}

export const useElementSize = <T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size,
  T | null
] => {

  const [ref, setRef] = useState<T | null>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0
  })

  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0
    })

  }, [ref?.offsetHeight, ref?.offsetWidth])

  useEffect(() => {
    handleSize()
  }, [ref?.offsetHeight, ref?.offsetWidth])

  return [setRef, size, ref]
}

