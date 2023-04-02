import { useState, useEffect } from 'react'
import { fetchData } from '../fetchUtils'
import Toggle from './Toggle'
import Trailer from './Trailer'

export default function Trailers () {
	const [data, setData] = useState(null)

	useEffect(() => handleToggle(true), [])

	function handleToggle (isLeft) {
		const media = isLeft ? 'movie' : 'tv'
		fetchData(`trending/${media}/week`)
			.then(json => setData(json))
			.catch(error => console.warn(error))
	}

	return (
		<section className='Trailers'>
			<header>
				<h2>Trailers</h2>
				<Toggle names={['Movies', 'TV']} onToggle={handleToggle} style={'trailer'} />
			</header>
			<ul className="videos">
				{data && data.results.map(movie =>
					<Trailer key={movie.id} data={movie} />
				)}
			</ul>
		</section>
	)
}
