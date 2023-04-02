import { useState } from 'react'

export default function Toggle ({ names, onToggle, style}) {
	const [ isLeft, setIsLeft] = useState(true)

	function handleClick (e) {
		const actualIsLeft = e.target.id === 'left'
		setIsLeft(actualIsLeft)
		onToggle(actualIsLeft)
	}

	return (
		<nav className={style ? 'Toggle ' + style : 'Toggle'}>
			<div className={isLeft ? 'fill' : 'fill right'}></div>
			<button onClick={handleClick} id='left' className={isLeft ? 'active' : ''}>
				{names[0]}
			</button>
			<button onClick={handleClick} id='right' className={!isLeft ? 'active' : ''}>
				{names[1]}
			</button>
		</nav>
	)
}
