import { Link } from 'react-router-dom'

export default function SignUpPage () {
	function handleSubmit (e) {
		e.preventDefault()
		console.log(e)
	}

	return (
		<section className="Form container centred">
			<aside>
				<h3>Benefits of being a member</h3>
				<ul>
					<li>
						<img src="checkmark.svg" alt="checkmark" aria-hidden="true" />
						<p>Find something to watch on your subscribed streaming services</p>
					</li>
					<li>
						<img src="checkmark.svg" alt="checkmark" aria-hidden="true" />
						<p>Log the movies and TV shows you have watched</p>
					</li>
					<li>
						<img src="checkmark.svg" alt="checkmark" aria-hidden="true" />
						<p>Keep track of your favourite movies and TV shows and get recommendations from them</p>
					</li>
					<li>
						<img src="checkmark.svg" alt="checkmark" aria-hidden="true" />
						<p>Build and maintain a personal watchlist</p>
					</li>
					<li>
						<img src="checkmark.svg" alt="checkmark" aria-hidden="true" />
						<p>Build custom mixed lists (movies and TV)</p>
					</li>
					<li>
						<img src="checkmark.svg" alt="checkmark" aria-hidden="true" />
						<p>Take part in movie and TV discussions</p>
					</li>
					<li>
						<img src="checkmark.svg" alt="checkmark" aria-hidden="true" />
						<p>Contribute to, and improve the information in our database</p>
					</li>
				</ul>
			</aside>
			<main>
				<h2>Sign up for an account</h2>
				<p className='top-text'>Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to to continue.</p>
				<form onSubmit={handleSubmit}>
					<ul>
						<li>
							<label htmlFor="username">Username</label>
							<input name="username" type="text" />
						</li>
						<li>
							<label htmlFor="password">Password (4 characters minimum)</label>
							<input name="password" type="password" />
						</li>
						<li>
							<label htmlFor="password-confirm">Password Confirm</label>
							<input name="password-confirm" type="password" />
						</li>
						<li>
							<label htmlFor="email">Email</label>
							<input name="email" type="email" />
						</li>
					</ul>
					<p className='bottom-text'>By clicking the &quot;Sign up&quot; button below, I certify that I have read and agree to the TMDB terms of use and privacy policy.</p>
					<button className='submit'>Sign Up</button>
					<Link to="/" className='secondary-action'>Cancel</Link>
				</form>
			</main>
		</section>
	)
}
