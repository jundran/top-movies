
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
	return (
		<>
			<div className="Trailer" onClick={() => setPlayerTrailer(true)}>
				<img src={`https://i.ytimg.com/vi_webp/${bestVideo.key}/mqdefault.webp`} />
				<div className="footer">
					<span>{data.name || data.title}</span>
					<h3>{bestVideo.name}</h3>
				</div>
			</div>
			{playTrailer && <VideoPlayer video={bestVideo} close={() => setPlayerTrailer(false)}/>}
		</>
	)
}

function VideoPlayer ({ video, close }) {
	const source = `https://www.youtube.com/embed/${video.key}?autoplay=1&modestbranding=1}`
	return (
		<div className="VideoPlayer">
			<div className="header">
				<h3>{video.name}</h3>
				<button onClick={close}>x</button>
			</div>
			<iframe
				src={source}
				width='1227'
				height='690'
				allowFullScreen
			/>
		</div>
	)
}
