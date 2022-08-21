import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Rect } from 'react-konva'
import { useAnimationFrame } from '../hooks'
import { PlayerState } from '../types'

interface PlayerProps {
	player: PlayerState
	setPlayer: Dispatch<SetStateAction<PlayerState>>
}

const cw = window.innerWidth / 2
const ch = window.innerHeight / 2

const Player = ({ player, setPlayer }: PlayerProps) => {
	const height = 40
	const width = 20
	type Keys = "ArrowLeft" | "ArrowUp" | "ArrowRight" | "ArrowDown"

	const keys = new Set<Keys>([
		"ArrowLeft",
		"ArrowUp",
		"ArrowRight",
		"ArrowDown",
	])

	const [keyState, setKeyState] = useState<Record<Keys, boolean>>({
		ArrowLeft: false,
		ArrowUp: false,
		ArrowRight: false,
		ArrowDown: false,
	})

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!keys.has(event.key as Keys)) return
		setKeyState(keyState => ({ ...keyState, [event.key]: true }))
	}
	
	const handleKeyUp = (event: KeyboardEvent) => {
		if (!keys.has(event.key as Keys)) return
		setKeyState(keyState => ({ ...keyState, [event.key]: false }))
	}

	useAnimationFrame(delta => {
		// Vector
		let x = Number(keyState.ArrowRight) - Number(keyState.ArrowLeft)
		let y = Number(keyState.ArrowDown) - Number(keyState.ArrowUp)
	
		// Vector normalization
		const len = Math.sqrt(x ** 2 + y ** 2)
		if (x != 0) x = x / len
		if (y != 0) y = y / len
		setPlayer(player => ({
			...player,
			x: player.x - x * delta * player.speed,
			y: player.y - y * delta * player.speed,
		}))
	})

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	return <>
		<Rect x={cw - player.x - width / 2} y={ch - player.y - height / 2} width={width} height={height} fill="red" />
	</>
}
export default Player