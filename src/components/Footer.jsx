import { Link } from 'react-router-dom'

export default function Footer () {
	return (
		<footer className="Footer">
			<nav className="centred">
				<div className="hero">
					<img src="logo-stacked.svg" alt="TMDB logo" />
					<button>JOIN THE COMMUNITY</button>
				</div>
				<div className="links">
					<h2>THE BASICS</h2>
					<ul>
						<li><a
							href="https://www.themoviedb.org/"
							target="_blank"
							rel="noreferrer"
						>About TMDB</a></li>
						<li><Link to="">Contact Us</Link></li>
						<li><Link to="">Support Forums</Link></li>
						<li><Link to="">API</Link></li>
						<li><Link to="">System Status</Link></li>
					</ul>
				</div>
				<div className="links">
					<h2>GET INVOLVED</h2>
					<ul>
						<li><Link to="">Contribution Bible</Link></li>
						<li><Link to="">Add New Movie</Link></li>
						<li><Link to="">Add New TV Show</Link></li>
					</ul>
				</div>
				<div className="links">
					<h2>COMMUNITY</h2>
					<ul>
						<li><Link to="">Guidelines</Link></li>
						<li><Link to="">Discussions</Link></li>
						<li><Link to="">Leaderboard</Link></li>
						<li><Link to="">Twitters</Link></li>
					</ul>
				</div>
				<div className="links">
					<h2>LEGAL</h2>
					<ul>
						<li><Link to="">Terms of Use</Link></li>
						<li><Link to="">API Terms of Use</Link></li>
						<li><Link to="">Privacy Policy</Link></li>
					</ul>
				</div>
			</nav>
		</footer>
	)
}
