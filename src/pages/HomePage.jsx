import { movieGenres, tvGenres } from '../data'
import Header, { HeaderMobile } from '../components/Header'
import Trending from '../components/Trending'
import Trailers from '../components/Trailers'
import Genres from '../components/Genres'
import Footer from '../components/Footer'

export default function HomePage () {
	return (
		<>
			<Header />
			<HeaderMobile />
			<main>
				<Trending />
				<Trailers />
				<Genres list={movieGenres} type='movie' name='Movies'/>
				<Genres list={tvGenres} type='tv' name='TV Shows'/>
			</main>
			<Footer />
			<div id="modal"></div>
		</>
	)
}
