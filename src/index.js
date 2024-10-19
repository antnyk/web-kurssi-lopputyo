const weatherOulu = document.getElementById("weatherOulu")

document.addEventListener('DOMContentLoaded', ()=> getOuluWeather())

async function getOuluWeather(){
    const url = "https://api.open-meteo.com/v1/forecast?latitude=65.01236&longitude=25.46816&current=temperature_2m"

    try{
        const res = await fetch(url)
        if (!res.ok){
            throw new Error (res.status)
        }
        const json = await res.json()
        const currentOuluWeather = json.current.temperature_2m
        weatherOulu.innerHTML = `Current weather in Oulu: ${currentOuluWeather}°C`
    }
    catch (e) {
        console.error(e.message)
        weatherOulu.innerHTML = "Could not get weather data."
    }
}