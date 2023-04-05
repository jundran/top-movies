import { movieGenres, tvGenres } from '../data'
import '../styles/App.sass'
import Header, { HeaderMobile } from './Header'
import Trending from './Trending'
import Trailers from './Trailers'
import Genres from './Genres'
import Footer from './Footer'

export default function App () {
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
