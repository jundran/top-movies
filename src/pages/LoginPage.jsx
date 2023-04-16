import { Link } from 'react-router-dom'

export default function LoginPage () {
	function handleSubmit (e) {
		e.preventDefault()
		console.log(e)
	}

	return (
		<section className="Form Login container centred">
			<main>
				<h2>Login to your account</h2>
				<p>In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple. <Link to="/signup">Click here</Link> to get started.</p>
				<p>If you signed up but didn&apos;t get your verification email, <Link to="">click here</Link> to have it resent.</p>
				<form onSubmit={handleSubmit}>
					<ul>
						<li>
							<label htmlFor="username">Username</label>
							<input name="username" type="text" />
						</li>
						<li>
							<label htmlFor="password">Password</label>
							<input name="password" type="password" />
						</li>
					</ul>
					<button className='submit'>Login</button>
					<Link to="/" className='secondary-action'>Reset Password</Link>
				</form>
			</main>
		</section>
	)
}
