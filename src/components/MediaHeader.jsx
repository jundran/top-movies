import { useState, useEffect, Fragment } from 'react'
import { fetchData, getFormattedDate } from '../fetchUtils'
import PercentCircle from './PercentCircle'

export default function MediaHeader ({ mediaType, mediaId}) {
	const [data, setData] = useState(null)

	useEffect(() => {
		const params = [{ key: 'append_to_response', value:'content_ratings,release_dates,credits' }]
		fetchData(`${mediaType}/${mediaId}`, params)
			.then(json => setData(json))
			.catch(error => console.warn(error))
	}, [mediaId, mediaType])

	function getCertification () {
		if (data.content_ratings) {
			const cert = data.content_ratings.results.find(cert => cert.iso_3166_1 ==='US')
			return cert && cert.rating || 'NR'
		} else {
			const cert = data.release_dates.results.find(cert => cert.iso_3166_1 ==='US')
			return cert && cert.release_dates[0].certification || 'NR'
		}
	}

	function getRunTime () {
		const runtime = data.runtime || data.episode_run_time
		const hours = Math.floor(runtime / 60)
		const minutes = runtime % 60
		return hours ? `${hours}h ${minutes}m` : `${minutes}m`
	}

	function getGenres () {
		return data.genres.map((genre, index) =>
			`${genre.name}${index < data.genres.length - 1 ? ', \u00A0' : ''}`
		)
	}

	function getCredits () {
		const starsArray = data.credits.cast.slice(0, 5)
		return starsArray.map((cast, index) => (
			<Fragment key={cast.name}>
				{cast.name}
				{index < starsArray.length - 1 && <span className='dot' aria-hidden>{'\u00A0 · \u00A0'}</span>}
			</Fragment>
		))
	}

	if (!data) return
	const date = data.release_date || data.first_air_date
	const title = data.title || data.name
	const certification = getCertification()
	const formattedDate = getFormattedDate(date)
	const year = date.split('-')[0]
	const genres = getGenres()
	const credits = getCredits()
	const runtime = getRunTime()
	return (
		<section className="MediaHeader">
			<div className='container'>
				<img
					className='poster desktop'
					src={`https://image.tmdb.org/t/p/w780/${data.poster_path}`}
					alt={title}
				/>
				<div className="content">
					<div className="header">
						<h1>{title}<span> ({year})</span></h1>
						<div className="header-container">
							<img
								className='poster mobile'
								src={`https://image.tmdb.org/t/p/w780/${data.poster_path}`}
								alt={title}
							/>
							<div className="facts">
								<span className='certification'>{certification}</span>
								<span className='release-date'>{formattedDate} (CA)</span>
								<span className='dot' aria-hidden>·</span>
								<span className='genres'> {genres}</span>
								<span className='dot' aria-hidden>·</span>
								<span className='runtime'>{runtime}</span>
							</div>
						</div>
					</div>
					<ul className="actions">
						<li className='score'>
							<PercentCircle percent={data.vote_average * 10} customClass='media'/>
							<div className='text'>User<br />Score</div>
						</li>
						<li>
							<ul className='icons'>
								<li><button aria-label='Add to list'>
									<img src="list.svg" alt="list icon" />
								</button></li>
								<li><button aria-label='Add to favourites'>
									<img src="favourite.svg" alt="favourite icon" />
								</button></li>
								<li><button aria-label='Save bookmark'>
									<img src="bookmark.svg" alt="bookmark icon" />
								</button></li>
								<li><button aria-label='Star media'>
									<img src="star.svg" alt="star icon" />
								</button></li>
							</ul>
						</li>
						<li className='play'><button aria-label='Play media'>
							<img src="play.svg" alt="play icon" />
							<span>Play Trailer</span>
						</button></li>
					</ul>
					{data.tagline && <div className="tagline">{data.tagline}</div>}
					<div className="overview">
						<h3>Overview</h3>
						<p>{data.overview}</p>
					</div>
					<div className="credits">
						<h3>Stars</h3>
						<p>{credits}</p>
					</div>
				</div>
			</div>
		</section>
	)
}
