import '../styles/App.sass'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import HomePage from '../pages/HomePage'
import MediaDetailPage from '../pages/MediaDetailPage'
import SearchPage from '../pages/SearchPage'
import { SearchProvider } from './Search'

export default function App () {
	return (
		<SearchProvider>
			<HashRouter>
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/media/:media_type/:id' element={<MediaDetailPage />} />
					<Route path='/search/:query' element={<SearchPage />} />
				</Routes>
				<Footer />
				<div id="modal"></div>
			</HashRouter>
		</SearchProvider>
	)
}
