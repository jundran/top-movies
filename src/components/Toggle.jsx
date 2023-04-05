import { useState } from 'react'

export default function Toggle ({ label, names, onToggle, style}) {
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
				aria-label={label + names[0]}
				onClick={handleClick}
				className={isLeft ? 'left active' : 'left '}
			>
				{names[0]}
			</button>
			<button
				aria-label={label + names[1]}
				onClick={handleClick}
				className={!isLeft ? 'right active' : 'right'}
			>
				{names[1]}
			</button>
		</div>
	)
}
