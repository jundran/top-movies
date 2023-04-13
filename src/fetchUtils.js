export async function fetchData (path, params) {
	const { url, options } = getFetchParams(path, params)
	return new Promise( (resolve, reject) => {
		fetch(url, options)
			.then(res => res.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	})
}

function getFetchParams (path, params=[]) {
	const base = 'https://api.themoviedb.org/3/'
	const p = path.replace(/^\/|\/$/g, '')
	const url = new URL(p, base)
	const options = {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + import.meta.env.VITE_BEARER_TOKEN,
			'Content-Type': 'application/json;charset=utf-8'
		}
	}
	for (const param of params) {
		url.searchParams.append(param.key, param.value)
	}
	return { url, options }
}

export function getFormattedDate (dateField, month='short') {
	if (!dateField) return 'Date unknown'
	const options = { year: 'numeric', month, day: 'numeric' }
	const date = new Date(dateField)
	// TMDB sends and displays date in UTC but toLocaleDateString converts to
	// local time zone so add offset to compensate and match TMDB website
	date.setMinutes(date.getTimezoneOffset())
	return date.toLocaleDateString(undefined, options)
}

// eslint-disable-next-line no-unused-vars
function getConfigurationData (path) {
	fetchData(path)
		.then(json => console.log(json))
		.catch(error => console.warn(error))
}

// getConfigurationData('configuration')
// getConfigurationData('genre/movie/list')
// getConfigurationData('genre/tv/list')
