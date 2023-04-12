import '../styles/App.sass'
import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MediaDetailPage from '../pages/MediaDetailPage'
import SearchPage from '../pages/SearchPage'

export default function App () {
	return (
		<HashRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/media/:media_type/:id' element={<MediaDetailPage />} />
				<Route path='/search/:query' element={<SearchPage />} />
			</Routes>
		</HashRouter>
	)
}
