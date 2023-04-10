import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MediaHeader from '../components/MediaHeader'

export default function MediaDetailPage () {
	const mediaType = useParams().media_type
	const mediaId = useParams().id

	return (
		<>
			<Header />
			<main>
				<MediaHeader mediaType={mediaType} mediaId={mediaId} />
			</main>
			<Footer />
			<div id="modal"></div>
		</>
	)
}
