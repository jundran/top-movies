import PercentCircle from './PercentCircle'

export default function Card ({ data }) {
	const title = data.title || data.name
	const date = getDate(data.release_date || data.first_air_date)
	return (
		<div className="Card">
			<div className="image-with-rating-container">
				<img src={'https://image.tmdb.org/t/p/w342' + data.poster_path} alt={title} />
				<PercentCircle percent={data.vote_average * 10}/>
			</div>
			<div className="footer">
				<h2 className='title'>{title}</h2>
				<p className="date">{date}</p>
			</div>
		</div>
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
