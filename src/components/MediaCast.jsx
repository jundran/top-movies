import { useState, useEffect } from 'react'
import { fetchData } from '../fetchUtils'

export default function MediaCast ({ mediaType, mediaId }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		fetchData(`${mediaType}/${mediaId}/credits`)
			.then(json => setData(json))
			.catch(error => console.warn(error))
	}, [mediaId, mediaType])

	if (!data) return
	return (
		<section className='MediaCast' aria-label='Top Billed Cast'>
			<div className="container">
				<h2>{mediaType === 'movie' ? 'Top Billed Cast' : 'Series Cast'}</h2>
				<ul className="cards">
					{data.cast.map(castMember =>
						<CastCard key={castMember.id} data={castMember} />
					)}
				</ul>
				<a href="#"><p className='more'>Full Cast & Crew</p></a>
				<hr />
			</div>
		</section>
	)
}

function CastCard ({ data }) {
	return (
		<li className="CastCard">
			<a href="#">
				<img src={'https://image.tmdb.org/t/p/h632' + data.profile_path} alt={data.name} />
			</a>
			<div className="info">
				<a href="#"><p className="name">{data.name}</p></a>
				<p className="character">{data.character}</p>
			</div>
		</li>
	)
}
