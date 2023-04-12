export default function MediaCast ({ mediaType, data }) {

	return (
		<section className='MediaCast' aria-label='Top Billed Cast'>
			<div className="container centred">
				<h2>{mediaType === 'movie' ? 'Top Billed Cast' : 'Series Cast'}</h2>
				<ul className="cards">
					{data.cast.map(castMember =>
						<CastCard key={`${castMember.id}-${castMember.cast_id}`} data={castMember} />
					)}
				</ul>
				<a><p className='more'>Full Cast & Crew</p></a>
				<hr />
			</div>
		</section>
	)
}

function CastCard ({ data }) {
	return (
		<li className="CastCard">
			<a>
				<img src={'https://image.tmdb.org/t/p/h632' + data.profile_path} alt={data.name} />
			</a>
			<div className="info">
				<a><p className="name">{data.name}</p></a>
				<p className="character">{data.character}</p>
			</div>
		</li>
	)
}
