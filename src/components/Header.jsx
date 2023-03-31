import Hamburger from './Hamburger'

export default function Header () {
	return (
		<header className="Header">
			<div className="container">
				<nav>
					<img className='logo' src="logo.svg" alt="TMDB logo" />
					<ul>
						<li><a href="#">Movies</a></li>
						<li><a href="#">TV Shows</a></li>
						<li><a href="#">People</a></li>
						<li><a href="#">More</a></li>
					</ul>
				</nav>
				<nav>
					<ul>
						<li><img className='icon plus' src="add.svg" alt="Add media" /></li>
						<li><span className='language'>EN</span></li>
						<li>Login</li>
						<li>Join TMDB</li>
						<li><img className='icon' src="search.svg" alt="Search" /></li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export function HeaderMobile () {
	return (
		<header className="Header mobile">
			<div className="container">
				<nav>
					<div><Hamburger /></div>
					<img className="logo" src="logo-stacked.svg" alt="TMDB logo" />
					<div className="actions">
						<img className='icon' src="user.svg" alt="Search" />
						<img className='icon' src="search.svg" alt="Search" />
					</div>
				</nav>
			</div>
		</header>
	)
}
