import React, { useState, useEffect } from "react"
import Clock from "./Clock"



const App = () => {

	const [latitude, setLatitude] = useState(null)
	const [date, setDate] = useState(new Date())
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		console.log("in useeffect")
		let timerId = null
		// Get current position data and set state values
		// Only need to get current position on initial render
		window.navigator.geolocation.getCurrentPosition(
			position => {
				setLatitude(position.coords.latitude)
				setDate(new Date())
				// Reset date every second
				timerId = setInterval(() => tick(), 1000)				
			},
			error => {
				setErrorMessage(error.message)
			}
		)
		return () => {
			clearInterval(timerId)
		}
	}, [])
		
	// helper functions

	function tick() {
		setDate(new Date())
	}

	function isSouthernHemisphere(latitude) {
		// returns true if latitude is in the southern hemisphere
		return latitude <= 0
	}

	function getSeason() {
		// arrays to represent the months for each season
		const southSummer = [1, 2, 12]
		const southAutumn = [3, 4, 5]
		const southWinter = [6, 7, 8]
		const southSpring = [8, 10, 11]

		if (latitude === null) return null
		// this.state.date is always initialised
		let month = date.getMonth() + 1

		if (southSummer.includes(month)) {
			// summer in south and winter in north
			return isSouthernHemisphere(latitude) ? "summer" : "winter"
		} else if (southAutumn.includes(month)) {
			// autumn in south and spring in north
			return isSouthernHemisphere(latitude) ? "autumn" : "spring"
		} else if (southWinter.includes(month)) {
			// winter in south and summer in north
			return isSouthernHemisphere(latitude) ? "winter" : "summer"
		} else if (southSpring.includes(month)) {
			// spring in south and autumn in north
			return isSouthernHemisphere(latitude) ? "spring" : "autumn"
		}
	}

	return (
		<div>
			<Clock date={date} season={getSeason()} errorMessage={errorMessage} />
		</div>
	)
}

export default App
