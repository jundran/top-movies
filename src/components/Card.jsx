import { Link } from 'react-router-dom'
import PercentCircle from './PercentCircle'
import { getFormattedDate } from '../fetchUtils'

export default function Card ({ data }) {
	const title = data.title || data.name
	const date = getFormattedDate(data.release_date || data.first_air_date)
	const mediaType = data.title ? 'movie' : 'tv'

	return (
		<li className="Card">
			<div className="image-with-rating-container">
				<Link to={`media/${mediaType}/${data.id}`} tabIndex='-1' aria-hidden="true">
					<img src={'https://image.tmdb.org/t/p/w342' + data.poster_path} alt={title} />
				</Link>
				<PercentCircle percent={data.vote_average * 10} style='card'/>
			</div>
			<div className="content">
				<Link to={`media/${mediaType}/${data.id}`}><h3>{title}</h3></Link>
				<p>{date}</p>
			</div>
		</li>
	)
}
