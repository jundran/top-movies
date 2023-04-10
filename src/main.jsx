import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'

const disableStrictMode = false

if (disableStrictMode) {
	ReactDOM.createRoot(document.getElementById('root')).render(<App />)
} else {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)
}
