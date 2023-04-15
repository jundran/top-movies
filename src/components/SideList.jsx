import { useState, useEffect } from 'react'
import list from '../mediaTypes'

// Currently only handling People, Movies and TV Shows
// Other categories are ignored and show count of 0
export default function SideList ({ data, onClick }) {
	const [active, setActive] = useState('movie')

	useEffect(() => {
		document.querySelector('.SideList li:first-of-type button').focus()
	}, [])

	function handleClick (mediaType) {
		setActive(mediaType)
		onClick(mediaType)
	}

	return (
		<div className="SideList">
			<h2>Search results</h2>
			<ul>
				{list.map(item =>
					<ListItem
						key={item.mediaType}
						title={item.title}
						count={getCount(item.mediaType, data)}
						isActive={active === item.mediaType}
						handleClick={() => handleClick(item.mediaType)}
					/>
				)}
			</ul>
		</div>
	)
}

function ListItem ({ title, count, isActive, handleClick }) {
	return (
		<li>
			<button
				onClick={handleClick}
				className={isActive ? 'active' : ''}
			>
				{title}
				<span>{count}</span>
			</button>
		</li>
	)
}

function getCount (mediaType, data) {
	return data.filter(item => item.media_type === mediaType).length
}
