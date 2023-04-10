import { useParams } from 'react-router-dom'
import Header, { HeaderMobile } from '../components/Header'
import Footer from '../components/Footer'
import MediaDetail from '../components/MediaDetail'

export default function MediaDetailPage () {
	const mediaType = useParams().media_type
	const mediaId = useParams().id

	return (
		<>
			<Header />
			<HeaderMobile />
			<main>
				<MediaDetail mediaType={mediaType} mediaId={mediaId} />
			</main>
			<Footer />
			<div id="modal"></div>
		</>
	)
}
