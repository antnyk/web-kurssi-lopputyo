const alertButton = document.getElementById('alertBtn')
const timerStoptButton = document.getElementById('timerStoptBtn')
const timerStartButton = document.getElementById('timerStartBtn')

let timerOn;

document.addEventListener('DOMContentLoaded', ()=>{
    const weatherList = document.getElementById('weatherList')

    getMultipleWeather()
})

alertButton.addEventListener('click', ()=>{
    alert('This works, what a surprise.')
})

timerStartButton.addEventListener('click', ()=>{
    if (!timerOn){
        timerOn = setInterval(task1Timer, 1000)
    }
})

timerStoptButton.addEventListener('click', ()=>{
    clearInterval(timerOn)
    timerOn = null
})

function task1Timer(){
    let text = document.createElement('p')
    text.textContent = 'It took a second for this to show up.'

    const asyncCriteria1 = document.getElementById('asyncCriteria1')
    asyncCriteria1.append(text)

}

async function getMultipleWeather(){
    // Helsinki, Melbourne, New York
    latitudeList = [60.192059, -37.840935, 40.730610]
    longitudeList = [24.945831, 144.946457, -73.935242]

    let url = (lat, lon) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`

    let lista = []

    for (let i = 0; i < latitudeList.length; i++){
        lista.push(url(latitudeList[i],longitudeList[i]))
    }

    for (let i of lista){
        console.log(i)
    }
    
    try{
        let res = await Promise.all([fetch(lista[0]),fetch(lista[1]),fetch(lista[2])])
        if (!res.every(i => i.ok)){
            console.log(lista[0].type)
            throw new Error ('Error in some url link')
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data1 = await res[0].json()
        const data2 = await res[1].json()
        const data3 = await res[2].json()
        console.log(data1)
        console.log(data2)
        console.log(data3)
    }
    catch (e) {
        console.error(e.message)
    }
    
}