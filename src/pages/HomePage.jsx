import { movieGenres, tvGenres } from '../data'
import Header from '../components/Header'
import Search from '../components/Search'
import Trending from '../components/Trending'
import Trailers from '../components/Trailers'
import Genres from '../components/Genres'
import Footer from '../components/Footer'

export default function HomePage () {
	return (
		<div className='HomePage'>
			<Header />
			<main className='centred'>
				<Search />
				<Trending />
				<Trailers />
				<Genres list={movieGenres} type='movie' name='Movies'/>
				<Genres list={tvGenres} type='tv' name='TV Shows'/>
			</main>
			<Footer />
			<div id="modal"></div>
		</div>
	)
}
