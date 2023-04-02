export default function PercentCircle ({ percent }) {
	const deg = percent / 100 * 360
	const p1Deg = deg > 180 ? 180 : deg
	const p2Deg = deg > 180 ? deg : 0
	const p1Style = {
		transform: `rotate(${p1Deg}deg)`,
		background: getBarColour(deg)
	}
	const p2Style = {
		transform: `rotate(${p2Deg}deg)`,
		background: deg < 180 ? '#444' : getBarColour(deg)
	}
	return (
		<div className="PercentCircle" aria-label={`Rating score ${percent} percent approval`}>
			<div className="outer-circle">
				<div className="percent-bar flex-centre">
					<div style={p1Style} className="portion"></div>
					<div style={p2Style} className="portion"></div>
					<div className="inner-circle flex-centre">
						{Math.round(percent)}<span>%</span>
					</div>
				</div>
			</div>
		</div>
	)
}

function getBarColour (deg) {
	let colour = '#f00'
	if (deg > 120) colour = '#ff0'
	if (deg > 240) colour = '#21d07a'
	return colour
}
