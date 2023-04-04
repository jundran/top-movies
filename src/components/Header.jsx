import Hamburger from './Hamburger'

export default function Header () {
	return (
		<header className="Header">
			<div className="container">
				<nav title='Main links'>
					<a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
						<img className='logo' src="logo.svg" alt="TMDB logo" />
					</a>
					<ul>
						<li><a href="#">Movies</a></li>
						<li><a href="#">TV Shows</a></li>
						<li><a href="#">People</a></li>
						<li><a href="#">More</a></li>
					</ul>
				</nav>
				<nav title='User actions'>
					<ul>
						<li><a href="#">
							<img className='icon plus' src="add.svg" alt="Add media" />
						</a></li>
						<li><a href="#">
							<span className='language'>EN</span>
						</a></li>
						<li><a href="#">Login</a></li>
						<li><a href="#">Join TMDB</a></li>
						<li><a href="#">
							<img className='icon' src="search.svg" alt="Search" />
						</a></li>
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
					<div className='flex-centre'>
						<a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
							<img className="logo-mobile" src="logo-stacked.svg" alt="TMDB logo" />
						</a>
					</div>
					<ul title='User actions' className="actions">
						<li><a href="#"><img className='icon' src="user.svg" alt="Search" /></a></li>
						<li><a href="#"><img className='icon' src="search.svg" alt="Search" /></a></li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
