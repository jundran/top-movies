import { useNavigate } from 'react-router-dom'

export default function Search () {
	return (
		<section className="Search">
			<div className="container">
				<h2>Welcome.</h2>
				<h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
				<SearchBar />
			</div>
		</section>
	)
}

export function SearchBar () {
	const navigate = useNavigate()

	function handleSubmit (e) {
		e.preventDefault()
		const searchQuery = e.target.search.value
		if (!searchQuery) return
		navigate(`search/${searchQuery}`)
	}

	return (
		<form className='HomePageSearchBar centred' onSubmit={handleSubmit}>
			<input
				name='search'
				aria-label='Search for a movie, TV show or person'
				placeholder="Search for a movie, tv show, person......"
			/>
			<button onSubmit={handleSubmit}>Search</button>
		</form>
	)
}

export function ToggleableSearchBar ({ active }) {
	const navigate = useNavigate()

	function handleSubmit (e) {
		e.preventDefault()
		const searchQuery = e.target.search.value
		if (!searchQuery) return
		navigate(`search/${searchQuery}`)
	}

	return (
		<div className={active ? 'ToggleableSearchBar active' : 'ToggleableSearchBar'}>
			<form className='centred' onSubmit={handleSubmit}>
				<img src="search.svg" aria-hidden="true" />
				<input
					name='search'
					aria-label='Search for a movie, TV show or person'
					placeholder="Search for a movie, tv show, person......"
				/>
				<button onSubmit={handleSubmit} aria-label='close search'>x</button>
			</form>
		</div>
	)
}
