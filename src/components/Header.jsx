import { useState, useEffect } from 'react'
import Hamburger from './Hamburger'
import { ToggleableSearchBar } from './Search'
import { useLocation, Link } from 'react-router-dom'

export default function Header () {
	const [isMobile, setisMobile] = useState(matchMedia('(max-width: 900px)').matches)
	const [searchBarActive, setSearchBarActive] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const mediaQueryList = matchMedia('(max-width: 900px)')
		const handleMatch = e => setisMobile(e.matches)
		mediaQueryList.addEventListener('change', handleMatch)
		return () => mediaQueryList.removeEventListener('change', handleMatch)
	}, [])

	useEffect(() => {
		setSearchBarActive(false)
	}, [location.pathname])

	function toggleSearchBar () {
		// Only permanent SearchBar is shown on SearchPage
		// Cannot be toggled and clicking search icon button just moves focus to its input
		if (location.pathname.match('/search')) {
			return document.querySelector('.ToggleableSearchBar.permanent input').focus()
		}
		setSearchBarActive(!searchBarActive)
	}

	return isMobile ?
		<HeaderMobile searchBarActive={searchBarActive} toggleSearchBar={toggleSearchBar}/> :
		<HeaderDesktop searchBarActive={searchBarActive} toggleSearchBar={toggleSearchBar}/>
}

function HeaderDesktop ({ searchBarActive, toggleSearchBar }) {
	return (
		<header className="Header">
			<div className="container centred">
				<nav aria-label='Main links'>
					<Link to="" className='logo-link'>
						<img className='logo' src="logo.svg" alt="TMDB logo" />
					</Link>
					<ul>
						<li><Link to="">Movies</Link></li>
						<li><Link to="">TV Shows</Link></li>
						<li><Link to="">People</Link></li>
						<li><Link to="">More</Link></li>
					</ul>
				</nav>
				<nav aria-label='User actions'>
					<ul>
						<li><Link to=""><img className='icon-plus' src="add.svg" alt="Add media" /></Link></li>
						<li><Link to=""><span className='language'>EN</span></Link></li>
						<li><Link to="">Login</Link></li>
						<li><Link to="/signup">Join TMDB</Link></li>
						<li>
							<button	className='search' onClick={toggleSearchBar}>
								{searchBarActive ?
									<img src="close.svg" alt="Close search bar" /> :
									<img src="search.svg" alt="Show search bar" />
								}
							</button>
						</li>
					</ul>
				</nav>
			</div>
			<ToggleableSearchBar active={searchBarActive}/>
		</header>
	)
}

function HeaderMobile ({ searchBarActive, toggleSearchBar }) {
	return (
		<header className="Header mobile">
			<div className="container">
				<nav>
					<div><Hamburger /></div>
					<div className='flex-centre'>
						<Link to="/">
							<img className="logo-mobile" src="logo-stacked.svg" alt="TMDB logo" />
						</Link>
					</div>
					<ul aria-label='User actions' className="actions">
						<li><Link to=""><img className='icon' src="user.svg" alt="Search" /></Link></li>
						<li>
							<button	className='search' onClick={toggleSearchBar}>
								{searchBarActive ?
									<img src="close.svg" alt="Close search bar" /> :
									<img src="search.svg" alt="Show search bar" />
								}
							</button>
						</li>
					</ul>
				</nav>
			</div>
			<ToggleableSearchBar active={searchBarActive} />
		</header>
	)
}
