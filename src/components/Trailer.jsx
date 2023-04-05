
// Thumbnail sizes: https://gist.github.com/a1ip/be4514c1fd392a8c13b05e082c4da363
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { fetchData } from '../fetchUtils'
import VideoPlayer from './VideoPlayer'

export default function Trailer ({ data }) {
	const [trailers, setTrailers] = useState(null)
	const [videoPlayerOpen, setVideoPlayerOpen] = useState(false)
	const ref = useRef()

	useEffect(() => {
		if (videoPlayerOpen || !ref.current) return
		ref.current.focus()
	}, [videoPlayerOpen])

	useEffect(() => {
		fetchData(`${data.media_type}/${data.id}/videos`)
			.then(json => setTrailers(json))
			.catch(error => console.warn(error))
	}, [data.id, data.media_type])

	function findBestVideo () {
		let best = trailers.results[0]
		const typeTrailers = trailers.results.filter(video => video.type.match(/trailer/i))
		const officialTrailers = typeTrailers.filter(video => video.official === true)
		if (officialTrailers.length) best = officialTrailers[0]
		else if (typeTrailers.length) best = typeTrailers[0]
		return best
	}

	if (!trailers) return
	const bestVideo = findBestVideo()
	const title = data.title || data.name
	return (
		<>
			<li className="Trailer">
				<button
					// Allow clicking thumbnail to play trailer but hide from screen reader
					tabIndex='-1'
					aria-hidden="true"
					onClick={() => setVideoPlayerOpen(true)}
				>
					<img
						src={`https://i.ytimg.com/vi_webp/${bestVideo.key}/maxresdefault.webp`}
						alt={`${title} ${bestVideo.name}`}
					/>
				</button>
				<div className="content">
					<a href="#"><h3>{data.name || data.title}</h3></a>
					<button
						ref={ref}
						onClick={() => setVideoPlayerOpen(true)}
						aria-label={`Play ${bestVideo.name} video for ${title}`}
					>
						<h4>{bestVideo.name}</h4>
					</button>
				</div>
			</li>
			{videoPlayerOpen && createPortal(
				<VideoPlayer video={bestVideo} close={() => setVideoPlayerOpen(false)}/>,
				document.getElementById('modal')
			)}
		</>
	)
}
