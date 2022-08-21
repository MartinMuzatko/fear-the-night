import { useState } from 'react'
import { Layer, Line, Rect, Shape, Stage, Text } from 'react-konva'
import { useAnimationFrame } from '../hooks'
import { PlayerState } from '../types'
import Player from './Player'

const cw = window.innerWidth / 2
const ch = window.innerHeight / 2

interface GameObject {
	x: number
	y: number
	width: number
	height: number
}

interface RayCastProps {
	gameObjects: GameObject[]
}

const RayCast = (props: RayCastProps) => {
	const cw = window.innerWidth / 2
	const ch = window.innerHeight / 2
	const rays = 5
	return <>
		{Array(rays).fill(0).map((_, i) => {
			const angle = i / rays * Math.PI * 2
			const x = cw + Math.cos(angle) * 400
			const y = ch + Math.sin(angle) * 400
			const distance = Math.sqrt(x ** 2 + y ** 2)

			return <Line key={i} points={[cw, ch, x, y]} stroke="red" strokeWidth={1} />
			// return <Rect key={i} x={cw} y={ch} fill="red" width={400} height={1} rotation={360 / rays * i} />
		})}
	</>
}

interface ParticleProps {
	player: PlayerState
}

const Particle = ({player}: ParticleProps) => {
	const [particle, setParticle] = useState({
		originX: player.x,
		originY: player.y,
		x: 0,
		y: 0,
		speed: 1.4
	})
	useAnimationFrame(delta => {
		setParticle(particle => {
			if (particle.x < -800) return {
				...particle,
				x: 0,
				y: 0,
				originX: player.x,
				originY: player.y,
			}
			return {
				...particle,
				x: particle.x + -1 * delta * particle.speed,
			}
			// y: (particle.y + 1 * delta * particle.speed) % 200,
		})
	})
	return <Rect x={cw - particle.originX - particle.x - (player.width / 2)} y={ch - particle.originY - particle.y - (player.height / 2)} width={10} height={10} fill="green" />
}

interface Point {
	x: number
	y: number
}

const angleCoords = (p1: Point, p2: Point) => Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI)
const vectorFromAngle = (angle: number): Point => ({
	x: Math.cos(angle),
	y: Math.sin(angle),
})

interface EnemyProps {
	player: PlayerState
}

const Enemy = ({ player }: EnemyProps) => {
	const [enemy, setEnemy] = useState({
		x: 0,
		y: 0,
		speed: .25
	})
	useAnimationFrame(delta => {
		setEnemy(enemy => {
			const angle = angleCoords(enemy, player)
			const newVector = vectorFromAngle(angle)
			return {
				...enemy,
				x: enemy.x + newVector.x * delta * enemy.speed,
				y: enemy.y + newVector.y * delta * enemy.speed,
			}
		})
	})
	return <Rect x={cw - enemy.x - (player.width / 2)} y={ch - enemy.y - (player.height / 2)} width={30} height={30} fill="pink" />
}

const App = () => {	
	const [player, setPlayer] = useState<PlayerState>({
		x: 0,
		y: 0,
		width: 10,
		height: 10,
		speed: .5,
	})

	const gameObjects = [
		// { x: 20 - player.x, y: -100 - player.y, width: 20, height: 20 },
		// { x: -50 - player.x, y: 100 - player.y, width: 20, height: 20 },
		{ x: 50, y: 80, width: 20, height: 20 },
		{ x: 0, y: 0, width: 20, height: 20 },
	]

	return <Stage x={player.x} y={player.y} width={window.innerWidth} height={window.innerHeight} >
		<Layer>
			{/* Background */}
			<Rect x={0} y={0} width={window.innerWidth} height={window.innerHeight} fill="black" />
			{gameObjects.map((gameObject, i) => (
				<Rect key={i} x={cw - gameObject.x} y={ch - gameObject.y} width={gameObject.width} height={gameObject.height} fill="blue" />
			))}
			{/* <RayCast {...{gameObjects}} /> */}

			<Player {...{player, setPlayer}} />
			<Particle {...{player}} />
			<Enemy {...{ player }} />
			{/* <Rect x={(window.innerWidth / 2) - 50} y={(window.innerHeight / 2) - 50} width={100} height={100} fill={color} onClick={() => setColor('green')} /> */}
		</Layer>
	</Stage>
}
export default App