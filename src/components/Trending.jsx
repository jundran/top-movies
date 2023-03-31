import { useState, useEffect } from 'react'
import { fetchData } from '../fetchUtils'
import Toggle from './Toggle'
import Card from './Card'

export default function Trending () {
	const [data, setData] = useState(null)

	useEffect(() => handleToggle(true), [])

	function handleToggle (isLeft) {
		const timeframe = isLeft ? 'day' : 'week'
		fetchData('trending/all/' + timeframe)
			.then(json => setData(json))
			.catch(error => console.warn(error))
	}

	return (
		<section className='Trending'>
			<div className="header">
				<h2>Trending</h2>
				<Toggle names={['Today', 'This Week']} onToggle={handleToggle} />
			</div>
			<div className="cards">
				{data && data.results.map(movie =>
					<Card key={movie.id} data={movie} />
				)}
			</div>
		</section>
	)
}
