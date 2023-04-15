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
				<a href="#"><p className='more'>Full Cast & Crew</p></a>
				<hr />
			</div>
		</section>
	)
}

function CastCard ({ data }) {
	const image = data.profile_path ?
		'https://image.tmdb.org/t/p/h632' + data.profile_path:
		`https://placehold.co/75x100?text=${data.name}`

	return (
		<li className="CastCard">
			<a href="#"><img src={image} alt={data.name} /></a>
			<div className="info">
				<a href="#"><p className="name">{data.name}</p></a>
				<p className="character">{data.character}</p>
			</div>
		</li>
	)
}
