import { useState, useEffect } from 'react'
import Hamburger from './Hamburger'
import { ToggleableSearchBar } from './Search'
import { useLocation } from 'react-router-dom'

export default function Header () {
	const [isMobile, setisMobile] = useState(matchMedia('(max-width: 900px)').matches)
	const [showSearchBar, setShowSearchBar] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const mediaQueryList = matchMedia('(max-width: 900px)')
		const handleMatch = e => setisMobile(e.matches)
		mediaQueryList.addEventListener('change', handleMatch)
		return () => mediaQueryList.removeEventListener('change', handleMatch)
	}, [])

	function toggleSearchBar () {
		// TODO set focus in permanent SearchBar
		if (location.pathname.match('/search')) return
		setShowSearchBar(!showSearchBar)
	}

	return isMobile ?
		<HeaderMobile searchBarActive={showSearchBar} toggleSearchBar={toggleSearchBar}/> :
		<HeaderDesktop searchBarActive={showSearchBar} toggleSearchBar={toggleSearchBar}/>
}

function HeaderDesktop ({ searchBarActive, toggleSearchBar }) {
	return (
		<header className="Header">
			<div className="container centred">
				<nav aria-label='Main links'>
					<a className='logo-link' href="#">
						<img className='logo' src="logo.svg" alt="TMDB logo" />
					</a>
					<ul>
						<li><a href="#">Movies</a></li>
						<li><a href="#">TV Shows</a></li>
						<li><a href="#">People</a></li>
						<li><a href="#">More</a></li>
					</ul>
				</nav>
				<nav aria-label='User actions'>
					<ul>
						<li><a href="#"><img className='icon-plus' src="add.svg" alt="Add media" /></a></li>
						<li><a href="#"><span className='language'>EN</span></a></li>
						<li><a href="#">Login</a></li>
						<li><a href="#">Join TMDB</a></li>
						<li><button onClick={toggleSearchBar}>
							<img className='icon-search' src="search.svg" alt="Search" />
						</button></li>
					</ul>
				</nav>
			</div>
			<ToggleableSearchBar simple active={searchBarActive}/>
		</header>
	)
}

function HeaderMobile ({ searchBarActive }) {
	return (
		<header className="Header mobile">
			<div className="container">
				<nav>
					<div><Hamburger /></div>
					<div className='flex-centre'>
						<a href="/">
							<img className="logo-mobile" src="logo-stacked.svg" alt="TMDB logo" />
						</a>
					</div>
					<ul aria-label='User actions' className="actions">
						<li><a href="#"><img className='icon' src="user.svg" alt="Search" /></a></li>
						<li><a href="#"><img className='icon' src="search.svg" alt="Search" /></a></li>
					</ul>
				</nav>
			</div>
			<ToggleableSearchBar simple active={searchBarActive} />
		</header>
	)
}
