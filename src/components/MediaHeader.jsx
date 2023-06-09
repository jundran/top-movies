import { Fragment, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import {  getFormattedDate } from '../fetchUtils'
import PercentCircle from './PercentCircle'
import { findBestVideo } from './Trailer'
import VideoPlayer from './VideoPlayer'

export default function MediaHeader ({ data, mediaType }) {
	const [videoPlayerOpen, setVideoPlayerOpen] = useState(false)
	const ref = useRef()

	useEffect(() => {
		document.querySelector('[aria-label="Add to list"]').focus()
	}, [])

	useEffect(() => {
		// Put focus back on trailer button when closing video player
		if (videoPlayerOpen) return
		ref.current.focus()
	}, [videoPlayerOpen])

	function toggleFavourite () {
		console.log(`Adding or removing type ${mediaType} ${data.title || data.name} with id ${data.id} to favourites`)
	}

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
		let runtime = data.runtime || data.episode_run_time
		if (Array.isArray(runtime)) runtime = runtime[0]
		if (!runtime) return ''
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
				{index < starsArray.length - 1 && <span className='dot' aria-hidden="true">{'\u00A0 · \u00A0'}</span>}
			</Fragment>
		))
	}

	const date = data.release_date || data.first_air_date
	const title = data.title || data.name
	const certification = getCertification()
	const formattedDate = date ? getFormattedDate(date) : ''
	const year = date ? date.split('-')[0] : ''
	const genres = getGenres()
	const credits = getCredits()
	const runtime = getRunTime()
	const image = data.poster_path ?
		`https://image.tmdb.org/t/p/w780/${data.poster_path}` :
		`https://placehold.co/300x450?text=${title}`
	return (
		<>
			<section className="MediaHeader">
				<div className="container centred">
					<img
						className='poster desktop'
						src={image}
						alt={title}
					/>
					<div className="content">
						<div className="header">
							<h1>{title}<span> ({year})</span></h1>
							<div className="header-container">
								<img
									className='poster mobile'
									src={image}
									alt={title}
								/>
								<div className="facts">
									<span className='certification'>{certification}</span>
									<span className='release-date'>{formattedDate} (CA)</span>
									<span className='dot' aria-hidden="true">·</span>
									<span className='genres'> {genres}</span>
									<span className='dot' aria-hidden="true">·</span>
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
										<img src="icons/list.svg" alt="list icon" />
									</button></li>
									<li><button onClick={toggleFavourite} aria-label='Add to favourites'>
										<img src="icons/favourite.svg" alt="favourite icon" />
									</button></li>
									<li><button aria-label='Save bookmark'>
										<img src="icons/bookmark.svg" alt="bookmark icon" />
									</button></li>
									<li><button aria-label='Star media'>
										<img src="icons/star.svg" alt="star icon" />
									</button></li>
								</ul>
							</li>
							<li
								className={'play'}
								style={data.videos.results.length ? null : { display: 'none'} }
							>
								<button ref={ref} onClick={() => setVideoPlayerOpen(true)} aria-label='Play media'>
									<img src="icons/play.svg" alt="play icon" />
									<span>Play Trailer</span>
								</button>
							</li>
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
			{videoPlayerOpen && createPortal(
				<VideoPlayer video={findBestVideo(data.videos.results)} close={() => setVideoPlayerOpen(false)}/>,
				document.getElementById('modal')
			)}
		</>
	)
}
