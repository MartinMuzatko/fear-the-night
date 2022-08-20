import { useCallback, useEffect, useRef } from "react"

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
	// Use useRef for mutable variables that we want to persist
	// without triggering a re-render on their change
	const requestRef = useRef<undefined | number>()
	const previousTimeRef = useRef<undefined | number>()

	const animate = useCallback((time: number) => {
		if (previousTimeRef.current != undefined) {
			const deltaTime = time - previousTimeRef.current
			callback(deltaTime)
		}
		previousTimeRef.current = time
		requestRef.current = requestAnimationFrame(animate)
	}, [previousTimeRef, requestRef, callback])

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(requestRef.current)
	}, [animate])
}