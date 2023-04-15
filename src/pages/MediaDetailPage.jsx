import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../fetchUtils'
import MediaHeader from '../components/MediaHeader'
import MediaCast from '../components/MediaCast'

export default function MediaDetailPage () {
	const mediaType = useParams().media_type
	const mediaId = useParams().id
	const [data, setData] = useState(null)

	useEffect(() => {
		const params = [{ key: 'append_to_response', value:'content_ratings,release_dates,credits,videos' }]
		fetchData(`${mediaType}/${mediaId}`, params)
			.then(json => setData(json))
			.catch(error => console.warn(error))
	}, [mediaId, mediaType])

	if (!data) return
	return (
		<main>
			<MediaHeader data={data} />
			<MediaCast mediaType={mediaType} data={ data.credits}/>
		</main>
	)
}
