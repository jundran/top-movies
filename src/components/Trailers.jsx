import { useState, useEffect } from 'react'
import { fetchData } from '../fetchUtils'
import Toggle from './Toggle'
import Trailer from './Trailer'

// This is the Trailers section on the home page which fetches the top 20 movies or TV shows for the week. For each it will render the Trailer component which uses the movie data.
export default function Trailers () {
	const [data, setData] = useState(null)

	useEffect(() => handleToggle(true), [])

	function handleToggle (isLeft) {
		const media = isLeft ? 'movie' : 'tv'
		fetchData(`trending/${media}/week`)
			.then(json => setData(json.results))
			.catch(error => console.warn(error))
	}

	return (
		<section className='Trailers' aria-label='Trailers'>
			<header>
				<h2>Trailers</h2>
				<Toggle
					label='Show trailers for '
					names={['Movies', 'TV']}
					onToggle={handleToggle}
					style={'trailer'}
				/>
			</header>
			<ul className="cards">
				{data && data.map(movie =>
					<Trailer key={movie.id} data={movie} />
				)}
			</ul>
		</section>
	)
}
