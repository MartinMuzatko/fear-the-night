import { useState } from 'react'
import { Layer, Rect, Stage, Text } from 'react-konva'
import { PlayerState } from '../types'
import Player from './Player'

const App = () => {	
	const [color, setColor] = useState('red')
	const [player, setPlayer] = useState<PlayerState>({
		x: 0,
		y: 0,
		speed: .5,
	})
	return <Stage width={window.innerWidth} height={window.innerHeight} >
		<Layer>
			<Rect x={0} y={0} width={window.innerWidth} height={window.innerHeight} fill="black" />
			<Rect x={50 - player.x} y={180 - player.y} width={20} height={20} fill="red" />
			<Rect x={-820 - player.x} y={-80 - player.y} width={20} height={20} fill="red" />
			<Rect x={-220 - player.x} y={220 - player.y} width={20} height={20} fill="red" />
			<Rect x={0 - player.x} y={0 - player.y} width={20} height={20} fill="red" />

			<Player {...{player, setPlayer}} />
			{/* <Rect x={(window.innerWidth / 2) - 50} y={(window.innerHeight / 2) - 50} width={100} height={100} fill={color} onClick={() => setColor('green')} /> */}
		</Layer>
	</Stage>
}
export default App