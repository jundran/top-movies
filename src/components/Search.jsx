import { useState, useRef, useEffect } from 'react'
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

export function ToggleableSearchBar ({ active, defaultValue='', permanent }) {
	const [searchQuery, setSearchQuery] = useState(defaultValue)
	const navigate = useNavigate()
	const ref = useRef()

	useEffect(() => {
		if (active) ref.current.focus()
	}, [active])

	function handleSubmit (e) {
		e.preventDefault()
		if (!searchQuery) return
		navigate(`/search/${searchQuery}`)
	}

	function setClass () {
		let className = 'ToggleableSearchBar'
		if (active) className += ' active'
		if (permanent) className += ' permanent'
		return className
	}

	return (
		<div className={setClass()}>
			<form className='centred' onSubmit={handleSubmit}>
				<button onSubmit={handleSubmit}><img src="search.svg" aria-hidden="true" /></button>
				<input
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					ref={ref}
					name='search'
					aria-label='Search for a movie, TV show or person'
					placeholder="Search for a movie, tv show, person......"
				/>
				<button type="button" onClick={() => setSearchQuery('')} aria-label='Clear search query'>x</button>
			</form>
		</div>
	)
}
