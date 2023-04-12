import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchResults from '../components/SearchResults'
import { useEffect } from 'react'
import { fetchData } from '../fetchUtils'

export default function SearchPage () {
	const searchQuery = useParams().query
	const [data, setData] = useState(null)

	useEffect(() => {
		const params = [{ key: 'query', value: searchQuery }]
		fetchData('search/multi', params)
			.then(json => setData(json))
			.catch(error => console.warn(error))
	}, [searchQuery])

	if (!data) return
	return (
		<>
			<Header />
			<main>
				<SearchResults data={data} />
			</main>
			<Footer />
		</>
	)
}
