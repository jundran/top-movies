import PercentCircle from './PercentCircle'

export default function Card ({ data }) {
	const title = data.title || data.name
	const date = getDate(data.release_date || data.first_air_date)
	return (
		<li className="Card">
			<div className="image-with-rating-container">
				<a href="#" tabIndex='-1' aria-hidden="true">
					<img src={'https://image.tmdb.org/t/p/w342' + data.poster_path} alt={title} />
				</a>
				<PercentCircle percent={data.vote_average * 10}/>
			</div>
			<div className="content">
				<a href="#"><h3>{title}</h3></a>
				<p>{date}</p>
			</div>
		</li>
	)
}

function getDate (dateField) {
	const options = { year: 'numeric', month: 'short', day: 'numeric' }
	const date = new Date(dateField)
	// TMDB sends and displays date in UTC but toLocaleDateString converts to
	// local time zone so add offset to compensate and match TMDB website
	date.setMinutes(date.getTimezoneOffset())
	return date.toLocaleDateString(undefined, options)
}
