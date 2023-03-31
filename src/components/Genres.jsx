import { useState, useEffect, useCallback } from 'react'
import { fetchData } from '../fetchUtils'
import Card from './Card'

export default function Genres ({ list, type, name}) {
	const [data, setData] = useState(null)

	const handleChange = useCallback(
		function handleChange (value) {
			const params = [
				{ key: 'with_genres',	value },
				{ key: 'sort_by',	value: 'popularity.desc' }
			]
			fetchData('discover/' + type, params)
				.then(json => setData(json))
				.catch(error => console.warn(error))
		}, [type]
	)

	useEffect(() => handleChange(list[0].id), [handleChange, list])

	return (
		<section className='Genres'>
			<div className="header mobile-columns">
				<h2>{`Popular ${name} by Genre`}</h2>
				<Select
					list={list}
					handleChange={handleChange}
				/>
			</div>
			<div className="cards">
				{data && data.results.map(movie =>
					<Card key={movie.id} data={movie} />
				)}
			</div>
		</section>
	)
}

function Select ({ list, handleChange }) {
	return (
		<div className="Select">
			<select onChange={e => handleChange(e.target.value)}>
				{list.map(genre =>
					<option key={genre.id} value={genre.id}>
						{genre.name}
					</option>
				)}
			</select>
		</div>
	)
}
