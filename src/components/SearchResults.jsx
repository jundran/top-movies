import { getFormattedDate } from '../fetchUtils'
import list from '../mediaTypes'

export default function SearchResults ({ data, mediaType }) {
	if (!data.length) {
		const mediaTitle = list.find(item => item.mediaType === mediaType).title
		return (
			<section className="SearchResults">
				<p>{`There are no ${mediaTitle} that match your query.`}</p>
			</section>
		)
	}

	return (
		<section className="SearchResults">
			{data.map(result =>
				result.media_type === 'person' ?
					<PersonResult key={result.id} data={result} /> :
					<MediaResult key={result.id} data={result} />
			)}
		</section>
	)
}

function MediaResult ({ data }) {
	const title = data.name || data.title
	const date = data.first_air_date || data.release_date
	const image = data.poster_path ?
		'https://image.tmdb.org/t/p/w185' + data.poster_path :
		`https://placehold.co/100x150?text=${title}`
	return (
		<div className="MediaResult result">
			<div className="poster">
				<img src={image} alt={title} />
			</div>
			<div className="content">
				<div className="top">
					<h2>{title}</h2>
					<p className="date">{getFormattedDate(date, 'long')}</p>
				</div>
				<p className="overview">{data.overview}</p>
			</div>
		</div>
	)
}

function PersonResult ({ data }) {
	function getKnownFor () {
		if (data.known_for.length) {
			const mediaList = data.known_for.map((media, index) => {
				const title = media.title || media.name
				return index < data.known_for.length - 1 ? `${title}, ` : title
			})
			return <p className='known-for'>{data.known_for_department} <span>·</span> {mediaList}</p>
		}
	}

	const image = data.profile_path ?
		'https://image.tmdb.org/t/p/w185' + data.profile_path :
		`https://placehold.co/70x70?text=${data.name}`
	return (
		<div className="PersonResult result">
			<div className="poster">
				<img src={image} alt={data.name} />
			</div>
			<div className="content">
				<h2>{data.name}</h2>
				{getKnownFor()}
			</div>
		</div>
	)
}
