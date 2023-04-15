import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../fetchUtils'
import SearchResults from '../components/SearchResults'
import SideList from '../components/SideList'
import { ToggleableSearchBar } from '../components/Search'

export default function SearchPage () {
	const searchQuery = useParams().query
	const [data, setData] = useState(null)
	const [results, setResults] = useState(null)
	const [currentMediaType, setCurrentMediaType] = useState('movie')

	useEffect(() => {
		const params = [{ key: 'query', value: searchQuery }]
		fetchData('search/multi', params)
			.then(json => {
				setData(json)
				setResults(json.results.filter(item => item.media_type === 'movie'))
			})
			.catch(error => console.warn(error))
	}, [searchQuery])

	function handleClick (mediaType) {
		setResults(data.results.filter(item => item.media_type === mediaType))
		setCurrentMediaType(mediaType)
	}

	if (!data || !results) return
	return (
		<>
			<ToggleableSearchBar permanent defaultValue={searchQuery}/>
			<main className='SearchPage centred container'>
				<SideList data={data.results} onClick={handleClick} />
				<SearchResults data={results} mediaType={currentMediaType} />
			</main>
		</>
	)
}
