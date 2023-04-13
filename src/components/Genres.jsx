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
		<section className='Genres' aria-label={`Popular ${name} by genre`}>
			<header>
				<ListSelect
					name={name}
					list={list}
					handleChange={handleChange}
				/>
			</header>
			<ul className="cards">
				{data && data.results.map(movie =>
					<Card key={movie.id} data={movie} />
				)}
			</ul>
		</section>
	)
}

function ListSelect ({ name, list, handleChange }) {
	return (
		<div className="ListSelect">
			<h2 id={name[0]}>{`Popular ${name} by Genre`}</h2>
			<div className="select-container">
				<select aria-labelledby={name[0]} onChange={e => handleChange(e.target.value)}>
					{list.map(genre =>
						<option key={genre.id} value={genre.id}>{genre.name}</option>
					)}
				</select>
			</div>
		</div>
	)
}
