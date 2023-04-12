export default function SearchResults ({ data }) {
	return (
		<>
			<h2>Search Results Component</h2>
			{data.results.map(result =>
				<p key={result.id}>{result.overview}</p>
			)}
		</>
	)
}
