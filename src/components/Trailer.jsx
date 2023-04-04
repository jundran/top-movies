
// Thumbnail sizes: https://gist.github.com/a1ip/be4514c1fd392a8c13b05e082c4da363
import { useEffect, useState } from 'react'
import { fetchData } from '../fetchUtils'

export default function Trailer ({ data }) {
	const [trailers, setTrailers] = useState(null)
	const [playTrailer, setPlayerTrailer] = useState(false)

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
					onClick={() => setPlayerTrailer(true)}
				>
					<img
						src={`https://i.ytimg.com/vi_webp/${bestVideo.key}/maxresdefault.webp`}
						alt={`${title} ${bestVideo.name}`}
					/>
				</button>
				<div className="content">
					<a href="#"><h3>{data.name || data.title}</h3></a>
					<button
						onClick={() => setPlayerTrailer(true)}
						aria-label={`Play ${bestVideo.name} video for ${title}`}
					>
						<h4>{bestVideo.name}</h4>
					</button>
				</div>
			</li>
			{playTrailer && <VideoPlayer video={bestVideo} close={() => setPlayerTrailer(false)}/>}
		</>
	)
}

function VideoPlayer ({ video, close }) {
	const source = `https://www.youtube.com/embed/${video.key}?autoplay=1&modestbranding=1}`
	return (
		<div aria-modal="true" className="VideoPlayer">
			<header>
				<h3>{video.name}</h3>
				<button onClick={close} aria-label='Close video player'>x</button>
			</header>
			<iframe
				src={source}
				width='1227'
				height='690'
				allowFullScreen
			/>
		</div>
	)
}
