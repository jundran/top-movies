export default function SearchResults ({ data }) {
	return (
		<section className="SearchResults">
			<h2>Search Results Component</h2>
			{data.results.map(result =>
				<SearchResult key={result.id} data={result} />
			)}
		</section>
	)
}

function SearchResult ({ data }) {
	return (
		<p key={data.id}>{data.overview}</p>
	)
}
