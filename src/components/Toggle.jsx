import { useState } from 'react'

export default function Toggle ({ names, onToggle, style}) {
	const [ isLeft, setIsLeft] = useState(true)

	function handleClick (e) {
		const actualIsLeft = e.target.classList.contains('left')
		setIsLeft(actualIsLeft)
		onToggle(actualIsLeft)
	}

	return (
		<div className={style ? 'Toggle ' + style : 'Toggle'}>
			<div className={isLeft ? 'fill' : 'fill right'}></div>
			<button
				onClick={handleClick}
				className={isLeft ? 'left active' : 'left '}
			>
				{names[0]}
			</button>
			<button
				onClick={handleClick}
				className={!isLeft ? 'right active' : 'right'}
			>
				{names[1]}
			</button>
		</div>
	)
}
