import { Link } from 'react-router-dom'
export default function NotFound () {

	return (
		<section className="NotFound container centred">
			<main>
				<p>Page Not Found - 404</p>
				<Link to="/">Home Page</Link>
			</main>
		</section>
	)
}
