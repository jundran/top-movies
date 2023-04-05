import { useEffect, useRef } from 'react'

export default function VideoPlayer ({ video, close }) {
	const ref = useRef()

	useEffect(() => {
		ref.current.focus()

		// Stop scroll when modal open and keep interactivity locked to it
		document.body.style.overflowY = 'hidden'
		Array.from(document.getElementById('root').children).forEach(child => {
			if ( child.id !== 'modal') child.inert = true
		})

		return () => {
			document.body.style.overflowY = 'initial'
			Array.from(document.getElementById('root').children).forEach(child => {
				child.inert = false
			})
		}
	}, [])

	useEffect(() => {
		function handleKeyPress (e) {
			if (e.code === 'Escape') close()
		}
		document.addEventListener('keydown', handleKeyPress)

		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [close])

	const source = `https://www.youtube.com/embed/${video.key}?autoplay=1`
	return (
		<div aria-modal="true" className="VideoPlayer">
			<header>
				<h3>{video.name}</h3>
				<button ref={ref} onClick={close} aria-label='Close video player'>x</button>
			</header>
			<iframe
				src={source}
				width='1104'
				allowFullScreen
				allow='autoplay'
			/>
		</div>
	)
}
