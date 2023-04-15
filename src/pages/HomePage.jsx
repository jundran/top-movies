import { movieGenres, tvGenres } from '../data'
import Search from '../components/Search'
import Trending from '../components/Trending'
import Trailers from '../components/Trailers'
import Genres from '../components/Genres'

export default function HomePage () {
	return (
		<main className='HomePage centred'>
			<Search />
			<Trending />
			<Trailers />
			<Genres list={movieGenres} type='movie' name='Movies'/>
			<Genres list={tvGenres} type='tv' name='TV Shows'/>
		</main>
	)
}
