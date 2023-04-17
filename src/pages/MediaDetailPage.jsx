import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../fetchUtils'
import MediaHeader from '../components/MediaHeader'
import MediaCast from '../components/MediaCast'
import NotFound from './404'

export default function MediaDetailPage () {
	const mediaType = useParams().media_type
	const mediaId = useParams().id
	const [data, setData] = useState(null)

	useEffect(() => {
		const params = [{
			key: 'append_to_response',
			value:'content_ratings,release_dates,credits,videos'
		}]
		fetchData(`${mediaType}/${mediaId}`, params)
			.then(json => {
				if (json.id) setData(json)
				else {
					setData(-1)
					console.warn('Invalid API request')
				}
			})
			.catch(error => console.warn(error))
	}, [mediaId, mediaType])

	if (!data) return
	if (data === -1) return <NotFound />
	return (
		<main>
			<MediaHeader mediaType={mediaType} data={data} />
			<MediaCast mediaType={mediaType} data={ data.credits}/>
		</main>
	)
}
